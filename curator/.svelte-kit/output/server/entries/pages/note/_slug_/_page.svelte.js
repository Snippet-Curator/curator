import { a6 as await_block } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import { N as NoteState, h as getMobileState } from "../../../../chunks/utils2.js";
import { T as Topbar_tag_list, a as Topbar_tags, b as Topbar_notebook, c as Topbar_rating, d as Topbar_edit, e as Topbar_archive, f as Topbar_delete, g as Topbar_note_info, N as NoteContent } from "../../../../chunks/topbar-edit.js";
import { N as NoteLoading } from "../../../../chunks/NoteLoading.js";
import { h as Delete } from "../../../../chunks/Delete.js";
import { a as EditTags, E as EditNotebook, b as EditNote } from "../../../../chunks/EditNote.js";
import "@emresandikci/pocketbase-query";
import { T as Topbar, a as Topbar_sidebar } from "../../../../chunks/topbar-sidebar.js";
import { T as Topbar_back } from "../../../../chunks/topbar-back.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const noteState = new NoteState(page.params.slug);
    const mobileState = getMobileState();
    let note = noteState.note;
    let isDeleteOpen = false;
    let isEditTagsOpen = false;
    let isEditNotebookOpen = false;
    let isEditNoteOpen = false;
    let isPermaDeleteNoteOpen = false;
    const initialLoading = noteState.getNote();
    noteState.updateLastOpened();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      await_block(
        $$renderer3,
        initialLoading,
        () => {
          $$renderer3.push(`<div class="h-[calc(100vh-60px)]">`);
          NoteLoading($$renderer3);
          $$renderer3.push(`<!----></div>`);
        },
        () => {
          $$renderer3.push(`<!---->`);
          Topbar($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->`);
              Topbar_sidebar($$renderer4);
              $$renderer4.push(`<!----> <!---->`);
              Topbar_back($$renderer4);
              $$renderer4.push(`<!----> <div class="grow"></div> `);
              if (note.expand?.tags) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<!---->`);
                Topbar_tag_list($$renderer4, { tags: note.expand.tags });
                $$renderer4.push(`<!---->`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> <!---->`);
              Topbar_tags($$renderer4, {
                get isOpen() {
                  return isEditTagsOpen;
                },
                set isOpen($$value) {
                  isEditTagsOpen = $$value;
                  $$settled = false;
                }
              });
              $$renderer4.push(`<!----> `);
              if (note.expand?.notebook) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<!---->`);
                Topbar_notebook($$renderer4, {
                  notebook: note.expand.notebook,
                  get isOpen() {
                    return isEditNotebookOpen;
                  },
                  set isOpen($$value) {
                    isEditNotebookOpen = $$value;
                    $$settled = false;
                  }
                });
                $$renderer4.push(`<!---->`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (!mobileState.isMobile) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<!---->`);
                Topbar_rating($$renderer4, {
                  rating: note.rating,
                  action: async (newRating) => {
                    await noteState.changeRating(newRating);
                  }
                });
                $$renderer4.push(`<!----> <div class="divider divider-horizontal"></div>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> <!---->`);
              Topbar_edit($$renderer4, {
                get isOpen() {
                  return isEditNoteOpen;
                },
                set isOpen($$value) {
                  isEditNoteOpen = $$value;
                  $$settled = false;
                }
              });
              $$renderer4.push(`<!----> <!---->`);
              Topbar_archive($$renderer4, {
                noteStatus: noteState.note.status,
                archive: async () => {
                  await noteState.archiveNote();
                  window.history.back();
                },
                unarchive: async () => {
                  await noteState.restoreNote();
                  window.history.back();
                }
              });
              $$renderer4.push(`<!----> <!---->`);
              Topbar_delete($$renderer4, {
                noteStatus: noteState.note.status,
                restore: async () => await noteState.restoreNote(),
                get isOpen() {
                  return isDeleteOpen;
                },
                set isOpen($$value) {
                  isDeleteOpen = $$value;
                  $$settled = false;
                },
                get isPermaDeleteNoteOpen() {
                  return isPermaDeleteNoteOpen;
                },
                set isPermaDeleteNoteOpen($$value) {
                  isPermaDeleteNoteOpen = $$value;
                  $$settled = false;
                }
              });
              $$renderer4.push(`<!----> <!---->`);
              Topbar_note_info($$renderer4, { note });
              $$renderer4.push(`<!---->`);
            }
          });
          $$renderer3.push(`<!----> <div class="h-[calc(100vh-60px)]">`);
          NoteContent($$renderer3, { noteState });
          $$renderer3.push(`<!----></div> `);
          Delete($$renderer3, {
            name: "Note",
            action: async () => {
              await noteState.softDeleteNote();
              window.history.back();
            },
            get isOpen() {
              return isDeleteOpen;
            },
            set isOpen($$value) {
              isDeleteOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->this note`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Delete($$renderer3, {
            name: "Note",
            action: async () => {
              await noteState.permaDeleteNote();
              window.history.back();
            },
            get isOpen() {
              return isPermaDeleteNoteOpen;
            },
            set isOpen($$value) {
              isPermaDeleteNoteOpen = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->this note permanently`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          EditTags($$renderer3, {
            currentTags: note.expand?.tags,
            add: async (selectedTags) => await noteState.addTag(selectedTags),
            remove: async (selectedTags) => await noteState.removeTag(selectedTags),
            get isOpen() {
              return isEditTagsOpen;
            },
            set isOpen($$value) {
              isEditTagsOpen = $$value;
              $$settled = false;
            }
          });
          $$renderer3.push(`<!----> `);
          EditNotebook($$renderer3, {
            currentNotebookID: note.expand?.notebook.id,
            action: async (selectedNotebookID) => {
              await noteState.changeNotebook(selectedNotebookID);
            },
            get isOpen() {
              return isEditNotebookOpen;
            },
            set isOpen($$value) {
              isEditNotebookOpen = $$value;
              $$settled = false;
            }
          });
          $$renderer3.push(`<!----> `);
          EditNote($$renderer3, {
            note,
            thumbURL: note?.thumbnail,
            action: async (title, description, sources, selectedThumbnailURL) => {
              await noteState.changeTitle(title);
              await noteState.changeDescription(description);
              await noteState.changeSources(sources);
              await noteState.changeThumbnail(selectedThumbnailURL);
              await noteState.getNote();
            },
            get isOpen() {
              return isEditNoteOpen;
            },
            set isOpen($$value) {
              isEditNoteOpen = $$value;
              $$settled = false;
            }
          });
          $$renderer3.push(`<!---->`);
        }
      );
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
