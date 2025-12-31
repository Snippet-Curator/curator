import "clsx";
import { q as createDescription, u as uploadFileToPocketbase, r as makeResourceFromFile, t as tryCatch, v as pb, w as notesCollection, x as createThumbnail, y as mergeResources, z as parser, A as getMimeFromName, B as addMediaToContent, C as getFileHash, D as addAsOnlyFileToRecord, E as addThumbnailToRecord, F as parseYouTubeDuration, j as getMouseState, i as getSettingState, c as cn, g as getNotebookState, a as getTagState } from "../../../chunks/utils2.js";
import { C as Context, b as SvelteMap, d as attachRef, e as createBitsAttrs, w as watch, f as boolToEmptyStrOrUndef, g as boolToTrueOrUndef, h as boolToStr, i as createId, j as boxWith, m as mergeProps, a as Scroll_area } from "../../../chunks/scroll-area.js";
import { T as Topbar, a as Topbar_sidebar } from "../../../chunks/topbar-sidebar.js";
import { T as Topbar_back } from "../../../chunks/topbar-back.js";
import dayjs from "dayjs";
import { s as setContext, g as getContext, f as fallback } from "../../../chunks/context.js";
import SparkMD5 from "spark-md5";
import { v4 } from "uuid";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/index2.js";
import { S as SelectNotebook, a as SelectTags } from "../../../chunks/SelectNotebook.js";
import { R as RovingFocusGroup, S as SPACE, E as ENTER, n as noop } from "../../../chunks/EditNote.svelte_svelte_type_style_lang.js";
import "@emresandikci/pocketbase-query";
import { _ as derived, a7 as props_id, $ as attributes, a0 as bind_props, a5 as attr, X as sanitize_props, a8 as rest_props, Y as spread_props, Z as slot, a1 as ensure_array_like } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/escaping.js";
const tabsAttrs = createBitsAttrs({
  component: "tabs",
  parts: ["root", "list", "trigger", "content"]
});
const TabsRootContext = new Context("Tabs.Root");
class TabsRootState {
  static create(opts) {
    return TabsRootContext.set(new TabsRootState(opts));
  }
  opts;
  attachment;
  rovingFocusGroup;
  triggerIds = [];
  // holds the trigger ID for each value to associate it with the content
  valueToTriggerId = new SvelteMap();
  // holds the content ID for each value to associate it with the trigger
  valueToContentId = new SvelteMap();
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(opts.ref);
    this.rovingFocusGroup = new RovingFocusGroup({
      candidateAttr: tabsAttrs.trigger,
      rootNode: this.opts.ref,
      loop: this.opts.loop,
      orientation: this.opts.orientation
    });
  }
  registerTrigger(id, value) {
    this.triggerIds.push(id);
    this.valueToTriggerId.set(value, id);
    return () => {
      this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
      this.valueToTriggerId.delete(value);
    };
  }
  registerContent(id, value) {
    this.valueToContentId.set(value, id);
    return () => {
      this.valueToContentId.delete(value);
    };
  }
  setValue(v) {
    this.opts.value.current = v;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-orientation": this.opts.orientation.current,
    [tabsAttrs.root]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsListState {
  static create(opts) {
    return new TabsListState(opts, TabsRootContext.get());
  }
  opts;
  root;
  attachment;
  #isDisabled = derived(() => this.root.opts.disabled.current);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tablist",
    "aria-orientation": this.root.opts.orientation.current,
    "data-orientation": this.root.opts.orientation.current,
    [tabsAttrs.list]: "",
    "data-disabled": boolToEmptyStrOrUndef(this.#isDisabled()),
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsTriggerState {
  static create(opts) {
    return new TabsTriggerState(opts, TabsRootContext.get());
  }
  opts;
  root;
  attachment;
  #tabIndex = 0;
  #isActive = derived(() => this.root.opts.value.current === this.opts.value.current);
  #isDisabled = derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
  #ariaControls = derived(() => this.root.valueToContentId.get(this.opts.value.current));
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
    watch([() => this.opts.id.current, () => this.opts.value.current], ([id, value]) => {
      return this.root.registerTrigger(id, value);
    });
    this.onfocus = this.onfocus.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  #activate() {
    if (this.root.opts.value.current === this.opts.value.current) return;
    this.root.setValue(this.opts.value.current);
  }
  onfocus(_) {
    if (this.root.opts.activationMode.current !== "automatic" || this.#isDisabled()) return;
    this.#activate();
  }
  onclick(_) {
    if (this.#isDisabled()) return;
    this.#activate();
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#activate();
      return;
    }
    this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tab",
    "data-state": getTabDataState(this.#isActive()),
    "data-value": this.opts.value.current,
    "data-orientation": this.root.opts.orientation.current,
    "data-disabled": boolToEmptyStrOrUndef(this.#isDisabled()),
    "aria-selected": boolToStr(this.#isActive()),
    "aria-controls": this.#ariaControls(),
    [tabsAttrs.trigger]: "",
    disabled: boolToTrueOrUndef(this.#isDisabled()),
    tabindex: this.#tabIndex,
    //
    onclick: this.onclick,
    onfocus: this.onfocus,
    onkeydown: this.onkeydown,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsContentState {
  static create(opts) {
    return new TabsContentState(opts, TabsRootContext.get());
  }
  opts;
  root;
  attachment;
  #isActive = derived(() => this.root.opts.value.current === this.opts.value.current);
  #ariaLabelledBy = derived(() => this.root.valueToTriggerId.get(this.opts.value.current));
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
    watch([() => this.opts.id.current, () => this.opts.value.current], ([id, value]) => {
      return this.root.registerContent(id, value);
    });
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tabpanel",
    hidden: boolToTrueOrUndef(!this.#isActive()),
    tabindex: 0,
    "data-value": this.opts.value.current,
    "data-state": getTabDataState(this.#isActive()),
    "aria-labelledby": this.#ariaLabelledBy(),
    "data-orientation": this.root.opts.orientation.current,
    [tabsAttrs.content]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function getTabDataState(condition) {
  return condition ? "active" : "inactive";
}
function Tabs($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      id = createId(uid),
      ref = null,
      value = "",
      onValueChange = noop,
      orientation = "horizontal",
      loop = true,
      activationMode = "automatic",
      disabled = false,
      children,
      child,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const rootState = TabsRootState.create({
      id: boxWith(() => id),
      value: boxWith(() => value, (v) => {
        value = v;
        onValueChange(v);
      }),
      orientation: boxWith(() => orientation),
      loop: boxWith(() => loop),
      activationMode: boxWith(() => activationMode),
      disabled: boxWith(() => disabled),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps(restProps, rootState.props);
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref, value });
  });
}
function Tabs_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      children,
      child,
      id = createId(uid),
      ref = null,
      value,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = TabsContentState.create({
      value: boxWith(() => value),
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps(restProps, contentState.props);
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Tabs_list$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      child,
      children,
      id = createId(uid),
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const listState = TabsListState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps(restProps, listState.props);
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div${attributes({ ...mergedProps })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Tabs_trigger$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      child,
      children,
      disabled = false,
      id = createId(uid),
      type = "button",
      value,
      ref = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = TabsTriggerState.create({
      id: boxWith(() => id),
      disabled: boxWith(() => disabled ?? false),
      value: boxWith(() => value),
      ref: boxWith(() => ref, (v) => ref = v)
    });
    const mergedProps = mergeProps(restProps, triggerState.props, { type });
    if (child) {
      $$renderer2.push("<!--[-->");
      child($$renderer2, { props: mergedProps });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attributes({ ...mergedProps })}>`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></button>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
dayjs.extend(customParseFormat);
class htmlImport {
  title;
  content;
  parsedHTML;
  source;
  sourceURL;
  recordID;
  added;
  description;
  selectedNotebookdID;
  selectedTagIdArrays;
  HTMLparser;
  resources;
  bodyResources;
  // this is for thumbnail generation
  constructor(fileContent, selectedNotebookID, selectedTagIdArrays) {
    this.HTMLparser = new DOMParser();
    this.content = fileContent;
    this.parsedHTML = this.parseHTML(fileContent);
    this.title = this.getTitle();
    this.description = this.getDescription();
    this.source = this.getSource();
    this.sourceURL = this.getSourceURL();
    this.added = this.getAdded();
    this.recordID = "";
    this.selectedNotebookdID = selectedNotebookID;
    this.selectedTagIdArrays = selectedTagIdArrays;
    this.resources = [];
    this.bodyResources = [];
  }
  parseHTML(fileContent) {
    return this.HTMLparser.parseFromString(fileContent, "text/html");
  }
  getTitle() {
    return this.parsedHTML.querySelector("title")?.textContent || "Untitled";
  }
  getDescription() {
    const description = this.parsedHTML.querySelector('meta[property="description"]');
    if (description) {
      return description.getAttribute("content");
    }
    const ogDescription = this.parsedHTML.querySelector('meta[property="og:description"]')?.getAttribute("content");
    if (!ogDescription) return null;
    return createDescription(ogDescription);
  }
  getSource() {
    const source = this.parsedHTML.querySelector('meta[property="source"]');
    if (source) {
      return source.getAttribute("content");
    }
    const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);
    if (match) {
      return "SingleFile Save";
    }
    return null;
  }
  getSourceURL() {
    const sourceURL = this.parsedHTML.querySelector('meta[property="source-url"]');
    if (sourceURL) {
      return sourceURL.getAttribute("content");
    }
    const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);
    if (!match || !match[1]) {
      return null;
    }
    return match[1];
  }
  getAdded() {
    const added = this.parsedHTML.querySelector('meta[property="added"]');
    if (added && added.textContent) {
      return added.getAttribute("content") || (/* @__PURE__ */ new Date()).toISOString();
    }
    const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);
    if (match) {
      return new Date(match[2]).toISOString();
    }
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  base64ToFile(base64, mimeType) {
    let extension = "";
    let filename = "";
    let byteCharacters = "";
    let hash = "";
    try {
      extension = mimeType.split("/")[1];
      filename = `${v4()}.${extension}`;
      byteCharacters = atob(base64);
      hash = SparkMD5.hashBinary(byteCharacters);
    } catch (err) {
      console.error("Error converting resource: ", err);
    }
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return {
      file: new File([byteArray], filename, { type: mimeType }),
      hash
    };
  }
  async replaceResources(fileContent) {
    if (!fileContent) return;
    const bodyContent = this.parsedHTML.querySelector("body")?.outerHTML || "";
    const mediaMatch = /\b(data:(?:image|font|video)\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+)\1?/g;
    const matches = [...fileContent.matchAll(mediaMatch)].map((m) => m[1]);
    const bodyMatchSet = new Set([...bodyContent?.matchAll(mediaMatch)].map((m) => m[1]));
    let updatedContent = fileContent;
    for (const match of matches) {
      const mimeType = match.split(";")[0].split(":")[1] || void 0;
      const base64Data = match.split(",")[1];
      if (!base64Data || !mimeType) {
        console.error("Error: invalid data URL format");
        continue;
      }
      const { file: resourceFile, hash } = this.base64ToFile(base64Data, mimeType);
      if (!resourceFile) {
        console.error("Error converting resource file");
        continue;
      }
      const fileURL = await uploadFileToPocketbase(this.recordID, resourceFile);
      const resource = makeResourceFromFile(resourceFile, hash, fileURL);
      this.resources.push(resource);
      if (fileURL) {
        updatedContent = updatedContent.replace(match, fileURL);
      }
      if (bodyMatchSet.has(match)) {
        this.bodyResources.push(resource);
      }
    }
    this.content = updatedContent;
  }
  stripCSP() {
    const matchPattern = /<meta http-equiv=["]?Content-Security-Policy["]?[^>]*>/ig;
    this.content = this.content.replace(matchPattern, "");
  }
  async uploadToDB() {
    const sources = [{
      "source": this.source,
      "source_url": this.sourceURL
    }];
    const skeletonData = {
      "title": this.title,
      "added": this.added,
      "description": this.description,
      "weight": 5,
      "notebook": this.selectedNotebookdID,
      "tags": this.selectedTagIdArrays,
      "last_score_updated": (/* @__PURE__ */ new Date()).toISOString(),
      "sources": JSON.stringify(sources),
      "status": "active"
    };
    const { data: record, error } = await tryCatch(pb.collection(notesCollection).create(skeletonData));
    if (error) {
      if (error.data.data.title.code == "validation_not_unique") {
        throw new Error("Skipped duplicate note");
      }
      throw error;
    }
    if (!record) return;
    this.recordID = record.id;
    await this.replaceResources(this.content);
    this.stripCSP();
    const thumbResource = await createThumbnail(this.recordID, this.bodyResources);
    const mergedResource = mergeResources(this.resources, thumbResource) || this.resources;
    const data = {
      "content": this.content,
      "original_content": this.content,
      "resources": mergedResource
    };
    const { data: updatedRecord, error: updatedError } = await tryCatch(pb.collection(notesCollection).update(this.recordID, data));
    if (updatedError) {
      console.error("Error updating record: ", updatedError.message, updatedError.data);
    }
  }
}
class EnImport {
  enNote;
  enMedias;
  enResources;
  title;
  content;
  added;
  updated;
  source;
  sourceURL;
  tags;
  recordID;
  description;
  selectedNotebookdID;
  selectedTagsID;
  constructor(fileContent, selectedNotebookID, selectedTagsID) {
    this.recordID = "";
    this.selectedNotebookdID = selectedNotebookID;
    this.selectedTagsID = selectedTagsID;
    const { xmlNote, xmlMedia, xmlContent } = this.parseEnex(fileContent);
    this.enNote = xmlNote;
    this.content = xmlContent;
    this.enMedias = this.getEnMedias(xmlMedia);
    this.tags = this.getTags();
    this.enResources = this.getEnResources();
    this.title = this.enNote["en-export"].note.title;
    this.added = this.getAdded();
    this.updated = this.enNote["en-export"].note.updated;
    this.source = this.getSource();
    this.sourceURL = this.getSourceURL();
    this.description = createDescription(this.content);
  }
  parseEnex(fileContent) {
    const xmlNote = parser.parse(fileContent);
    const xmlMedia = parser.parse(xmlNote["en-export"]["note"]["content"])["en-note"]["en-media"];
    const xmlContent = xmlNote["en-export"]["note"]["content"].match(/<en-note[\s\S]*<\/en-note>/)?.[0];
    return {
      xmlNote,
      xmlMedia,
      xmlContent
    };
  }
  getEnMedias(xmlMedia) {
    if (!xmlMedia) return null;
    return Array.isArray(xmlMedia) ? xmlMedia : [xmlMedia];
  }
  getTags() {
    const tags = this.enNote["en-export"].note.tag;
    if (!tags) return null;
    return Array.isArray(tags) ? tags : [tags];
  }
  getEnResources() {
    const resources = this.enNote["en-export"]["note"]["resource"];
    if (!resources) return null;
    return Array.isArray(resources) ? resources : [resources];
  }
  getSource() {
    return this.enNote["en-export"].note["note-attributes"].source;
  }
  getSourceURL() {
    return this.enNote["en-export"].note["note-attributes"]["source-url"];
  }
  getAdded() {
    const addedDate = this.enNote["en-export"].note.created;
    if (!addedDate) {
      return (/* @__PURE__ */ new Date()).toISOString();
    }
    return dayjs(addedDate, "YYYYMMDDTHHmmss[Z]").toISOString();
  }
  convertResourceToFile(resource) {
    let binaryStr = "";
    let byteArray;
    try {
      binaryStr = atob(resource.data["#text"]);
      byteArray = new Uint8Array(binaryStr.length);
    } catch (err) {
      console.error("Error converting resource file");
      return;
    }
    for (let i = 0; i < binaryStr.length; i++) {
      byteArray[i] = binaryStr.charCodeAt(i);
    }
    const originalMime = resource.mime;
    const fileName = resource["resource-attributes"]["file-name"] || "unknown";
    const correctedMime = getMimeFromName(fileName, originalMime);
    const blob = new Blob([byteArray], { type: correctedMime });
    return new File([blob], fileName, { type: correctedMime });
  }
  async uploadResources() {
    if (!this.enResources || this.enResources.length === 0) return;
    for (const resource of this.enResources) {
      if (!resource) continue;
      const binaryStr = atob(resource.data["#text"]);
      resource.hash = SparkMD5.hashBinary(binaryStr);
      resource.file = this.convertResourceToFile(resource);
      if (!resource.file) return;
      resource.name = resource.file.name;
      resource.mime = resource.file.type;
      resource.fileURL = await uploadFileToPocketbase(this.recordID, resource.file);
    }
  }
  replaceEnMedia() {
    const mediaMatch = /<en-media[^>]+?hash="([a-zA-Z0-9]+)"[^>]*\/?>/g;
    if (!this.enResources || this.enResources.length === 0) return;
    const enResources = this.enResources;
    const replaceMedia = (match, hash) => {
      const resource = enResources.filter((resource2) => {
        return resource2.hash == hash;
      });
      if (!resource || resource.length === 0) return "";
      if (!resource[0].fileURL) return;
      const fileName = resource[0]["resource-attributes"]["file-name"] || "untitled";
      const originalMime = resource[0].mime;
      const correctedMime = getMimeFromName(fileName, originalMime);
      return addMediaToContent(correctedMime, resource[0].fileURL, fileName);
    };
    this.content = this.content.replace(mediaMatch, replaceMedia);
  }
  async addTags() {
    if (!this.tags) return [""];
    if (this.tags.length == 1 && this.tags[0] == "") return [""];
    const tagList = [];
    const { data: existingTags, error } = await tryCatch(pb.collection("tags").getFullList());
    if (error) {
      console.error("Unable to get all tags: ", error.message);
      return [""];
    }
    if (!existingTags) return [""];
    const existingTagNames = new Set(existingTags.map((tag) => tag.name));
    for (const tag of this.tags) {
      if (existingTagNames.has(tag.toLowerCase())) {
        const record = existingTags.find((record2) => record2.name === tag.toLowerCase());
        tagList.push(record.id);
      } else {
        const { data: newTag, error: newTagError } = await tryCatch(pb.collection("tags").create({ "name": tag.toLowerCase() }));
        if (newTagError) {
          console.error("Unable to make new tags: ", newTagError.message, tag);
          return [""];
        }
        if (!newTag) return [""];
        tagList.push(newTag.id);
      }
    }
    return tagList;
  }
  makeResourceFromFiles(enResources) {
    if (!enResources) return;
    if (enResources.length === 0) return;
    let resources = [];
    for (const enResource of enResources) {
      const resource = {
        name: enResource.name,
        size: enResource.file?.size,
        hash: enResource.hash,
        type: enResource.mime,
        fileURL: enResource.fileURL,
        lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
        sourceURL: enResource["resource-attributes"]["source-url"],
        width: enResource.width,
        height: enResource.height,
        latitude: enResource["resource-attributes"].latitude,
        longitude: enResource["resource-attributes"].longitude,
        timestamp: enResource["resource-attributes"].timestamp,
        cameraMake: enResource["resource-attributes"]["camera-make"]
      };
      resources.push(resource);
    }
    return resources;
  }
  async uploadToDB() {
    const oldTags = await this.addTags();
    const newTags = this.selectedTagsID || [];
    const tags = [...oldTags, ...newTags];
    const sources = [{
      "source": this.source,
      "source_url": this.sourceURL
    }];
    const skeletonData = {
      "title": this.title,
      "added": this.added,
      "tags": tags,
      "weight": 5,
      "notebook": this.selectedNotebookdID,
      "last_score_updated": (/* @__PURE__ */ new Date()).toISOString(),
      "sources": JSON.stringify(sources),
      "status": "active"
    };
    const { data: record, error } = await tryCatch(pb.collection(notesCollection).create(skeletonData));
    if (error) {
      if (error.data.data.title.code == "validation_not_unique") {
        throw new Error("Skipped duplicate note");
      }
      console.log("Error uploading file: ", error.message, error.data);
      throw error;
    }
    this.recordID = record.id;
    await this.uploadResources();
    this.replaceEnMedia();
    const resources = this.makeResourceFromFiles(this.enResources);
    const thumbResource = await createThumbnail(this.recordID, resources);
    const mergedResource = mergeResources(resources, thumbResource) || resources;
    const data = {
      "content": this.content,
      "original_content": this.content,
      "description": this.description,
      "resources": mergedResource
    };
    const { data: updatedRecord, error: updatedError } = await tryCatch(pb.collection(notesCollection).update(this.recordID, data));
    if (updatedError) {
      console.error("Error updating record: ", updatedError.message, error.data);
    }
  }
}
class fileImport {
  title;
  file;
  mimeType;
  content;
  added;
  fileURL;
  recordID;
  selectedNotebookdID;
  selectedTagIdArrays;
  constructor(file, selectedNotebookID, selectedTagIdArrays) {
    this.file = file;
    this.mimeType = file.type;
    this.recordID = "";
    this.fileURL = "";
    this.content = "";
    this.title = `${file.name} ${dayjs(Date()).format("MM-DD-YYYY")}`;
    this.selectedNotebookdID = selectedNotebookID;
    this.selectedTagIdArrays = selectedTagIdArrays;
    this.added = (/* @__PURE__ */ new Date()).toISOString();
  }
  async uploadToDB() {
    const sources = [{
      "source": "Desktop",
      "source_url": ""
    }];
    const skeletonData = {
      "title": this.title,
      "notebook": this.selectedNotebookdID,
      "tags": this.selectedTagIdArrays,
      "last_score_updated": (/* @__PURE__ */ new Date()).toISOString(),
      "weight": 5,
      "added": this.added,
      "status": "active",
      "sources": sources
    };
    const { data: record, error } = await tryCatch(pb.collection(notesCollection).create(skeletonData));
    if (error) {
      if (error.data.data.title.code == "validation_not_unique") {
        throw new Error("Skipped duplicate note");
      }
      throw error;
    }
    if (!record) return;
    this.recordID = record.id;
    this.fileURL = await uploadFileToPocketbase(this.recordID, this.file);
    this.content = addMediaToContent(this.mimeType, this.fileURL, this.file.name);
    const hash = await getFileHash(this.file);
    const resources = [makeResourceFromFile(this.file, hash, this.fileURL)];
    const thumbResource = await createThumbnail(this.recordID, resources);
    const mergedResource = mergeResources(resources, thumbResource) || resources;
    const data = {
      "content": this.content,
      "original_content": this.content,
      "resources": mergedResource
    };
    const { data: updatedRecord, error: updatedError } = await tryCatch(pb.collection(notesCollection).update(this.recordID, data));
    if (updatedError) {
      console.error("Error updating record: ", updatedError.message);
    }
  }
}
class youtubeImport {
  title;
  channelTitle;
  channelID;
  source;
  recordID;
  description;
  content;
  resources;
  youtubeFullURL;
  youtubeThumbURL;
  thumbURL;
  youtubeID;
  youtubeAPI;
  selectedNotebookID;
  selectedTagIdArrays;
  viewCount;
  publishedDate;
  duration;
  constructor(youtubeFullURL, selectedNotebookID, selectedTagIdArrays, youtubeAPI) {
    this.youtubeFullURL = youtubeFullURL;
    this.youtubeID = this.getYoutubeID(youtubeFullURL);
    this.selectedNotebookID = selectedNotebookID;
    this.selectedTagIdArrays = selectedTagIdArrays;
    this.youtubeAPI = youtubeAPI;
    this.youtubeThumbURL = "";
    this.thumbURL = "";
    this.title = "";
    this.channelTitle = "";
    this.description = "";
    this.content = "";
    this.source = "Youtube";
    this.recordID = "";
    this.resources = [];
    this.channelID = "";
    this.viewCount = "";
    this.publishedDate = "";
    this.duration = "";
  }
  getYoutubeID(url) {
    if (!url) return;
    const patterns = [
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?&]+)/,
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?&]+)/,
      /^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match?.[1]) return match[1];
    }
    this.youtubeFullURL = `https://www.youtube.com/watch?v=${url}`;
    return url;
  }
  async fetchYoutubeMetadata(videoID, apiKey) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoID}&key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch Youtube error: ${response.status}`);
    }
    const data = await response.json();
    const video = data.items?.[0];
    if (!video) {
      await pb.collection(notesCollection).delete(this.recordID);
      throw new Error("Video not found");
    }
    this.title = video.snippet.title;
    this.content = video.snippet.description;
    this.description = createDescription(this.content);
    this.youtubeThumbURL = video.snippet.thumbnails.standard?.url ?? video.snippet.thumbnails.high?.url ?? video.snippet.thumbnails.medium?.url ?? video.snippet.thumbnails.default?.url;
    this.channelTitle = video.snippet.channelTitle;
    this.channelID = `https://www.youtube.com/${video.snippet.channelID}`;
    this.viewCount = video.statistics.viewCount;
    this.publishedDate = video.snippet.publishedAt ?? "";
    this.duration = video.contentDetails.duration ?? "";
  }
  async addThumbnailandResource(youtubeThumbURL) {
    if (!youtubeThumbURL) {
      console.log("No youtube thumb");
      return;
    }
    const response = await fetch(youtubeThumbURL);
    if (!response.ok) {
      console.error(`Error fetching Youtube thumbnail: ${response.status}`);
      return;
    }
    const blob = await response.blob();
    const thumbFile = new File([blob], "youtube-thumbnail.jpg", { type: blob.type });
    this.thumbURL = await addAsOnlyFileToRecord(this.recordID, thumbFile);
    await addThumbnailToRecord(this.recordID, this.thumbURL);
    const hash = await getFileHash(thumbFile);
    const resource = makeResourceFromFile(thumbFile, hash, this.thumbURL);
    this.resources = [resource];
  }
  makeHTML() {
    return `
        <style>
            body {
            font-family: "Concourse4", "Segoe UI", sans-serif;
            font-size: 16px
            }
        </style>
        <body>
        <div style="font-family: var(--font-sans)">
	<h2 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.2rem">${this.title}</h2>
	<div style="margin-bottom: 1rem">
	<img style="width: 100%; height: auto" src=${this.thumbURL} alt="thumbnail" />
	</div>
	
	<div style="font-weight: 600">By <a href=${this.channelID}>${this.channelTitle}</a>
        <div style="font-size: 0.8rem">
			${this.publishedDate}<br />
			${this.duration}<br />
			${this.viewCount} views
		</div>
    </div>

	<div style="padding: 1.6rem">
		${this.content?.replace(/\n/g, "<br/>") ?? ""}
	</div>
    <div style="margin-bottom: 1rem">
		<iframe
			style="width: 100%;aspect-ratio: 16/9"
			src="https://www.youtube-nocookie.com/embed/${this.youtubeID}"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
    </div>
    </body> 
`;
  }
  async uploadToDB() {
    const skeletonData = {
      "title": this.title,
      "notebook": this.selectedNotebookID,
      "tags": this.selectedTagIdArrays,
      "last_score_updated": (/* @__PURE__ */ new Date()).toISOString(),
      "weight": 5,
      "added": (/* @__PURE__ */ new Date()).toISOString(),
      "status": "active"
    };
    const filter = `sources.0.source = "Youtube" && sources.0.source_url ~ "${this.youtubeID}"`;
    const { data: record, error } = await tryCatch(pb.collection(notesCollection).getFirstListItem(filter));
    if (error || !record) {
      const newRecord = await pb.collection(notesCollection).create(skeletonData);
      this.recordID = newRecord.id;
    } else {
      this.recordID = record.id;
    }
    await this.fetchYoutubeMetadata(this.youtubeID, this.youtubeAPI);
    this.publishedDate = dayjs(this.publishedDate).format("MM/DD/YYYY") ?? "";
    this.duration = parseYouTubeDuration(this.duration) ?? "";
    this.viewCount = Number(this.viewCount).toLocaleString("en-US");
    await this.addThumbnailandResource(this.youtubeThumbURL);
    this.content = this.makeHTML();
    const sources = [{
      "source": this.source,
      "source_url": this.youtubeFullURL
    }];
    const data = {
      "title": this.title,
      "sources": sources,
      "description": this.description,
      "content": this.content,
      "original_content": this.content,
      "resources": this.resources
    };
    const { data: updatedRecord, error: updatedError } = await tryCatch(pb.collection(notesCollection).update(this.recordID, data));
    if (updatedError) {
      console.error("Error updating record: ", updatedError.message);
    }
  }
}
const decoder = new TextDecoder("utf-8");
class ImportStateClass {
  uploadStatus = "stopped";
  successFiles = [];
  failureFiles = [];
  successYTs = [];
  failureYTs = [];
  totalFiles = 0;
  progress = 0;
  currentFile = "";
  filesToUpload = [];
  selectedNotebookID = "";
  selectedTagIdArray = [];
  inboxID;
  constructor(inboxID) {
    this.inboxID = inboxID;
  }
  getSelectedNotebookID(newID) {
    if (!this.inboxID) throw new Error("Error: no inbox provided");
    if (!newID || newID.startsWith("Import")) {
      this.selectedNotebookID = this.inboxID;
      return this.inboxID;
    }
    this.selectedNotebookID = newID;
    return newID;
  }
  async getDecodedText(file) {
    const decodedText = decoder.decode(await file.arrayBuffer());
    if (!decodedText) throw new Error("Error decoding text");
    return decodedText;
  }
  handleFileUpload(event) {
    const input = event.target;
    if (!input.files) return new Error("Error: no input files");
    this.filesToUpload = Array.from(input.files);
    this.totalFiles = this.filesToUpload.length;
  }
  async uploadSingleFile(file, type) {
    if (type === "html") {
      const decodedText = await this.getDecodedText(file);
      const parsedHTML = new htmlImport(decodedText, this.selectedNotebookID, this.selectedTagIdArray);
      const { data, error } = await tryCatch(parsedHTML.uploadToDB());
      if (error) {
        console.error(error);
        this.failureFiles.push({ name: file.name, error: error.message });
        return;
      }
      this.successFiles.push(file.name);
      return;
    }
    if (type === "enex") {
      const decodedText = await this.getDecodedText(file);
      const parsedXML = new EnImport(decodedText, this.selectedNotebookID, this.selectedTagIdArray);
      const { data, error } = await tryCatch(parsedXML.uploadToDB());
      if (error) {
        console.error(error);
        this.failureFiles.push({ name: file.name, error: error.message });
        return;
      }
      this.successFiles.push(file.name);
      return;
    }
    if (type === "file") {
      const imageFile = new fileImport(file, this.selectedNotebookID, this.selectedTagIdArray);
      const { data, error } = await tryCatch(imageFile.uploadToDB());
      if (error) {
        console.error(error);
        this.failureFiles.push({ name: file.name, error: error.message });
        return;
      }
      this.successFiles.push(file.name);
      return;
    }
  }
  async uploadYoutube(url, selectedNotebookID, selectedTagIdArray, APIKey) {
    const youtubeFile = new youtubeImport(url, selectedNotebookID, selectedTagIdArray, APIKey);
    const { data, error } = await tryCatch(youtubeFile.uploadToDB());
    if (error) {
      console.error(error);
      this.failureFiles.push({ name: url, error: error.message });
      return;
    }
    this.successFiles.push(url);
    return;
  }
  async uploadFileByType(file) {
    if (file.type == "text/html") {
      await this.uploadSingleFile(file, "html");
    } else if (file.name.includes(".enex")) {
      await this.uploadSingleFile(file, "enex");
    } else {
      await this.uploadSingleFile(file, "file");
    }
  }
  async importFiles() {
    this.uploadStatus = "in progress";
    for (const [index, file] of this.filesToUpload.entries()) {
      this.currentFile = file.name;
      await this.uploadFileByType(file);
      this.progress = Math.round((index + 1) / this.totalFiles * 100);
    }
    this.currentFile = "";
    this.uploadStatus = "completed";
  }
  async importYoutube(urls, API) {
    if (!urls || !API) return;
    const urlList = urls.split("\n");
    this.totalFiles = urlList.length;
    this.uploadStatus = "in progress";
    for (const [index, url] of urlList.entries()) {
      this.progress = Math.round((index + 1) / this.totalFiles * 100);
      if (!url) continue;
      this.currentFile = url.trim();
      await this.uploadYoutube(url.trim(), this.selectedNotebookID, this.selectedTagIdArray, API);
    }
    this.currentFile = "";
    this.uploadStatus = "completed";
  }
}
function setImportState(inboxID) {
  return setContext("Import", new ImportStateClass(inboxID));
}
function getImportState() {
  return getContext("Import");
}
function File$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { notebookState, tagState } = $$props;
    getImportState();
    getMouseState();
    let selectedNotebookID = "";
    let selectedTagIdArray = [];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<section class="card mx-auto mt-10"><div class="card-body"><h2 class="card-title">Import Files</h2> <div class="gap-golden-xl grid grid-cols-12"><div class="prose col-span-12 md:col-span-6"><p>Evernote ENEX exports and SingleFile HTMLs will be imported as HTML files. Images, audios,
					PDFs, and videos will be added as embedded HTML. Other file formats will be added as file
					with a link. See <a href="#/">here</a> for details on import.</p></div> <div class="col-span-12 md:col-span-6"><div class="gap-golden-md flex flex-col"><input type="file" multiple id="file" required class="file-input w-full"/> `);
      SelectNotebook($$renderer3, {
        notebooks: notebookState.flatNotebooks,
        get selectedNotebookID() {
          return selectedNotebookID;
        },
        set selectedNotebookID($$value) {
          selectedNotebookID = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      SelectTags($$renderer3, {
        tags: tagState.flatTags,
        get selectedTagIdArray() {
          return selectedTagIdArray;
        },
        set selectedTagIdArray($$value) {
          selectedTagIdArray = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <button class="btn btn-neutral">Import</button></div></div></div></div></section>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function Youtube($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { notebooks, tags } = $$props;
    const settingState = getSettingState();
    getImportState();
    getMouseState();
    let youtubeURLs = "";
    let selectedYoutubeNotebookID = "";
    let selectedTagIdArray = [];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<section class="card mx-auto"><div class="card-body"><h2 class="card-title">Add Youtube Videos</h2> <div class="gap-golden-xl grid grid-cols-12"><div class="prose col-span-12 md:col-span-6"><p>This will add youtube videos as an embedded playable video. The video itself will not be
					downloaded. However, this enables organization of saved youtube videos and will also save
					the titles, thumbnail, and description. You need to have youtube API setup in Settings
					first to use this.</p></div> <div class="gap-golden-md col-span-12 flex flex-col md:col-span-6"><textarea placeholder="Paste full youtube URLs or video IDs, one on each line." class="textarea w-full">`);
      const $$body = escape_html(youtubeURLs);
      if ($$body) {
        $$renderer3.push(`${$$body}`);
      }
      $$renderer3.push(`</textarea> `);
      SelectNotebook($$renderer3, {
        notebooks,
        get selectedNotebookID() {
          return selectedYoutubeNotebookID;
        },
        set selectedNotebookID($$value) {
          selectedYoutubeNotebookID = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      SelectTags($$renderer3, {
        tags,
        get selectedTagIdArray() {
          return selectedTagIdArray;
        },
        set selectedTagIdArray($$value) {
          selectedTagIdArray = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <button${attr("disabled", !settingState.youtubeAPIKey, true)} class="btn btn-neutral">Import</button></div></div></div></section>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function Tabs_content($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "value"]);
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["class"], void 0);
    let value = $$props["value"];
    Tabs_content$1($$renderer2, spread_props([
      {
        class: cn("ring-offset-base-100 focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", className),
        value
      },
      $$restProps,
      {
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          slot($$renderer3, $$props, "default", {});
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      }
    ]));
    bind_props($$props, { class: className, value });
  });
}
function Tabs_list($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["class"], void 0);
    Tabs_list$1($$renderer2, spread_props([
      {
        class: cn("bg-base-200 inline-flex h-9 items-center justify-center rounded-lg p-1", className)
      },
      $$restProps,
      {
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          slot($$renderer3, $$props, "default", {});
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      }
    ]));
    bind_props($$props, { class: className });
  });
}
function Tabs_trigger($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "value"]);
  $$renderer.component(($$renderer2) => {
    let className = fallback($$props["class"], void 0);
    let value = $$props["value"];
    Tabs_trigger$1($$renderer2, spread_props([
      {
        class: cn("ring-offset-base-content focus-visible:ring-ring data-[state=active]:bg-base-100 data-[state=active]:text-base-content inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow", className),
        value
      },
      $$restProps,
      {
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          slot($$renderer3, $$props, "default", {});
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      }
    ]));
    bind_props($$props, { class: className, value });
  });
}
const Root = Tabs;
function Status($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const importState = getImportState();
    if (importState.uploadStatus == "in progress" || importState.uploadStatus == "completed") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card card-border p-golden-md m-golden-xl grid grid-cols-12"><div class="col-span-3">Progress</div> <div class="col-span-9 flex items-center gap-x-2"><progress class="progress h-4"${attr("value", importState.progress)} max="100"></progress> ${escape_html(importState.progress)}%</div> <div class="col-span-3">Status</div> <div class="col-span-9">${escape_html(importState.uploadStatus)}</div> <div class="col-span-3">Current File</div> <div class="col-span-9 text-left">${escape_html(importState.currentFile)}</div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <section class="gap-golden-xl m-golden-xl card grid grid-cols-1">`);
    if (importState.uploadStatus == "in progress" || importState.uploadStatus == "completed") {
      $$renderer2.push("<!--[-->");
      Root($$renderer2, {
        value: "success",
        children: ($$renderer3) => {
          Tabs_list($$renderer3, {
            class: "grid w-full grid-cols-2",
            children: ($$renderer4) => {
              Tabs_trigger($$renderer4, {
                value: "success",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Success`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Tabs_trigger($$renderer4, {
                value: "errors",
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Errors`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Tabs_content($$renderer3, {
            value: "success",
            children: ($$renderer4) => {
              Scroll_area($$renderer4, {
                class: "h-100",
                children: ($$renderer5) => {
                  $$renderer5.push(`<table class="table-zebra table"><thead><tr><th></th><th>File or URL</th></tr></thead><tbody><!--[-->`);
                  const each_array = ensure_array_like(importState.successFiles);
                  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
                    let item = each_array[index];
                    $$renderer5.push(`<tr><th>${escape_html(index + 1)}</th><td>${escape_html(item)}</td></tr>`);
                  }
                  $$renderer5.push(`<!--]--></tbody></table>`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----> `);
          Tabs_content($$renderer3, {
            value: "errors",
            children: ($$renderer4) => {
              Scroll_area($$renderer4, {
                class: "h-100",
                children: ($$renderer5) => {
                  $$renderer5.push(`<table class="table-zebra table"><thead><tr><th></th><th>File name or URL</th><th>Error Message</th></tr></thead><tbody><!--[-->`);
                  const each_array_1 = ensure_array_like(importState.failureFiles);
                  for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
                    let item = each_array_1[index];
                    $$renderer5.push(`<tr><th>${escape_html(index + 1)}</th><td>${escape_html(item.name)}</td><td>${escape_html(item.error)}</td></tr>`);
                  }
                  $$renderer5.push(`<!--]--></tbody></table>`);
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const notebookState = getNotebookState();
    const tagState = getTagState();
    const notebooks = notebookState.flatNotebooks;
    const tags = tagState.flatTags;
    setImportState(notebookState.inboxID);
    $$renderer2.push(`<!---->`);
    Topbar($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Topbar_sidebar($$renderer3);
        $$renderer3.push(`<!----> <!---->`);
        Topbar_back($$renderer3);
        $$renderer3.push(`<!----> <div class="grow"></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Scroll_area($$renderer2, {
      class: "h-[calc(100vh-60px)] overflow-y-auto",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="mx-auto mb-20 max-w-5xl">`);
        File$1($$renderer3, { notebookState, tagState });
        $$renderer3.push(`<!----> `);
        Youtube($$renderer3, { notebooks, tags });
        $$renderer3.push(`<!----> <div class="divider"></div> `);
        Status($$renderer3);
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
