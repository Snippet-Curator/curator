import { a6 as await_block, _ as bind_props, a3 as sanitize_props, Z as spread_props, a4 as slot } from './index-DFk0vKPb.js';
import { l as setNotelistState, n as getNotelistState, o as signalPageState, p as saveCurrentPage } from './utils2-vPAmPu5P.js';
import { a as Scroll_area } from './scroll-area-4udoZtyH.js';
import './exports-Cug9_qxt.js';
import { p as page } from './index2-BlJ4z0wj.js';
import { B as BulkEditBtn, P as Pagination, a as BulkToolbar, N as NoteList } from './EditBulkTags-KFn5-s4d.js';
import { h as Delete } from './Delete-CCIhHOHZ.js';
import './EditNote.svelte_svelte_type_style_lang-N4Cf3Uss.js';
import '@emresandikci/pocketbase-query';
import { T as Topbar, a as Topbar_sidebar } from './topbar-sidebar-BHyfBO4h.js';
import { T as Topbar_back } from './topbar-back-CpSOzEHl.js';
import { I as Icon } from './Icon-CiAOWcym.js';
import 'dayjs';
import './escaping-CqgfEcN3.js';
import './clsx-ChV9xqsO.js';
import 'spark-md5';
import 'pocketbase';
import 'fast-xml-parser';
import './notebook-PosgQq5g.js';
import './tags-DAIgStR6.js';
import './EditNote-BnnrAADa.js';
import './index3-Dby5GV8o.js';
import './NoteLoading-ChiH4MIz.js';
import './arrow-left-DuhA8173.js';

function Trash($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.516.0 - ISC
   *
   * ISC License
   *
   * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   */
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
    ["path", { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trash" },
    $$sanitized_props,
    {
      /**
       * @component @name Trash
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyA2aDE4IiAvPgogIDxwYXRoIGQ9Ik0xOSA2djE0YzAgMS0xIDItMiAySDdjLTEgMC0yLTEtMi0yVjYiIC8+CiAgPHBhdGggZD0iTTggNlY0YzAtMSAxLTIgMi0yaDRjMSAwIDIgMSAyIDJ2MiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/trash
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Topbar_empty_trash($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0 } = $$props;
    $$renderer2.push(`<div class="tooltip tooltip-bottom z-30" data-tip="Empty Trash"><button class="btn btn-ghost">`);
    Trash($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div>`);
    bind_props($$props, { isOpen });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isBulkEdit = false;
    let isEmptyTrashOpen = false;
    let selectedNotesID = [];
    const noteType = { type: "trash", id: page.params.slug };
    setNotelistState("deleted", noteType);
    const notelistState = getNotelistState("deleted");
    signalPageState.savedPages.get(page.url.hash) ?? 1;
    const updatePage = async (newPage) => {
      await notelistState.getDeleted(newPage);
      saveCurrentPage(newPage);
      notelistState.clickedPage = newPage;
    };
    let initialLoading = void 0;
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
          $$renderer4.push(`<!----> <div class="grow"></div> <!---->`);
          Topbar_empty_trash($$renderer4, {
            get isOpen() {
              return isEmptyTrashOpen;
            },
            set isOpen($$value) {
              isEmptyTrashOpen = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          BulkEditBtn($$renderer4, {
            get isBulkEdit() {
              return isBulkEdit;
            },
            set isBulkEdit($$value) {
              isBulkEdit = $$value;
              $$settled = false;
            },
            get selectedNotesID() {
              return selectedNotesID;
            },
            set selectedNotesID($$value) {
              selectedNotesID = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!---->`);
        }
      });
      $$renderer3.push(`<!----> `);
      Scroll_area($$renderer3, {
        class: "mb-20 h-[calc(100vh-60px)] overflow-y-auto",
        children: ($$renderer4) => {
          await_block(
            $$renderer4,
            initialLoading,
            () => {
              $$renderer4.push(`<br/>`);
            },
            () => {
              Pagination($$renderer4, {
                currentPage: notelistState.notes.page,
                totalPages: notelistState.notes.totalPages,
                changePage: (newPage) => updatePage(newPage)
              });
              $$renderer4.push(`<!----> `);
              if (isBulkEdit) {
                $$renderer4.push("<!--[-->");
                BulkToolbar($$renderer4, {
                  updatePage: () => {
                    updatePage(notelistState.clickedPage);
                  },
                  isTrash: true,
                  notelistState,
                  get isBulkEdit() {
                    return isBulkEdit;
                  },
                  set isBulkEdit($$value) {
                    isBulkEdit = $$value;
                    $$settled = false;
                  },
                  get selectedNotesID() {
                    return selectedNotesID;
                  },
                  set selectedNotesID($$value) {
                    selectedNotesID = $$value;
                    $$settled = false;
                  }
                });
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> `);
              if (notelistState.notes.totalItems > 0) {
                $$renderer4.push("<!--[-->");
                NoteList($$renderer4, {
                  update: () => updatePage(notelistState.clickedPage),
                  isBulkEdit,
                  notes: notelistState.notes,
                  get selectedNotesID() {
                    return selectedNotesID;
                  },
                  set selectedNotesID($$value) {
                    selectedNotesID = $$value;
                    $$settled = false;
                  }
                });
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push(`<br/>`);
              }
              $$renderer4.push(`<!--]-->`);
            }
          );
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Delete($$renderer3, {
        name: "Notes Permanently",
        action: () => {
          notelistState.emptyTrash();
          window.history.back();
        },
        get isOpen() {
          return isEmptyTrashOpen;
        },
        set isOpen($$value) {
          isEmptyTrashOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->these notes`);
        },
        $$slots: { default: true }
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
//# sourceMappingURL=_page.svelte-pV5jLdgq.js.map
