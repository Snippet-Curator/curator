import { X as sanitize_props, Y as spread_props, Z as slot, a0 as bind_props, a5 as attr, a6 as await_block } from "../../chunks/index.js";
import { p as page } from "../../chunks/index2.js";
import { g as getNotebookState, a as getTagState, l as setNotelistState, n as getNotelistState, o as signalPageState, p as saveCurrentPage } from "../../chunks/utils2.js";
import { a as Scroll_area } from "../../chunks/scroll-area.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import { B as BulkEditBtn, P as Pagination, a as BulkToolbar, N as NoteList } from "../../chunks/EditBulkTags.js";
import { I as Import } from "../../chunks/import.js";
import { N as NoteLoading } from "../../chunks/NoteLoading.js";
import "../../chunks/EditNote.svelte_svelte_type_style_lang.js";
import { R as Root, D as Dialog_content, f as Dialog_header, g as Dialog_title } from "../../chunks/Delete.js";
import { S as SelectNotebook, a as SelectTags } from "../../chunks/SelectNotebook.js";
import "@emresandikci/pocketbase-query";
import { T as Topbar, a as Topbar_sidebar } from "../../chunks/topbar-sidebar.js";
import "dayjs";
import { I as Icon } from "../../chunks/Icon.js";
function Sliders_horizontal($$renderer, $$props) {
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
    ["line", { "x1": "21", "x2": "14", "y1": "4", "y2": "4" }],
    ["line", { "x1": "10", "x2": "3", "y1": "4", "y2": "4" }],
    ["line", { "x1": "21", "x2": "12", "y1": "12", "y2": "12" }],
    ["line", { "x1": "8", "x2": "3", "y1": "12", "y2": "12" }],
    ["line", { "x1": "21", "x2": "16", "y1": "20", "y2": "20" }],
    ["line", { "x1": "12", "x2": "3", "y1": "20", "y2": "20" }],
    ["line", { "x1": "14", "x2": "14", "y1": "2", "y2": "6" }],
    ["line", { "x1": "8", "x2": "8", "y1": "10", "y2": "14" }],
    ["line", { "x1": "16", "x2": "16", "y1": "18", "y2": "22" }]
  ];
  Icon($$renderer, spread_props([
    { name: "sliders-horizontal" },
    $$sanitized_props,
    {
      /**
       * @component @name SlidersHorizontal
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iMjEiIHgyPSIxNCIgeTE9IjQiIHkyPSI0IiAvPgogIDxsaW5lIHgxPSIxMCIgeDI9IjMiIHkxPSI0IiB5Mj0iNCIgLz4KICA8bGluZSB4MT0iMjEiIHgyPSIxMiIgeTE9IjEyIiB5Mj0iMTIiIC8+CiAgPGxpbmUgeDE9IjgiIHgyPSIzIiB5MT0iMTIiIHkyPSIxMiIgLz4KICA8bGluZSB4MT0iMjEiIHgyPSIxNiIgeTE9IjIwIiB5Mj0iMjAiIC8+CiAgPGxpbmUgeDE9IjEyIiB4Mj0iMyIgeTE9IjIwIiB5Mj0iMjAiIC8+CiAgPGxpbmUgeDE9IjE0IiB4Mj0iMTQiIHkxPSIyIiB5Mj0iNiIgLz4KICA8bGluZSB4MT0iOCIgeDI9IjgiIHkxPSIxMCIgeTI9IjE0IiAvPgogIDxsaW5lIHgxPSIxNiIgeDI9IjE2IiB5MT0iMTgiIHkyPSIyMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/sliders-horizontal
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
function Blank($$renderer) {
  $$renderer.push(`<section class="grid h-full place-items-center"><div>Get Started By <button class="btn mx-2"><a href="/import">`);
  Import($$renderer, { class: "mr-2 inline" });
  $$renderer.push(`<!---->Import</a></button> Notes</div></section>`);
}
function FilterSearch($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, search } = $$props;
    let searchState;
    const notebookState = getNotebookState();
    const tagState = getTagState();
    const notebooks = notebookState.flatNotebooks;
    const tags = tagState.flatTags;
    let filterNotebookID = searchState?.searchNotebookID;
    let filterTagIdArray = [];
    let filterExcludeTagIdArray = [];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        open: isOpen,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            onCloseAutoFocus: (e) => {
              e.preventDefault();
              isOpen = false;
            },
            class: "scrollbar-thin max-h-full max-w-4xl overflow-y-auto",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Filter Search`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="gap-x-golden-md grid grid-cols-12 items-center"><div class="col-span-3"><legend class="fieldset-legend">Search Term</legend></div> <input type="text" class="input col-span-8 col-start-4 w-full" placeholder="Search title and content..."${attr("value", searchState.searchInput)}/> <button class="btn col-span-1">Clear</button></div> <div class="gap-x-golden-md grid grid-cols-12 items-center"><div class="col-span-3"><legend class="fieldset-legend">Notebook</legend></div> <div class="col-span-8 w-full text-right">`);
              SelectNotebook($$renderer5, {
                notebooks,
                get selectedNotebookID() {
                  return filterNotebookID;
                },
                set selectedNotebookID($$value) {
                  filterNotebookID = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <button class="btn col-span-1">Clear</button></div> <div class="gap-x-golden-md grid grid-cols-12 items-start"><div class="col-span-3"><legend class="fieldset-legend">Tags</legend></div> <div class="col-span-9 col-start-4 text-right">`);
              SelectTags($$renderer5, {
                tags,
                get selectedTagIdArray() {
                  return filterTagIdArray;
                },
                set selectedTagIdArray($$value) {
                  filterTagIdArray = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div> <div class="gap-x-golden-md grid grid-cols-12 items-start"><div class="col-span-3"><legend class="fieldset-legend">Exclude Tags</legend></div> <div class="col-span-9 col-start-4 text-right">`);
              SelectTags($$renderer5, {
                tags,
                get selectedTagIdArray() {
                  return filterExcludeTagIdArray;
                },
                set selectedTagIdArray($$value) {
                  filterExcludeTagIdArray = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div> <div class="flex justify-end gap-x-2"><button class="btn">Close</button> <button class="btn btn-primary">Save</button></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
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
    bind_props($$props, { isOpen });
  });
}
function Topbar_filter($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0 } = $$props;
    $$renderer2.push(`<div class="tooltip tooltip-bottom z-30" data-tip="Filter"><button class="btn btn-ghost flex items-center gap-x-2">`);
    Sliders_horizontal($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div>`);
    bind_props($$props, { isOpen });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isBulkEdit = false;
    let selectedNotesID = [];
    let isFilterSearch = false;
    let notebookID = "homepage";
    const noteType = { type: "default" };
    setNotelistState(notebookID, noteType);
    const notelistState = getNotelistState(notebookID);
    signalPageState.savedPages.get(page.url.hash) ?? 1;
    const updatePage = async (newPage) => {
      saveCurrentPage(newPage);
      notelistState.clickedPage = newPage;
      return;
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
          $$renderer4.push(`<!----> `);
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> <!---->`);
          Topbar_filter($$renderer4, {
            get isOpen() {
              return isFilterSearch;
            },
            set isOpen($$value) {
              isFilterSearch = $$value;
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
        scrollHideDelay: 200,
        class: "relative mb-20 h-[calc(100vh-60px)] overflow-y-auto",
        children: ($$renderer4) => {
          await_block(
            $$renderer4,
            initialLoading,
            () => {
              NoteLoading($$renderer4);
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
                  isBulkEdit,
                  update: () => updatePage(notelistState.clickedPage),
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
                {
                  $$renderer4.push("<!--[!-->");
                  Blank($$renderer4);
                }
                $$renderer4.push(`<!--]-->`);
              }
              $$renderer4.push(`<!--]-->`);
            }
          );
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      FilterSearch($$renderer3, {
        search: async (customFilters) => await notelistState.getByFilter(customFilters, 1),
        get isOpen() {
          return isFilterSearch;
        },
        set isOpen($$value) {
          isFilterSearch = $$value;
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
