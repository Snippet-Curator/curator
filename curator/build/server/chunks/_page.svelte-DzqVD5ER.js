import { T as Topbar, a as Topbar_sidebar } from './topbar-sidebar-BHyfBO4h.js';
import { T as Topbar_back } from './topbar-back-CpSOzEHl.js';
import 'dayjs';
import { f as getNotebookState, e as getTagState } from './utils2-vPAmPu5P.js';
import { a as Scroll_area } from './scroll-area-4udoZtyH.js';
import './exports-Cug9_qxt.js';
import './index2-BlJ4z0wj.js';
import { N as NotebookList_1, T as TagList_1, a as New } from './ChangeParent-BjQ4AUiI.js';
import './EditNote.svelte_svelte_type_style_lang-N4Cf3Uss.js';
import '@emresandikci/pocketbase-query';
import { A as Archive, T as Trash_2 } from './Delete-CCIhHOHZ.js';
import './index-DFk0vKPb.js';
import './escaping-CqgfEcN3.js';
import './clsx-ChV9xqsO.js';
import './Icon-CiAOWcym.js';
import './arrow-left-DuhA8173.js';
import 'spark-md5';
import 'pocketbase';
import 'fast-xml-parser';
import './index3-Dby5GV8o.js';
import './tag-h51GbcUy.js';

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

export { _page as default };
//# sourceMappingURL=_page.svelte-DzqVD5ER.js.map
