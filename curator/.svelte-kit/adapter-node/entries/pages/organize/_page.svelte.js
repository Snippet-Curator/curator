import "clsx";
import { T as Topbar, a as Topbar_sidebar } from "../../../chunks/topbar-sidebar.js";
import { T as Topbar_back } from "../../../chunks/topbar-back.js";
import "dayjs";
import { g as getNotebookState, a as getTagState } from "../../../chunks/utils2.js";
import { a as Scroll_area } from "../../../chunks/scroll-area.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/index2.js";
import { N as NotebookList_1, T as TagList_1, a as New } from "../../../chunks/ChangeParent.js";
import "../../../chunks/EditNote.svelte_svelte_type_style_lang.js";
import "@emresandikci/pocketbase-query";
import { A as Archive, T as Trash_2 } from "../../../chunks/Delete.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const notebookState = getNotebookState();
    const tagState = getTagState();
    let isNewNotebookOpen = false;
    let isNewTagOpen = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Topbar($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Topbar_sidebar($$renderer4);
          $$renderer4.push(`<!----> <!---->`);
          Topbar_back($$renderer4);
          $$renderer4.push(`<!----> <div class="grow"></div>`);
        }
      });
      $$renderer3.push(`<!----> `);
      Scroll_area($$renderer3, {
        class: "h-[calc(100vh-60px)]",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="p-golden-xl mx-auto max-w-5xl"><div class="flex items-center px-3"><h1 class="grow">Notebooks</h1> <button class="btn btn-sm md:btn-md">New</button></div> <div class="card"><ul class="menu w-full">`);
          NotebookList_1($$renderer4, { allowEdit: true, notebooks: notebookState.notebooks });
          $$renderer4.push(`<!----> <li class="ml-0 mr-4 pl-0"><a href="#/archive">`);
          Archive($$renderer4, { size: 18 });
          $$renderer4.push(`<!---->Archive</a></li> <li class="ml-0 mr-4 pl-0"><a href="#/trash">`);
          Trash_2($$renderer4, { size: 18 });
          $$renderer4.push(`<!---->Trash</a></li></ul></div> <div class="divider"></div> <div class="flex items-center px-3"><h1 class="grow">Tags</h1> <button class="btn md:btn-md">New</button></div> <ul class="menu w-full">`);
          TagList_1($$renderer4, { allowEdit: true, tags: tagState.tags });
          $$renderer4.push(`<!----></ul></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> <div class="mb-20"></div> `);
      New($$renderer3, {
        newType: "Tag",
        action: (newTagName) => tagState.createOnebyName(newTagName),
        get isOpen() {
          return isNewTagOpen;
        },
        set isOpen($$value) {
          isNewTagOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      New($$renderer3, {
        newType: "Notebook",
        action: (newNotebookName) => notebookState.createOnebyName(newNotebookName),
        get isOpen() {
          return isNewNotebookOpen;
        },
        set isOpen($$value) {
          isNewNotebookOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
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
