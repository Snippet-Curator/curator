import { X as sanitize_props, Y as spread_props, Z as slot, a2 as attr_class, a3 as clsx, a5 as attr, a6 as await_block } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../chunks/index2.js";
import { h as getMobileState, c as cn, N as NoteState } from "../../../chunks/utils2.js";
import { T as Topbar_tag_list, a as Topbar_tags, b as Topbar_notebook, c as Topbar_rating, d as Topbar_edit, e as Topbar_archive, f as Topbar_delete, g as Topbar_note_info, N as NoteContent } from "../../../chunks/topbar-edit.js";
import { h as Delete } from "../../../chunks/Delete.js";
import { E as EditNotebook, a as EditTags, b as EditNote } from "../../../chunks/EditNote.js";
import "@emresandikci/pocketbase-query";
import { T as Topbar, a as Topbar_sidebar } from "../../../chunks/topbar-sidebar.js";
import { A as Arrow_left } from "../../../chunks/arrow-left.js";
import { I as Icon } from "../../../chunks/Icon.js";
function Arrow_down($$renderer, $$props) {
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
    ["path", { "d": "M12 5v14" }],
    ["path", { "d": "m19 12-7 7-7-7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-down" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgNXYxNCIgLz4KICA8cGF0aCBkPSJtMTkgMTItNyA3LTctNyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/arrow-down
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
function Arrow_right($$renderer, $$props) {
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
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "m12 5 7 7-7 7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNSAxMmgxNCIgLz4KICA8cGF0aCBkPSJtMTIgNSA3IDctNyA3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/arrow-right
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
function Arrow_up($$renderer, $$props) {
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
    ["path", { "d": "m5 12 7-7 7 7" }],
    ["path", { "d": "M12 19V5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-up" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNSAxMiA3LTcgNyA3IiAvPgogIDxwYXRoIGQ9Ik0xMiAxOVY1IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/arrow-up
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
function NavToolbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children, class: className = "" } = $$props;
    const mobileState = getMobileState();
    if (mobileState.isMobile) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(clsx(cn("bottom-15 fixed right-8 z-30", className)))}>`);
      children($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Topbar_next_previous($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      onLeft,
      onRight,
      currentIndex,
      currentPage,
      lastItemIndex,
      totalPages
    } = $$props;
    $$renderer2.push(`<div class="md:tooltip md:tooltip-bottom z-30" data-tip="Previous"><button${attr("disabled", currentIndex == 0 && currentPage == 1, true)} class="btn btn-square">`);
    Arrow_left($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div> <div class="md:tooltip md:tooltip-bottom z-30" data-tip="Next"><button${attr("disabled", currentIndex == lastItemIndex && currentPage == totalPages, true)} class="btn btn-square">`);
    Arrow_right($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div>`);
  });
}
function Topbar_weight($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { onUp, onDown } = $$props;
    $$renderer2.push(`<div class="md:tooltip md:tooltip-bottom z-30" data-tip="See More"><button class="btn btn-square">`);
    Arrow_up($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div> <div class="md:tooltip md:tooltip-bottom z-30" data-tip="See Less"><button class="btn btn-square">`);
    Arrow_down($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const noteState = new NoteState("discovery");
    let note = noteState.note;
    const mobileState = getMobileState();
    let totalPages = 0;
    let currentPage = 1;
    let currentIndex = 0;
    let lastItemIndex = 99;
    let isDeleteOpen = false;
    let isEditTagsOpen = false;
    let isEditNotebookOpen = false;
    let isEditNoteOpen = false;
    async function getNextNote() {
      if (currentIndex == lastItemIndex && currentPage == totalPages) return;
      currentIndex++;
      if (currentIndex == 100) {
        currentPage++;
        await noteState.getDiscoverNoteList(currentPage);
        currentIndex = 0;
      }
      await noteState.getDiscoverNote(currentIndex);
      lastItemIndex = noteState.noteList.items.length - 1;
    }
    async function getPreviousNote() {
      if (currentIndex == 0 && currentPage == 1) return;
      currentIndex--;
      if (currentIndex < 0 && currentPage > 1) {
        currentPage--;
        await noteState.getDiscoverNoteList(currentPage);
        currentIndex = 99;
      }
      await noteState.getDiscoverNote(currentIndex);
    }
    async function upvote() {
      await noteState.upvoteWeight();
      await getNextNote();
    }
    async function downvote() {
      await noteState.downvoteWeight();
      await getNextNote();
    }
    let initialLoading = void 0;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      await_block($$renderer3, initialLoading, () => {
      }, () => {
        if (note) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<!---->`);
          Topbar($$renderer3, {
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->`);
              Topbar_sidebar($$renderer4);
              $$renderer4.push(`<!----> `);
              if (!mobileState.isMobile) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<!---->`);
                Topbar_next_previous($$renderer4, {
                  currentIndex,
                  currentPage,
                  totalPages,
                  lastItemIndex,
                  onLeft: getPreviousNote,
                  onRight: getNextNote
                });
                $$renderer4.push(`<!----> <!---->`);
                Topbar_weight($$renderer4, { onUp: upvote, onDown: downvote });
                $$renderer4.push(`<!---->`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> <div class="hidden grow md:block"></div> `);
              if (note?.expand?.tags) {
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
              if (note?.expand?.notebook) {
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
                  action: (newRating) => {
                    noteState.changeRating(newRating);
                  }
                });
                $$renderer4.push(`<!---->`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]--> <div class="divider divider-horizontal hidden md:flex"></div> <!---->`);
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
                noteStatus: note.status,
                archive: () => {
                  noteState.archiveNote();
                  getNextNote();
                },
                unarchive: () => {
                  noteState.unArchiveNote();
                  getNextNote();
                }
              });
              $$renderer4.push(`<!----> <!---->`);
              Topbar_delete($$renderer4, {
                noteStatus: note.status,
                get isOpen() {
                  return isDeleteOpen;
                },
                set isOpen($$value) {
                  isDeleteOpen = $$value;
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
          NavToolbar($$renderer3, {
            class: "p-golden-md bg-base-100 flex flex-col items-end gap-y-2 rounded-md",
            children: ($$renderer4) => {
              $$renderer4.push(`<div class="flex flex-row gap-x-2"><!---->`);
              Topbar_weight($$renderer4, { onUp: upvote, onDown: downvote });
              $$renderer4.push(`<!----> <!---->`);
              Topbar_next_previous($$renderer4, {
                currentIndex,
                currentPage,
                totalPages,
                lastItemIndex,
                onLeft: getPreviousNote,
                onRight: getNextNote
              });
              $$renderer4.push(`<!----></div> <!---->`);
              Topbar_rating($$renderer4, {
                rating: note.rating,
                action: (newRating) => {
                  noteState.changeRating(newRating);
                }
              });
              $$renderer4.push(`<!---->`);
            }
          });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="grid h-screen place-items-center"><br/></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      });
      $$renderer3.push(`<!--]--> `);
      await_block($$renderer3, initialLoading, () => {
      }, () => {
        if (note) {
          $$renderer3.push("<!--[-->");
          Delete($$renderer3, {
            name: "Note",
            action: () => {
              noteState.softDeleteNote();
              getNextNote();
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
          EditNotebook($$renderer3, {
            currentNotebookID: note.expand?.notebook.id,
            action: (selectedNotebookID) => {
              noteState.changeNotebook(selectedNotebookID);
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
          EditTags($$renderer3, {
            currentTags: note.expand?.tags,
            add: (selectedTags) => noteState.addTag(selectedTags),
            remove: (selectedTags) => noteState.removeTag(selectedTags),
            get isOpen() {
              return isEditTagsOpen;
            },
            set isOpen($$value) {
              isEditTagsOpen = $$value;
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
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      });
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
