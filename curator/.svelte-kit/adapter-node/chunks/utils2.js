import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import SparkMD5 from "spark-md5";
import { s as setContext, g as getContext } from "./context.js";
import { p as page } from "./index2.js";
import PocketBase from "pocketbase";
import { XMLParser } from "fast-xml-parser";
function signalSavePage() {
  let savedPages = /* @__PURE__ */ new Map();
  return {
    get savedPages() {
      return savedPages;
    },
    set savedPages(value) {
      savedPages = value;
    },
    updatePageData(url, currentPage) {
      savedPages.set(url, currentPage);
    }
  };
}
class mobileState {
  isMobile = false;
  isSidebarOpen = true;
}
class mouseState {
  isBusy = false;
}
async function tryCatch(promise) {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
const signalPageState = signalSavePage();
function setMobileState() {
  return setContext("mobile", new mobileState());
}
function getMobileState() {
  return getContext("mobile");
}
const saveCurrentPage = (newPage) => signalPageState.updatePageData(page.url.hash, newPage);
function setMouseState() {
  return setContext("mouse", new mouseState());
}
function getMouseState() {
  return getContext("mouse");
}
const superUser = "admin@pocketbase.com";
const superUserPass = "amiodarone";
const notebooksCollection = "notebooks";
const notesCollection = "notes";
const tagsCollection = "tags";
const viewTagsCollectionName = "tags_with_note_counts";
const viewNotesCollection = "notes_without_content";
const viewNotebooksCollection = "notebooks_with_note_counts";
const settingCollection = "settings";
const inboxNotebook = "Inbox";
const baseURL = "http://127.0.0.1:8090/api/files";
const pbURL = "http://127.0.0.1:8090";
const pb = new PocketBase(pbURL);
async function getAuth() {
  await pb.collection("_superusers").authWithPassword(superUser, superUserPass);
  console.log("Logged in to Pocket client: ", pb.authStore.isValid);
}
async function makeDefaultNotebook() {
  const { data, error } = await tryCatch(pb.collection(notebooksCollection).create({ name: inboxNotebook }));
  if (error) {
    if (error.data.data.name.code == "validation_not_unique") {
      console.log("Inbox already exists");
    } else {
      console.error("Error making Inbox: ", error.message);
    }
  }
}
async function uploadFileToPocketbase(recordID, file) {
  const { data: record, error } = await tryCatch(pb.collection(notesCollection).update(recordID, { "attachments+": [file] }));
  if (error) {
    console.error("Error uploading file: ", error.message, error.data);
    return "";
  }
  return `${baseURL}/${notesCollection}/${recordID}/${record.attachments.at(-1)}`;
}
class TagState {
  tags = [];
  flatTags = [];
  pinnedTags = [];
  constructor() {
  }
  async getAll() {
    const { data: records, error } = await tryCatch(pb.collection(viewTagsCollectionName).getFullList({ sort: "name", expand: "parent" }));
    if (error) {
      console.error("Error while getting all tags: ", error.message);
    }
    if (!records) {
      return;
    }
    this.flatTags = records;
    this.pinnedTags = [];
    const tagMap = /* @__PURE__ */ new Map();
    records.forEach((tag) => {
      tagMap.set(tag.id, { ...tag, children: [] });
      if (tag.status === "pinned") {
        this.pinnedTags.push(tag);
      }
    });
    let rootTags = [];
    tagMap.forEach((tag) => {
      if (tag.expand.parent) {
        const parent = tagMap.get(tag.expand.parent.id);
        parent.children.push(tag);
      } else {
        rootTags.push(tag);
      }
    });
    this.tags = rootTags;
  }
  async delete(recordID) {
    const { data, error } = await tryCatch(pb.collection(tagsCollection).delete(recordID));
    if (error) {
      console.error("Error while deleting tag: ", error);
    }
    await this.getAll();
  }
  async getOne(tagID) {
    const { data, error } = await tryCatch(pb.collection(tagsCollection).getOne(tagID));
    if (error) {
      console.error("Error getting tag: ", error);
    }
    return data;
  }
  async createOnebyName(newName, parentTagID) {
    const { data, error } = await tryCatch(pb.collection(tagsCollection).create({ "name": newName, "parent": parentTagID }));
    if (error) {
      console.error("Error while creating new tag: ", error.data);
    }
    await this.getAll();
    return data;
  }
  async updateOnebyName(recordID, newName) {
    const { data, error } = await tryCatch(pb.collection(tagsCollection).update(recordID, { "name": newName }));
    if (error) {
      console.error("Error while updating tag name: ", error.message, error.data);
    }
    await this.getAll();
  }
  async updateOnebyParent(recordID, parentTagID) {
    const { data, error } = await tryCatch(pb.collection(tagsCollection).update(recordID, { "parent": parentTagID }));
    if (error) {
      console.error("Error while updating parent tag: ", error.message);
    }
    await this.getAll();
  }
  async pin(recordID) {
    const { data, error } = await tryCatch(pb.collection(tagsCollection).update(recordID, { "status": "pinned" }));
    if (error) {
      console.error("Error pinning tag: ", error.message, error.data);
    }
    await this.getAll();
  }
  async unpin(recordID) {
    const { data, error } = await tryCatch(pb.collection(tagsCollection).update(recordID, { "status": "" }));
    if (error) {
      console.error("Error unpin tag: ", error.message, error.data);
    }
    await this.getAll();
  }
}
class NotebookState {
  inbox;
  inboxID = "";
  inboxCount = 0;
  totalNoteCount = 0;
  notebooks = [];
  flatNotebooks = [];
  pinnedNotebooks = [];
  constructor() {
  }
  async getAll() {
    const { data: records, error } = await tryCatch(pb.collection(viewNotebooksCollection).getFullList({
      sort: "name",
      // filter: 'name != "Inbox"',
      expand: "parent"
    }));
    if (error) {
      console.error("Error while get all notebooks: ", error.message);
    }
    if (!records) {
      return;
    }
    this.flatNotebooks = records;
    this.pinnedNotebooks = [];
    const notebookMap = /* @__PURE__ */ new Map();
    records.forEach((notebook) => {
      notebookMap.set(notebook.id, { ...notebook, children: [] });
      if (notebook.status === "pinned") {
        this.pinnedNotebooks.push(notebook);
      }
    });
    let rootNotebooks = [];
    notebookMap.forEach((notebook) => {
      if (notebook.expand.parent) {
        const parent = notebookMap.get(notebook.expand.parent.id);
        parent.children.push(notebook);
      } else {
        rootNotebooks.push(notebook);
      }
    });
    this.notebooks = rootNotebooks;
  }
  async getInbox() {
    const { data: inbox, error } = await tryCatch(pb.collection(viewNotebooksCollection).getFirstListItem(`name="Inbox"`));
    if (error) {
      console.error("Error while getting inbox: ", error.message);
    }
    if (!inbox) {
      return;
    }
    this.inbox = inbox;
    this.inboxID = inbox.id;
    this.inboxCount = inbox.note_count;
    return inbox;
  }
  async getAllCounts() {
    const { data, error } = await tryCatch(pb.collection(notesCollection).getList(1, 1, { filter: `status="active"` }));
    if (error) {
      console.error("Error while getting all notebooks: ", error.message);
    }
    this.totalNoteCount = data.totalItems;
  }
  async createOnebyName(newName, parentNotebookID) {
    const { data, error } = await tryCatch(pb.collection(notebooksCollection).create({ "name": newName, "parent": parentNotebookID }));
    if (error) {
      console.error("Error while creating new notebook: ", error.data, error.message);
    }
  }
  async getOneByName(notebookName) {
    const { data, error } = await tryCatch(pb.collection(viewNotebooksCollection).getFirstListItem(`name="${notebookName}"`));
    if (error) {
      console.error("Error while get notebook: ", notebookName, error.data);
    }
    return data;
  }
  async delete(recordID) {
    const { data: recordsToMove, error: errorsToMove } = await tryCatch(pb.collection(viewNotesCollection).getFullList({ filter: `notebook = '${recordID}'` }));
    if (errorsToMove) {
      console.error("Error getting records to move: ", errorsToMove);
      return;
    }
    if (!this.inbox) {
      await this.getInbox();
    }
    for (const record of recordsToMove) {
      const { data: recordToMove, error: errorToMove } = await tryCatch(pb.collection(notesCollection).update(record.id, { "notebook": this.inboxID }));
      if (errorToMove) {
        console.error("Error moving record: ", errorToMove.message);
        continue;
      }
    }
    const { data, error } = await tryCatch(pb.collection(notebooksCollection).delete(recordID));
    if (error) {
      console.error("Error while deleting notebook: ", error);
    }
  }
  async updateOnebyName(recordID, newName) {
    const { data, error } = await tryCatch(pb.collection(notebooksCollection).update(recordID, { "name": newName }));
    if (error) {
      console.error("Error while updating notebook name: ", error);
    }
  }
  async updateOnebyParent(recordID, parentNotebook) {
    const { data, error } = await tryCatch(pb.collection(notebooksCollection).update(recordID, { "parent": parentNotebook }));
    if (error) {
      console.error("Error while updating parent notebook: ", error);
    }
  }
  async pin(recordID) {
    const { data, error } = await tryCatch(pb.collection(notebooksCollection).update(recordID, { "status": "pinned" }));
    if (error) {
      console.error("Error pinning notebook: ", error.data);
    }
  }
  async unpin(recordID) {
    const { data, error } = await tryCatch(pb.collection(notebooksCollection).update(recordID, { "status": "" }));
    if (error) {
      console.error("Error unpinning notebook: ", error.data);
    }
  }
}
class NotelistState {
  notes = {
    items: [],
    page: 1,
    perPage: 25,
    totalItems: 0,
    totalPages: 0
  };
  clickedPage = 1;
  notebookID;
  notebookName;
  tagID;
  noteType;
  tags;
  constructor(noteType) {
    this.noteType = noteType.type;
    if (this.noteType == "notebooks") {
      this.notebookID = noteType.id;
    } else if (this.noteType == "tags") {
      this.tagID = noteType.id;
    }
  }
  async getDefault(newPage) {
    if (this.noteType === "default") {
      this.getByPage(newPage);
    } else if (this.noteType === "notebooks") {
      this.getByNotebook(this.notebookID, newPage);
    } else if (this.noteType === "tags") {
      this.getByTag(this.tagID, newPage);
    } else if (this.noteType === "archive") {
      this.getArchived(newPage);
    } else if (this.noteType === "trash") {
      this.getDeleted(newPage);
    }
  }
  async getCurrentNotebook(notebookID) {
    const { data, error } = await tryCatch(pb.collection(viewNotebooksCollection).getOne(notebookID));
    if (error) {
      console.error("Error getting notebook: ", error);
    }
    return data;
  }
  async getByPage(newPage = 1) {
    const start = performance.now();
    const { data, error } = await tryCatch(pb.collection(viewNotesCollection).getList(newPage, 24, {
      sort: "-created",
      filter: `status="active"`,
      expand: "notebook, tags"
    }));
    if (error) {
      console.error("Unable to get notes by page ", error.message);
    }
    const end = performance.now();
    console.log(`Default notes seen in ${end - start} ms`);
    this.notes = data;
    return this.notes;
  }
  async getByNotebook(notebookID, page2) {
    const { data, error } = await tryCatch(pb.collection(viewNotesCollection).getList(page2, 24, {
      filter: `notebook="${notebookID}" && status="active"`,
      expand: "tags,notebook",
      sort: "-created"
    }));
    if (error) {
      console.error("Error getting notes: ", error);
    }
    this.notes = data;
    return this.notes;
  }
  async getArchived(page2) {
    const { data, error } = await tryCatch(pb.collection(viewNotesCollection).getList(page2, 24, {
      filter: `status="archived"`,
      expand: "tags,notebook",
      sort: "-created"
    }));
    if (error) {
      console.error("Error getting notes: ", error);
    }
    this.notes = data;
    return this.notes;
  }
  async getDeleted(page2) {
    const { data, error } = await tryCatch(pb.collection(viewNotesCollection).getList(page2, 24, {
      filter: `status="deleted"`,
      expand: "tags,notebook",
      sort: "-created"
    }));
    if (error) {
      console.error("Error getting notes: ", error);
    }
    this.notes = data;
    return this.notes;
  }
  async getByTag(tagID, page2) {
    const { data, error } = await tryCatch(pb.collection(viewNotesCollection).getList(page2, 24, {
      filter: `tags~"${tagID}" && status="active"`,
      expand: "tags,notebook",
      sort: "-created"
    }));
    if (error) {
      console.error("Error getting notes: ", error);
    }
    this.notes = data;
    return this.notes;
  }
  async getByFilter(customFilters, page2) {
    const start = performance.now();
    const { data, error } = await tryCatch(pb.collection(notesCollection).getList(page2, 24, {
      sort: "-created",
      expand: "tags,notebook",
      filter: customFilters
    }));
    if (error) {
      console.error("Unable to get notes by filter ", error.message);
      return;
    }
    const end = performance.now();
    console.log(`search complete in ${end - start} ms`);
    this.notes = data;
    return this.notes;
  }
  async getOneByName() {
    return await pb.collection(notesCollection).getFirstListItem(`name='${name}'`);
  }
  async emptyTrash() {
    const { data, error } = await tryCatch(pb.collection(viewNotesCollection).getFullList({ filter: `status="deleted"` }));
    if (error) {
      console.error("Unable to get deleted notes: ", error);
    }
    if (!data) return;
    await Promise.all(data.map((note) => {
      pb.collection(notesCollection).delete(note.id);
    }));
  }
  async softDeleteMultiple(recordIDs) {
    await Promise.all(recordIDs.map(async (recordID) => {
      const { data, error } = await pb.collection(notesCollection).update(recordID, { status: "deleted" });
      if (error) {
        console.error("Unable to delete note: ", error);
      }
    }));
  }
  async unSoftDeleteMultiple(recordIDs) {
    await Promise.all(recordIDs.map(async (recordID) => {
      const { data, error } = await pb.collection(notesCollection).update(recordID, { status: "active" });
      if (error) {
        console.error("Unable to restore deleted note: ", error);
      }
    }));
  }
  async archiveMultiple(recordIDs) {
    await Promise.all(recordIDs.map(async (recordID) => {
      const { data, error } = await pb.collection(notesCollection).update(recordID, { status: "archived" });
      if (error) {
        console.error("Unable to archive note: ", error);
      }
    }));
  }
  async unArchiveMultiple(recordIDs) {
    await Promise.all(recordIDs.map(async (recordID) => {
      const { data, error } = await pb.collection(notesCollection).update(recordID, { status: "active" });
      if (error) {
        console.error("Unable to un-archive note: ", error);
      }
    }));
  }
  async changeNotebook(selectedNotesID, newNotebookID) {
    await Promise.all(selectedNotesID.map(async (noteID) => {
      const { data, error } = await tryCatch(pb.collection(notesCollection).update(noteID, { notebook: newNotebookID }));
      if (error) {
        console.error("Error changing notebook: ", noteID, error);
      }
    }));
  }
  async addTag(selectedNotesID, selectedTagID) {
    await Promise.all(selectedNotesID.map(async (noteID) => {
      const { data, error } = await tryCatch(pb.collection(notesCollection).update(noteID, { "tags+": selectedTagID }));
      if (error) {
        console.error("Error adding tag: ", noteID, error);
      }
    }));
  }
  async removeTag(selectedNotesID, selectedTagID) {
    await Promise.all(selectedNotesID.map(async (noteID) => {
      const { data, error } = await tryCatch(pb.collection(notesCollection).update(noteID, { "tags-": selectedTagID }));
      if (error) {
        console.error("Error removing tag: ", noteID, error);
      }
    }));
  }
  async clearTags(selectedNotesID) {
    await Promise.all(selectedNotesID.map(async (noteID) => {
      const { data, error } = await tryCatch(pb.collection(notesCollection).update(noteID, { "tags": [] }));
      if (error) {
        console.error("Error clearing tags: ", noteID, error);
      }
    }));
  }
  async mergeNotes(selectedNotesID) {
    let selectedNotes = [];
    for (const selectedNoteID of selectedNotesID) {
      const { data: selectedNote, error: selectedNoteError } = await tryCatch(pb.collection(notesCollection).getOne(selectedNoteID));
      if (selectedNoteError) {
        console.error("Error getting notes to merge: ", selectedNoteError.message);
        continue;
      }
      selectedNotes.push(selectedNote);
    }
    if (!selectedNotes || selectedNotes.length < 2) return;
    const [baseNote, ...restNotes] = selectedNotes;
    const newResources = await createNewResources(baseNote.id, restNotes);
    const mergedNoteData = createMergedNoteData(selectedNotes, newResources);
    const { data: finalNote, error: finalNoteError } = await tryCatch(pb.collection(notesCollection).update(baseNote.id, mergedNoteData));
    if (finalNoteError) {
      console.error("Error updating final merged note: ", finalNoteError.data);
    }
    if (!baseNote.thumbnail) {
      try {
        const thumbResource = getResourceThumbURL(finalNote.resources);
        await addThumbnailToRecord(baseNote.id, thumbResource?.fileURL);
      } catch (e) {
        console.log(e);
      }
    }
    await Promise.all(selectedNotes.slice(1).map((n) => pb.collection(notesCollection).update(n.id, { "status": "deleted" })));
  }
}
class NoteState {
  note;
  noteList;
  noteID;
  fontScale = 1;
  constructor(noteID) {
    this.noteID = noteID;
  }
  get customStyles() {
    return `
            :root {
                  --color-base-100: oklch(100% 0 0);
                  --color-base-content: oklch(27.807% 0.029 256.847);
              }
              @media (prefers-color-scheme: dark) {
                :root {
                      --color-base-100: oklch(25.33% 0.016 252.42);
                      --color-base-content: oklch(97.807% 0.029 256.847); 
               }
            }
              html, body {
                  margin: 0 !important;
                  height: 100% !important;
              }
              * {
                  font-size: ${this.fontScale * 100}% !important;
                  line-height: 1.4 !important;
             }
              html, body, main, section, p, pre, div {
                  background-color: var(--color-base-100) !important;
                  background: var(--color-base-100) !important; 
                  color: var(--color-base-content) !important;
              }
              img {
                  max-width: 100% !important;
                  height: auto !important;
              }
              .img-wrapper {
                  display: flex;
                  justify-content: center;
                  margin-bottom: 1rem;
              }
              video {
                  max-height: 800px; !important;
              }
              `;
  }
  async getNote() {
    const { data, error } = await tryCatch(pb.collection(notesCollection).getOne(this.noteID, { expand: "notebook,tags" }));
    if (error) {
      console.error("Error getting note: ", this.noteID, error);
      return null;
    }
    this.note = data;
    return data;
  }
  async getDiscoverNoteList(page2 = 1) {
    const start = performance.now();
    const { data, error } = await tryCatch(pb.collection(viewNotesCollection).getList(page2, 100, {
      expand: "notebook,tags",
      sort: "-score",
      filter: `status="active"`
    }));
    if (error) {
      console.error("Error getting discover note: ", error.data);
    }
    const end = performance.now();
    console.log(`Returned Discover List in ${end - start} ms`);
    this.noteList = data;
    return data;
  }
  async getDiscoverNote(index = 0) {
    this.noteID = this.noteList.items[index].id;
    const { data: record, error: recordError } = await tryCatch(pb.collection(notesCollection).getFirstListItem(`id="${this.noteID}"`, { expand: "notebook,tags" }));
    if (recordError) {
      console.error("Error getting discover note: ", recordError.data);
    }
    if (!record) {
      console.log("No discovery note found");
    }
    this.note = record;
    this.updateLastOpened();
  }
  async updateLastOpened() {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { last_opened: /* @__PURE__ */ new Date() }));
    if (error) {
      console.error("Error updating note last opened date: ", error.message);
    }
  }
  async deleteNote() {
    const { data, error } = await tryCatch(pb.collection(notesCollection).delete(this.noteID));
    if (error) {
      console.error("Error deleting note: ", this.noteID, error);
    }
  }
  async softDeleteNote() {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { status: "deleted" }));
    if (error) {
      console.error("Unable to delete note: ", error);
    }
  }
  async changeNotebook(newNotebookID) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { notebook: newNotebookID }));
    if (error) {
      console.error("Error changing notebook: ", this.noteID, error);
    }
    await this.getNote();
    return data;
  }
  async changeTags(selectedTags) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { tags: selectedTags }));
    if (error) {
      console.error("Error changing tags: ", this.noteID, error);
    }
    await this.getNote();
  }
  async addTag(selectedTagID) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { "tags+": selectedTagID }));
    if (error) {
      console.error("Error adding tag: ", this.noteID, error);
    }
    await this.getNote();
  }
  async removeTag(selectedTagID) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { "tags-": selectedTagID }));
    if (error) {
      console.error("Error removing tag: ", this.noteID, error);
    }
    await this.getNote();
  }
  async changeRating(newRating) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { rating: newRating }));
    if (error) {
      console.error("Error changing rating: ", this.noteID, error.message);
    }
    await this.getNote();
    return data;
  }
  async upvoteWeight() {
    const newWeight = this.note.weight + 1;
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { weight: newWeight }));
    if (error) {
      console.error("Error changing weight: ", this.noteID, error.message);
    }
    await this.getNote();
    return data;
  }
  async downvoteWeight() {
    const newWeight = this.note.weight - 1;
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { weight: newWeight }));
    if (error) {
      console.error("Error changing weight: ", this.noteID, error.message);
    }
    await this.getNote();
    return data;
  }
  async archiveNote() {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { status: "archived" }));
    if (error) {
      console.error("Error archiving note: ", error.message);
    }
  }
  async restoreNote() {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { status: "active" }));
    if (error) {
      console.error("Error restoring note: ", error.message);
    }
    await this.getNote();
    return data;
  }
  async permaDeleteNote() {
    const { data, error } = await tryCatch(pb.collection(notesCollection).delete(this.noteID));
    if (error) {
      console.error("Error deleting note: ", error.message);
    }
  }
  async changeTitle(newTitle) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { title: newTitle }));
    if (error) {
      console.error("Error changing note title: ", error.message);
    }
  }
  async changeDescription(newDescription) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { description: newDescription }));
    if (error) {
      console.error("Error changing note description: ", error.message);
    }
  }
  async changeSources(newSources) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { sources: newSources, expand: "notebook,tags" }));
    if (error) {
      console.error("Error changing note sources: ", error.message);
    }
  }
  async changeThumbnail(url) {
    const thumbURL = url ? `${url}?thumb=500x0` : "";
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { thumbnail: thumbURL }));
    if (error) {
      console.error("Error changing note thumbnail: ", error.message);
    }
  }
  async updateContent(newContent) {
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.noteID, { content: newContent }, { expand: "notebook,tags" }));
    if (error) {
      console.error("Error updating note content: ", error.message);
    }
    this.note = data;
  }
  async appendContent(newContent) {
    const { data: record, error: recordError } = await tryCatch(pb.collection(notesCollection).getOne(this.noteID));
    if (recordError) {
      console.error("Error getting note content: ", recordError.message);
      return;
    }
    const contentList = [record.content, newContent];
    const mergedContent = mergeContents(contentList);
    const { data, error } = await tryCatch(pb.collection(notesCollection).update(this.note.id, { content: mergedContent }, { expand: "notebook,tags" }));
    if (error) {
      console.error("Error updating note content: ", error.message);
    }
    this.note = data;
  }
}
class settingState {
  ratingWeight;
  recencyWeight;
  weightWeight;
  randomWeight;
  fullPenaltyWindow;
  decayWindow;
  maxDay;
  daysOld;
  scoreRefreshHour;
  youtubeAPIKey;
  async makeDefaultValue(name2, defaultValue) {
    const { data, error } = await tryCatch(pb.collection(settingCollection).create({ name: name2, value: defaultValue }));
    if (error) {
      console.error("Error making setting: ", name2, error.message);
      return;
    }
    if (!data) return;
    return data.value;
  }
  async changeSetting(name2, newValue) {
    const { data: settingRecord, error } = await tryCatch(pb.collection(settingCollection).getFirstListItem(`name="${name2}"`));
    if (error || !settingRecord) {
      console.error("Error getting setting: ", name2, error.message);
      return;
    }
    const { data: settingUpdate, error: errorUpdate } = await tryCatch(pb.collection(settingCollection).update(settingRecord.id, { value: newValue }));
    if (errorUpdate || !settingUpdate) {
      console.error("Error making setting: ", name2, errorUpdate.message);
      return;
    }
    return settingUpdate.value;
  }
  async getSetting(name2, defaultValue) {
    const { data, error } = await tryCatch(pb.collection(settingCollection).getFirstListItem(`name="${name2}"`));
    if (error || !data) {
      console.error("Error getting setting: ", name2, error.message);
      const newSettingValue = await this.makeDefaultValue(name2, defaultValue);
      return newSettingValue;
    }
    return data.value;
  }
  async getDefaultSettings() {
    this.ratingWeight = await this.getSetting("ratingWeight", 0.3);
    this.recencyWeight = await this.getSetting("recencyWeight", 0.3);
    this.weightWeight = await this.getSetting("weightWeight", 0.3);
    this.randomWeight = await this.getSetting("randomWeight", 0.3);
    this.maxDay = await this.getSetting("maxDay", 60);
    this.fullPenaltyWindow = await this.getSetting("fullPenaltyWindow", 1);
    this.decayWindow = await this.getSetting("decayWindow", 12);
    this.daysOld = await this.getSetting("daysOld", 0);
    this.scoreRefreshHour = await this.getSetting("scoreRefreshHour", 6);
    this.youtubeAPIKey = await this.getSetting("youtubeAPIKey", "");
  }
}
const TAG_KEY = Symbol("TAG");
const NOTEBOOK_KEY = Symbol("NOTEBOOK");
const SETTING_KEY = Symbol("SETTING");
function setTagState() {
  return setContext(TAG_KEY, new TagState());
}
function getTagState() {
  return getContext(TAG_KEY);
}
function setNotebookState() {
  return setContext(NOTEBOOK_KEY, new NotebookState());
}
function getNotebookState() {
  return getContext(NOTEBOOK_KEY);
}
function setNotelistState(NOTE_KEY, noteType) {
  return setContext(NOTE_KEY, new NotelistState(noteType));
}
function getNotelistState(NOTE_KEY) {
  return getContext(NOTE_KEY);
}
function setNoteState(NOTE_KEY) {
  return setContext(NOTE_KEY, new NoteState(NOTE_KEY));
}
function getNoteState(NOTE_KEY) {
  return getContext(NOTE_KEY);
}
function setSettingState() {
  return setContext(SETTING_KEY, new settingState());
}
function getSettingState() {
  return getContext(SETTING_KEY);
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: ""
});
async function getFileHash(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hash = SparkMD5.ArrayBuffer.hash(arrayBuffer);
  return hash;
}
async function downloadAttachmentByURL(fileURL, fileName, fileType) {
  const response = await fetch(fileURL);
  const blob = await response.blob();
  return new File([blob], fileName, { type: fileType });
}
function getMimeFromName(fileName, originalMime) {
  const MIME_LOOKUP = {
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
    "3gp": "video/3gpp",
    ogg: "video/ogg"
  };
  let correctedMime = originalMime;
  if (originalMime === "application/octet-stream") {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext && MIME_LOOKUP[ext]) {
      correctedMime = MIME_LOOKUP[ext];
    }
  }
  return correctedMime;
}
async function getVideoThumb(videoUrl) {
  return new Promise((resolve, reject) => {
    if (!videoUrl || videoUrl.trim() == "") {
      return reject(new Error("Video URL is empty"));
    }
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.onerror = (e) => {
      reject(new Error(`Video loading error: ${video.error?.message} || 'Unknown error'`));
    };
    video.onloadedmetadata = () => {
      video.onloadeddata = () => {
        video.currentTime = 1;
      };
    };
    video.onseeked = async () => {
      await new Promise((res) => setTimeout(res, 200));
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const thumbnailFile = new File([blob], "thumbnail.png", { type: "image/png" });
          resolve(thumbnailFile);
        } else {
          reject(new Error("Failed to create thumbnail blob"));
        }
      }, "image/png");
    };
  });
}
function getResourceforThumbGen(resources) {
  if (!Array.isArray(resources)) return resources;
  const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/bmp", "image/tiff", "image/tif", "image/svg", "image/svg+xml", "image/webp", "image/gif"];
  const videoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo", "video/x-matroska", "video/3gpp", "video/ogg"];
  const images = resources.filter((r) => imageTypes.includes(r.type));
  if (images.length > 0) {
    return images.reduce((max, img) => img.size > max.size ? img : max);
  }
  const videos = resources.filter((r) => videoTypes.includes(r.type));
  if (videos.length > 0) {
    return videos[0];
  }
  return null;
}
async function createThumbnail(recordID, resources) {
  const { data, error } = await tryCatch(pb.collection(notesCollection).getFirstListItem(`id="${recordID}"`));
  if (error) {
    console.error("Error getting record: ", error.message);
  }
  if (!data || !data.attachments) {
    console.error("Error: no attachments found");
  }
  let thumbnailURL = "";
  let record = data;
  if (!record) return;
  if (record.thumbnail) return;
  const thumbFile = getResourceforThumbGen(resources);
  let thumbResource;
  if (!thumbFile) return;
  if (thumbFile.size < 1e4) return;
  const mimeType = thumbFile.type;
  const defaultThumbURL = thumbFile.fileURL;
  const videoURL = thumbFile.fileURL;
  if (!mimeType.includes("image") && !mimeType.includes("video") && !mimeType.includes("application/octet-stream")) {
    return;
  }
  if (mimeType.includes("video")) {
    const { data: thumbFile2, error: thumbFileError } = await tryCatch(getVideoThumb(videoURL));
    if (thumbFileError) {
      console.error("Error generating thumbfile: ", thumbFileError.message);
      return;
    }
    const { data: thumbRecord, error: thumbError } = await tryCatch(pb.collection(notesCollection).update(record.id, {
      "attachments+": [thumbFile2]
    }));
    if (thumbError) {
      console.error("Error getting updated thumbnail record: ", thumbError.message);
      return;
    }
    if (!thumbRecord) return;
    thumbnailURL = `${baseURL}/${notesCollection}/${record.id}/${thumbRecord.attachments.at(-1)}?thumb=500x0`;
    const thumbnailResourceURL = `${baseURL}/${notesCollection}/${record.id}/${thumbRecord.attachments.at(-1)}`;
    const thumbHash = await getFileHash(thumbFile2);
    thumbResource = makeResourceFromFile(thumbFile2, thumbHash, thumbnailResourceURL);
  } else if (mimeType == "image/gif") {
    thumbnailURL = defaultThumbURL;
  } else {
    thumbnailURL = `${defaultThumbURL}?thumb=500x0`;
  }
  const { data: updatedRecord, error: thumbnailError } = await tryCatch(pb.collection(notesCollection).update(record.id, {
    "thumbnail": thumbnailURL
  }));
  if (thumbnailError) {
    console.error("Error updating record: ", thumbnailError.message);
  }
  record = updatedRecord;
  return thumbResource;
}
async function addThumbnailToRecord(recordID, thumbURL) {
  const { data: record, error } = await tryCatch(pb.collection(notesCollection).update(recordID, {
    "thumbnail": `${thumbURL}?thumb=500x0`
  }));
  if (error) {
    console.error("Error updating thumbURL: ", error.message);
  }
  return record;
}
function addMediaToContent(mimeType, fileURL, fileName) {
  if (!fileURL) {
    console.error("No file URL");
    return "";
  }
  if (!fileName) {
    console.error("No fileName provided");
    return "";
  }
  if (mimeType.includes("image") || ["png", "jpg", "jpeg", "gif", "webp", "bmp", "tiff", "tif"].some((ext) => fileName.includes(ext.toLowerCase()))) {
    return `<img src=${fileURL} type=${mimeType}>`;
  }
  if (fileName.includes("svg")) {
    return `<img src=${fileURL} type='svg' />`;
  }
  if (mimeType.includes("video") || ["mp4", "webm", "mov", "avi", "mkv", "3gp", "ogg"].some((ext) => fileName.includes(ext))) {
    return `<video style='width:100%' controls><source src=${fileURL} type=${mimeType} />Your browser does not support the video tag.</video>`;
  }
  if (mimeType == "audio/mpeg" || ["mp3", "wav", "aac"].some((ext) => fileName.includes(ext))) {
    return `<div style="text-align: center;"><audio class="audio-player" controls style="width: 80vw; max-width: 400px;"><source src=${fileURL} type=${mimeType}><a href=${fileURL} target="_blank">${fileName}</a>.</audio></div>`;
  }
  if (mimeType == "application/pdf") {
    return `<a href=${fileURL} target="_blank">${fileName}</a><iframe src=${fileURL} style="width: 80vw; min-height: 800px; height: 100vh; max-width: 900px; margin: auto; display: block;" frameborder="0" > </iframe> `;
  } else {
    return `<a href=${fileURL} type=${mimeType}/>${fileName}</a>`;
  }
}
function createDescription(htmlContent, maxLength = 300) {
  if (!htmlContent) return null;
  const strippedText = htmlContent.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
  const trimmedText = strippedText.trim();
  if (trimmedText.length <= maxLength) {
    return trimmedText;
  }
  return trimmedText.substring(0, maxLength);
}
function parseYouTubeDuration(duration) {
  const regex = /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);
  if (!matches) return null;
  const days = parseInt(matches[1] || 0, 10);
  const hours = parseInt(matches[2] || 0, 10);
  const minutes = parseInt(matches[3] || 0, 10);
  const seconds = parseInt(matches[4] || 0, 10);
  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);
  return parts.join(" ") || "0s";
}
async function addAsOnlyFileToRecord(recordID, file) {
  const { data: record, error } = await tryCatch(pb.collection(notesCollection).update(recordID, {
    "attachments": [file]
  }));
  if (error) {
    console.error("Error uploading file: ", error.message, error.data);
    return "";
  }
  return `${baseURL}/${notesCollection}/${recordID}/${record.attachments.at(-1)}`;
}
function makeResourceFromFile(file, hash, url) {
  const resource = {
    name: file.name,
    size: file.size,
    hash,
    type: file.type,
    fileURL: url,
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
  };
  return resource;
}
async function createOneNewResource(recordID, resource) {
  const attachment = await downloadAttachmentByURL(resource.fileURL, resource.name, resource.type);
  return {
    name: resource.name,
    fileURL: await uploadFileToPocketbase(recordID, attachment),
    oldFileURL: resource.fileURL,
    hash: resource.hash,
    type: resource.type,
    size: resource.size,
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function createNewResources(recordID, records) {
  let newResources = [];
  for (const record of records) {
    if (!record.resources) continue;
    for (const resource of record.resources) {
      if (!resource) continue;
      const newResource = await createOneNewResource(recordID, resource);
      newResources.push(newResource);
    }
  }
  return newResources;
}
function mergeResources(originalResources, newResources) {
  const newResourceList = Array.isArray(newResources) ? newResources : newResources ? [newResources] : [];
  const oldResourceList = Array.isArray(originalResources) ? originalResources : originalResources ? [originalResources] : [];
  if (oldResourceList.length === 0 && newResourceList.length === 0) return [];
  const all = [...oldResourceList, ...newResourceList];
  try {
    const seen = /* @__PURE__ */ new Set();
    const deduped = [];
    for (const res of all) {
      if (!seen.has(res.hash)) {
        seen.add(res.hash);
        deduped.push(res);
      }
    }
    return deduped;
  } catch (e) {
    console.log(e);
    return all;
  }
}
function mergeSources(notes) {
  const allSources = notes.flatMap((n) => n.sources || []);
  const uniqueSources = Array.from(
    new Map(
      allSources.map((src) => [`${src.source}|${src.source_url}`, src])
    ).values()
  );
  return uniqueSources;
}
function getContentBeforeMerge(noteContent) {
  const DomParser = new DOMParser();
  const content = DomParser.parseFromString(noteContent, "text/html");
  const head = content.querySelector("head");
  const body = content.querySelector("body");
  if (!head || !body) {
    return {
      head: "",
      body: ""
    };
  }
  body.querySelectorAll("[class]").forEach((el) => {
    const classAttr = typeof el.className === "string" ? el.className : el.getAttribute("class") || "";
    const classes = classAttr.split(/\s+/);
    const filtered = classes.filter(
      (c) => !c.startsWith("min-h-") && !c.startsWith("min-w-") && !c.startsWith("h-screen") && !c.startsWith("w-screen")
    );
    el.setAttribute("class", filtered.join(" "));
  });
  body.querySelectorAll("[style]").forEach((el) => {
    const style = el.getAttribute("style") || "";
    if (style.includes("min-height")) {
      const newStyle = style.split(";").filter((s) => !s.trim().startsWith("min-height")).join(";");
      el.setAttribute("style", newStyle);
    }
  });
  head.querySelectorAll("style").forEach((style) => {
    const cleaned = style.innerHTML.replace(/min-height\s*:\s*[\w]+/gi, "");
    style.innerHTML = cleaned;
  });
  const wrapped = `<div style="all: unset; display: block;">${body.innerHTML}</div>`;
  return {
    head: head?.innerHTML,
    body: wrapped
  };
}
function mergeNotesContent(notes) {
  let mergedHead = [];
  let mergedBody = [];
  for (const note of notes) {
    const { head, body } = getContentBeforeMerge(note.content);
    mergedHead.push(head);
    mergedBody.push(body);
  }
  const finalHead = mergedHead.join("\n");
  const finalBody = mergedBody.join("\n\n<br/>\n\n");
  const finalHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                ${finalHead}
            </head>
            <body>
                ${finalBody}
            </body>
            </html>`.trim();
  return finalHTML;
}
function createMergedNoteData(notes, newResources) {
  const [base, ...rest] = notes;
  let content = mergeNotesContent(notes);
  for (const resource of newResources) {
    if (!resource.oldFileURL) continue;
    content = content.replace(resource.oldFileURL, resource.fileURL);
  }
  return {
    title: base.title,
    notebook: base.notebook,
    tags: [...new Set(notes.flatMap((n) => n.tags || []))],
    last_opened: (/* @__PURE__ */ new Date()).toISOString(),
    sources: mergeSources(notes),
    resources: mergeResources(base.resources, newResources),
    description: notes.map((n) => n.description).join("\n\n"),
    content,
    "original_content": content
  };
}
function mergeContents(contentList) {
  let mergedHead = [];
  let mergedBody = [];
  for (const content of contentList) {
    const { head, body } = getContentBeforeMerge(content);
    mergedHead.push(head);
    mergedBody.push(body);
  }
  const finalHead = mergedHead.join("\n");
  const finalBody = mergedBody.join("\n\n<br/>\n\n");
  const finalHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                ${finalHead}
            </head>
            <body>
                ${finalBody}
            </body>
            </html>`.trim();
  return finalHTML;
}
export {
  getMimeFromName as A,
  addMediaToContent as B,
  getFileHash as C,
  addAsOnlyFileToRecord as D,
  addThumbnailToRecord as E,
  parseYouTubeDuration as F,
  setNoteState as G,
  getNoteState as H,
  NoteState as N,
  getTagState as a,
  setNotebookState as b,
  cn as c,
  setMobileState as d,
  setSettingState as e,
  setMouseState as f,
  getNotebookState as g,
  getMobileState as h,
  getSettingState as i,
  getMouseState as j,
  getAuth as k,
  setNotelistState as l,
  makeDefaultNotebook as m,
  getNotelistState as n,
  signalPageState as o,
  saveCurrentPage as p,
  createDescription as q,
  makeResourceFromFile as r,
  setTagState as s,
  tryCatch as t,
  uploadFileToPocketbase as u,
  pb as v,
  notesCollection as w,
  createThumbnail as x,
  mergeResources as y,
  parser as z
};
