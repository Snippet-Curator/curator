import { X as sanitize_props, Y as spread_props, Z as slot, a0 as bind_props, a1 as ensure_array_like, a6 as await_block, a5 as attr, a4 as stringify } from "./index.js";
import { I as Icon } from "./Icon.js";
import { a as getTagState } from "./utils2.js";
import { C as Command_dialog, a as Command_input, b as Command_list, c as Command_empty, d as Command_group, e as Command_item, R as Root, D as Dialog_content, f as Dialog_header, g as Dialog_title, X } from "./Delete.js";
import { e as escape_html } from "./escaping.js";
import { a as Scroll_area } from "./scroll-area.js";
import "./EditNote.svelte_svelte_type_style_lang.js";
function Archive_restore($$renderer, $$props) {
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
    [
      "rect",
      { "width": "20", "height": "5", "x": "2", "y": "3", "rx": "1" }
    ],
    ["path", { "d": "M4 8v11a2 2 0 0 0 2 2h2" }],
    ["path", { "d": "M20 8v11a2 2 0 0 1-2 2h-2" }],
    ["path", { "d": "m9 15 3-3 3 3" }],
    ["path", { "d": "M12 12v9" }]
  ];
  Icon($$renderer, spread_props([
    { name: "archive-restore" },
    $$sanitized_props,
    {
      /**
       * @component @name ArchiveRestore
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iNSIgeD0iMiIgeT0iMyIgcng9IjEiIC8+CiAgPHBhdGggZD0iTTQgOHYxMWEyIDIgMCAwIDAgMiAyaDIiIC8+CiAgPHBhdGggZD0iTTIwIDh2MTFhMiAyIDAgMCAxLTIgMmgtMiIgLz4KICA8cGF0aCBkPSJtOSAxNSAzLTMgMyAzIiAvPgogIDxwYXRoIGQ9Ik0xMiAxMnY5IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/archive-restore
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
function Pencil($$renderer, $$props) {
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
    [
      "path",
      {
        "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ],
    ["path", { "d": "m15 5 4 4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "pencil" },
    $$sanitized_props,
    {
      /**
       * @component @name Pencil
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEuMTc0IDYuODEyYTEgMSAwIDAgMC0zLjk4Ni0zLjk4N0wzLjg0MiAxNi4xNzRhMiAyIDAgMCAwLS41LjgzbC0xLjMyMSA0LjM1MmEuNS41IDAgMCAwIC42MjMuNjIybDQuMzUzLTEuMzJhMiAyIDAgMCAwIC44My0uNDk3eiIgLz4KICA8cGF0aCBkPSJtMTUgNSA0IDQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/pencil
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
function EditNotebook($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, action } = $$props;
    let notebooks = void 0;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Command_dialog($$renderer3, {
        get open() {
          return isOpen;
        },
        set open($$value) {
          isOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Command_input($$renderer4, { placeholder: "Search Notebooks..." });
          $$renderer4.push(`<!----> <!---->`);
          Command_list($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Command_empty($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->No notebook found.`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Command_group($$renderer5, {
                heading: "",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!--[-->`);
                  const each_array = ensure_array_like(notebooks);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let notebook = each_array[$$index];
                    $$renderer6.push(`<!---->`);
                    Command_item($$renderer6, {
                      onSelect: () => {
                        action(notebook.id);
                        isOpen = false;
                      },
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(notebook.name)}`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  }
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
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
function EditTags($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, add, remove, currentTags = [] } = $$props;
    const tagState = getTagState();
    let searchText = "";
    let currentTagList = new Set(currentTags.map((tag) => tag.id));
    let tags = (async () => {
      return tagState.flatTags.filter((tag) => !currentTagList.has(tag.id));
    })();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Command_dialog($$renderer3, {
        get open() {
          return isOpen;
        },
        set open($$value) {
          isOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Command_input($$renderer4, {
            placeholder: "Search Tags...",
            get value() {
              return searchText;
            },
            set value($$value) {
              searchText = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----> `);
          if (currentTags) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="gap-golden-sm p-golden-md border-b-base-content/10 flex flex-wrap border-b"><!--[-->`);
            const each_array = ensure_array_like(currentTags);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let currentTag = each_array[$$index];
              $$renderer4.push(`<button class="badge badge-primary hover:badge-ghost text-nowrap">${escape_html(currentTag.name)}</button>`);
            }
            $$renderer4.push(`<!--]--></div>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> <!---->`);
          Command_list($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Command_empty($$renderer5, {
                class: "px-2 py-1",
                children: ($$renderer6) => {
                  $$renderer6.push(`<button class="bg-primary/30 mx-auto w-full rounded-md py-3">Click to create ${escape_html(searchText)}</button>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Command_group($$renderer5, {
                children: ($$renderer6) => {
                  await_block($$renderer6, tags, () => {
                  }, (tags2) => {
                    if (tags2) {
                      $$renderer6.push("<!--[-->");
                      $$renderer6.push(`<!--[-->`);
                      const each_array_1 = ensure_array_like(tags2);
                      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                        let tag = each_array_1[$$index_1];
                        $$renderer6.push(`<!---->`);
                        Command_item($$renderer6, {
                          onSelect: () => {
                            add(tag.id);
                            searchText = "";
                          },
                          children: ($$renderer7) => {
                            $$renderer7.push(`<!---->${escape_html(tag.name)}`);
                          },
                          $$slots: { default: true }
                        });
                        $$renderer6.push(`<!---->`);
                      }
                      $$renderer6.push(`<!--]-->`);
                    } else {
                      $$renderer6.push("<!--[!-->");
                    }
                    $$renderer6.push(`<!--]-->`);
                  });
                  $$renderer6.push(`<!--]-->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
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
function EditNote($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, action, note, thumbURL = "" } = $$props;
    let selectedThumbnailURL = thumbURL.split("?")[0];
    let title = note?.title ?? "";
    let description = note?.description ?? "";
    let sources = note?.sources ?? [{ source: "", source_url: "" }];
    $$renderer2.push(`<!---->`);
    Root($$renderer2, {
      open: isOpen,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Dialog_content($$renderer3, {
          onCloseAutoFocus: (e) => {
            title = note?.title ?? "";
            description = note?.description ?? "";
            sources = note?.sources ?? [{ source: "", source_url: "" }];
            e.preventDefault();
            isOpen = false;
          },
          class: "scrollbar-thin max-h-full max-w-5xl overflow-y-auto",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Dialog_header($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Dialog_title($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Edit Note`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <div><legend class="fieldset-legend">Title</legend> <input type="text" class="input w-full"${attr("value", title)}/></div> <div><legend class="fieldset-legend">Description</legend> <textarea class="textarea w-full">`);
            const $$body = escape_html(description);
            if ($$body) {
              $$renderer4.push(`${$$body}`);
            }
            $$renderer4.push(`</textarea></div> <div><legend class="fieldset-legend">Sources</legend> `);
            if (sources) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<!--[-->`);
              const each_array = ensure_array_like(sources);
              for (let index = 0, $$length = each_array.length; index < $$length; index++) {
                let source = each_array[index];
                $$renderer4.push(`<div class="gap-golden-md flex items-center justify-center"><button class="btn btn-xs btn-circle col-span-1 justify-self-end">`);
                X($$renderer4, { size: 14 });
                $$renderer4.push(`<!----></button> <div class="gap-golden-md space-y-golden-md grid grid-cols-12 items-center"><input type="text" class="input col-span-2 my-2 w-full"${attr("value", source.source)}/> <input type="text" class="input col-span-10 my-2 w-full"${attr("value", source.source_url)}/></div></div>`);
              }
              $$renderer4.push(`<!--]--> <div class="flex justify-end"><button class="btn">Add Source</button></div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--></div> <div><legend class="fieldset-legend">Change Thumbnail</legend> `);
            Scroll_area($$renderer4, {
              class: "card border-base-content/20 max-h-[350px] overflow-y-hidden border",
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="gap-y-golden-xl m-golden-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">`);
                if (note && note.resources) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<!--[-->`);
                  const each_array_1 = ensure_array_like(note.resources);
                  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                    let resource = each_array_1[$$index_1];
                    if (resource.type.includes("image")) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<label class="flex cursor-pointer items-center"><input type="radio" class="peer sr-only"${attr("value", resource.fileURL)}${attr("checked", selectedThumbnailURL === resource.fileURL, true)} name="thumbnail"/> <img class="peer-checked:border-primary border-base-200 w-[200px] rounded-md border-4 transition-transform duration-100 ease-in-out peer-checked:scale-105"${attr("src", `${stringify(resource.fileURL)}?thumb=200x0`)} alt=""/></label>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]-->`);
                  }
                  $$renderer5.push(`<!--]--> <label class="gap-golden-md flex cursor-pointer items-center"><input type="radio" class="peer sr-only" value=""${attr("checked", selectedThumbnailURL === "", true)} name="thumbnail"/> <div class="peer-checked:border-primary border-base-100 bg-base-200 flex h-[200px] w-[200px] items-center justify-center rounded-md border-4 transition-transform duration-150 ease-in-out peer-checked:scale-105">No Thumbnail</div></label>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></div> <div class="flex justify-end gap-x-2"><button class="btn">Close</button> <button class="btn btn-primary">Save</button></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
    bind_props($$props, { isOpen });
  });
}
export {
  Archive_restore as A,
  EditNotebook as E,
  Pencil as P,
  EditTags as a,
  EditNote as b
};
