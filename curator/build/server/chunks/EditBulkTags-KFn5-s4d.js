import { a1 as attr_class, Y as stringify, _ as bind_props, a7 as attr, $ as ensure_array_like, a3 as sanitize_props, Z as spread_props, a4 as slot, a6 as await_block } from './index-DFk0vKPb.js';
import { p as page } from './index2-BlJ4z0wj.js';
import './exports-Cug9_qxt.js';
import { N as Notebook } from './notebook-PosgQq5g.js';
import { T as Tags } from './tags-DAIgStR6.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { P as Pencil, E as EditNotebook, a as EditTags, b as EditNote, A as Archive_restore } from './EditNote-BnnrAADa.js';
import { h as Delete, C as Command_dialog, a as Command_input, b as Command_list, c as Command_empty, d as Command_group, e as Command_item, A as Archive, T as Trash_2 } from './Delete-CCIhHOHZ.js';
import { I as Icon } from './Icon-CiAOWcym.js';
import { h as getMobileState, j as getMouseState, G as setNoteState, H as getNoteState, e as getTagState } from './utils2-vPAmPu5P.js';
import './EditNote.svelte_svelte_type_style_lang-N4Cf3Uss.js';
import '@emresandikci/pocketbase-query';
import { R as Root, T as Trigger, C as Context_menu_content, a as Context_menu_item, b as Context_menu_separator } from './index3-Dby5GV8o.js';
import { N as NoteLoading } from './NoteLoading-ChiH4MIz.js';

function Chevron_left($$renderer, $$props) {
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
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-left" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUgMTgtNi02IDYtNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/chevron-left
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
function Chevron_right($$renderer, $$props) {
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
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtOSAxOCA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevron-right
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
function Chevrons_left($$renderer, $$props) {
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
    ["path", { "d": "m11 17-5-5 5-5" }],
    ["path", { "d": "m18 17-5-5 5-5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "chevrons-left" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronsLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTEgMTctNS01IDUtNSIgLz4KICA8cGF0aCBkPSJtMTggMTctNS01IDUtNSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/chevrons-left
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
function Chevrons_right($$renderer, $$props) {
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
    ["path", { "d": "m6 17 5-5-5-5" }],
    ["path", { "d": "m13 17 5-5-5-5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "chevrons-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronsRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtNiAxNyA1LTUtNS01IiAvPgogIDxwYXRoIGQ9Im0xMyAxNyA1LTUtNS01IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevrons-right
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
function Layers($$renderer, $$props) {
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
        "d": "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
      }
    ],
    [
      "path",
      {
        "d": "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"
      }
    ],
    [
      "path",
      {
        "d": "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "layers" },
    $$sanitized_props,
    {
      /**
       * @component @name Layers
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIuODMgMi4xOGEyIDIgMCAwIDAtMS42NiAwTDIuNiA2LjA4YTEgMSAwIDAgMCAwIDEuODNsOC41OCAzLjkxYTIgMiAwIDAgMCAxLjY2IDBsOC41OC0zLjlhMSAxIDAgMCAwIDAtMS44M3oiIC8+CiAgPHBhdGggZD0iTTIgMTJhMSAxIDAgMCAwIC41OC45MWw4LjYgMy45MWEyIDIgMCAwIDAgMS42NSAwbDguNTgtMy45QTEgMSAwIDAgMCAyMiAxMiIgLz4KICA8cGF0aCBkPSJNMiAxN2ExIDEgMCAwIDAgLjU4LjkxbDguNiAzLjkxYTIgMiAwIDAgMCAxLjY1IDBsOC41OC0zLjlBMSAxIDAgMCAwIDIyIDE3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/layers
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
function Bulk_notebook($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, selectedNotesID } = $$props;
    $$renderer2.push(`<button class="btn">`);
    Notebook($$renderer2, { size: 18, class: "text-base-content/60" });
    $$renderer2.push(`<!---->Notebook</button>`);
    bind_props($$props, { isOpen });
  });
}
function Bulk_tags($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, selectedNotesID } = $$props;
    $$renderer2.push(`<button class="btn">`);
    Tags($$renderer2, { size: 18, class: "text-base-content/60" });
    $$renderer2.push(`<!---->Tags</button>`);
    bind_props($$props, { isOpen });
  });
}
function Bulk_archive($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isArchive = false } = $$props;
    function renderArchived($$renderer3, archived, Icon2, action) {
      $$renderer3.push(`<button class="btn"><!---->`);
      Icon2($$renderer3, { size: 18, class: "text-base-content/60" });
      $$renderer3.push(`<!---->${escape_html(archived)}</button>`);
    }
    if (isArchive) {
      $$renderer2.push("<!--[-->");
      renderArchived($$renderer2, "Un-Archive", Archive_restore);
    } else {
      $$renderer2.push("<!--[!-->");
      renderArchived($$renderer2, "Archive", Archive);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Bulk_delete($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isTrash } = $$props;
    function renderDeleted($$renderer3, deletedString, Icon2, action) {
      $$renderer3.push(`<button class="btn"><!---->`);
      Icon2($$renderer3, { size: 18, class: "text-base-content/60" });
      $$renderer3.push(`<!---->${escape_html(deletedString)}</button>`);
    }
    if (isTrash) {
      $$renderer2.push("<!--[-->");
      renderDeleted($$renderer2, "Restore", Trash_2);
    } else {
      $$renderer2.push("<!--[!-->");
      renderDeleted($$renderer2, "Delete", Trash_2);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Bulk_merge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<button class="btn">`);
    Layers($$renderer2, { size: 18, class: "text-base-content/60" });
    $$renderer2.push(`<!---->Merge</button>`);
  });
}
function BulkToolbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      selectedNotesID = void 0,
      notelistState,
      isBulkEdit = void 0,
      isArchive = false,
      isTrash = false,
      updatePage
    } = $$props;
    let isDeleteOpen = false;
    let isEditNotebookOpen = false;
    let isEditTagsOpen = false;
    let isSelectAll = false;
    getMouseState();
    const currentTagID = notelistState.noteType == "tags" ? page.params.slug : "";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="bg-base-100/95 border-t-base-200 motion-opacity-in-0 motion-duration-100 motion-scale-in-95 absolute bottom-0 left-0 z-20 flex w-full items-center justify-center border-t py-6 backdrop-blur-2xl 2xl:py-10"><div class="gap-golden-md flex flex-col items-center md:flex-row"><div class="gap-x-golden-md grid auto-cols-min grid-cols-4 md:mr-4"><div class="text-right">${escape_html(selectedNotesID.length)}</div> <div class="col-span-3">note${escape_html(selectedNotesID.length > 1 ? "s" : "")} selected</div> <div><input type="checkbox"${attr("checked", isSelectAll, true)} class="toggle"/></div> <div class="col-span-3"><span>select all on page</span></div></div> <div id="button-wrap" class="gap-golden-md grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">`);
      Bulk_notebook($$renderer3, {
        selectedNotesID,
        get isOpen() {
          return isEditNotebookOpen;
        },
        set isOpen($$value) {
          isEditNotebookOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Bulk_tags($$renderer3, {
        selectedNotesID,
        get isOpen() {
          return isEditTagsOpen;
        },
        set isOpen($$value) {
          isEditTagsOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Bulk_merge($$renderer3);
      $$renderer3.push(`<!----> `);
      if (!isTrash) {
        $$renderer3.push("<!--[-->");
        Bulk_archive($$renderer3, {
          isArchive
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      Bulk_delete($$renderer3, {
        isTrash
      });
      $$renderer3.push(`<!----> <button class="btn btn-soft">Cancel</button></div></div></div> `);
      Delete($$renderer3, {
        name: "Notes",
        action: async () => {
          await notelistState.softDeleteMultiple(selectedNotesID);
          updatePage();
          isBulkEdit = false;
        },
        get isOpen() {
          return isDeleteOpen;
        },
        set isOpen($$value) {
          isDeleteOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->these notes?`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      EditNotebook($$renderer3, {
        action: async (selectedNotebookID) => {
          await notelistState.changeNotebook(selectedNotesID, selectedNotebookID);
          updatePage();
          isBulkEdit = false;
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
      EditBulkTags($$renderer3, {
        currentTagID,
        add: async (selectedTagID) => {
          await notelistState.addTag(selectedNotesID, selectedTagID);
          updatePage();
        },
        remove: async (selectedTagID) => {
          await notelistState.removeTag(selectedNotesID, selectedTagID);
          updatePage();
        },
        clearAll: async () => {
          await notelistState.clearTags(selectedNotesID);
          updatePage();
        },
        get isOpen() {
          return isEditTagsOpen;
        },
        set isOpen($$value) {
          isEditTagsOpen = $$value;
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
    bind_props($$props, { selectedNotesID, isBulkEdit });
  });
}
function BulkEditBtn($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isBulkEdit = void 0, selectedNotesID = void 0 } = $$props;
    $$renderer2.push(`<div class="tooltip tooltip-bottom z-30" data-tip="Bulk Edit"><button${attr_class(`${stringify(isBulkEdit ? "btn-primary" : "btn-ghost")} btn`)}>`);
    Pencil($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div>`);
    bind_props($$props, { isBulkEdit, selectedNotesID });
  });
}
function Pagination($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { changePage, currentPage = 1, totalPages = 1 } = $$props;
    const mobileState = getMobileState();
    const maxVisiblePages = 5;
    let pages = (() => {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    })();
    if (currentPage && totalPages && pages.length > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="join bg-base-100/95 sticky top-0 z-20 flex w-full items-center justify-center py-1 backdrop-blur-2xl md:py-3"><button${attr("disabled", currentPage == 1, true)} class="btn join-item">`);
      if (mobileState.isMobile) {
        $$renderer2.push("<!--[-->");
        Chevrons_left($$renderer2, { size: 18 });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`First`);
      }
      $$renderer2.push(`<!--]--></button> <button${attr("disabled", currentPage == 1, true)} class="btn join-item">`);
      if (mobileState.isMobile) {
        $$renderer2.push("<!--[-->");
        Chevron_left($$renderer2, { size: 18 });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Previous`);
      }
      $$renderer2.push(`<!--]--></button> <!--[-->`);
      const each_array = ensure_array_like(pages);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let page2 = each_array[$$index];
        $$renderer2.push(`<button${attr("disabled", currentPage == page2, true)} class="join-item btn">${escape_html(page2)}</button>`);
      }
      $$renderer2.push(`<!--]--> <button${attr("disabled", currentPage == totalPages, true)} class="btn join-item">`);
      if (mobileState.isMobile) {
        $$renderer2.push("<!--[-->");
        Chevron_right($$renderer2, { size: 18 });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Next`);
      }
      $$renderer2.push(`<!--]--></button> <button${attr("disabled", currentPage == totalPages, true)} class="btn join-item">`);
      if (mobileState.isMobile) {
        $$renderer2.push("<!--[-->");
        Chevrons_right($$renderer2, { size: 18 });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`Last`);
      }
      $$renderer2.push(`<!--]--></button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function renderNotes($$renderer, note) {
  $$renderer.push(`<!---->`);
  {
    $$renderer.push(`<figure class="motion-opacity-in-0 motion-duration-300 w-full"><img class="w-full"${attr("src", note.thumbnail)} alt=""/></figure>`);
  }
  $$renderer.push(`<!----> <div id="card-body" class="card-body p-golden-lg w-full"><div id="card-title" class="card-title overflow-hidden text-left text-pretty break-words text-ellipsis">${escape_html(note.title)}</div> `);
  if (!note.thumbnail) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="line-clamp-3 text-left text-pretty">${escape_html(note.description)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <div class="gap-golden-sm flex flex-wrap items-center">`);
  if (note.expand?.notebook) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<span class="badge badge-soft rounded-sm">${escape_html(note.expand?.notebook.name)}</span>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (note.expand?.tags) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<!--[-->`);
    const each_array = ensure_array_like(note.expand?.tags);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tag = each_array[$$index];
      $$renderer.push(`<span class="badge text-nowrap">#${escape_html(tag.name)}</span>`);
    }
    $$renderer.push(`<!--]-->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div></div>`);
}
function NoteList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { notes, isBulkEdit = false, selectedNotesID = void 0, update } = $$props;
    setNoteState("");
    const noteState = getNoteState("");
    let isDeleteOpen = false;
    let isEditTagsOpen = false;
    let isEditNotebookOpen = false;
    let isEditNoteOpen = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!--[-->`);
      {
        $$renderer3.push(`<div class="p-golden-md md:p-golden-lg lg:p-golden-xl gap-golden-lg space-y-golden-lg lg:gap-golden-xl lg:space-y-golden-xl relative mb-80 columns-1 md:mb-64 md:columns-2 lg:mb-32 lg:columns-3 2xl:columns-4">`);
        if (notes.items.length > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<!--[-->`);
          const each_array_1 = ensure_array_like(notes.items);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let note = each_array_1[$$index_1];
            $$renderer3.push(`<div class="group relative"><!---->`);
            Root($$renderer3, {
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->`);
                Trigger($$renderer4, {
                  children: ($$renderer5) => {
                    $$renderer5.push(`<button${attr_class(`${stringify([
                      selectedNotesID.includes(note.id) && "bg-primary/50 hover:bg-primary/60 opacity-100",
                      isBulkEdit ? "opacity-70" : ""
                    ])} card motion-preset-fade motion-duration-200 hover:bg-base-200/70 bg-base-100 card-border w-full border hover:cursor-pointer`)}>`);
                    renderNotes($$renderer5, note);
                    $$renderer5.push(`<!----></button>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer4.push(`<!----> <!---->`);
                Context_menu_content($$renderer4, {
                  children: ($$renderer5) => {
                    $$renderer5.push(`<!---->`);
                    Context_menu_item($$renderer5, {
                      onSelect: async () => {
                        noteState.noteID = note.id;
                        await noteState.getNote();
                        isEditNoteOpen = true;
                      },
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Edit`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> <!---->`);
                    Context_menu_item($$renderer5, {
                      onSelect: async () => {
                        noteState.noteID = note.id;
                        await noteState.getNote();
                        isEditNotebookOpen = true;
                      },
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Edit Notebook`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> <!---->`);
                    Context_menu_item($$renderer5, {
                      onSelect: async () => {
                        noteState.noteID = note.id;
                        await noteState.getNote();
                        isEditTagsOpen = true;
                      },
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Edit Tags`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> <!---->`);
                    Context_menu_item($$renderer5, {
                      onSelect: async () => {
                        noteState.noteID = note.id;
                        await noteState.archiveNote();
                        update();
                      },
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Archive`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> <!---->`);
                    Context_menu_separator($$renderer5, {});
                    $$renderer5.push(`<!----> <!---->`);
                    Context_menu_item($$renderer5, {
                      onSelect: () => {
                        noteState.noteID = note.id;
                        isDeleteOpen = true;
                      },
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Delete`);
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
            $$renderer3.push(`<!----></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        } else {
          $$renderer3.push("<!--[!-->");
          NoteLoading($$renderer3);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
      $$renderer3.push(`<!--]--> <!--[-->`);
      {
        Delete($$renderer3, {
          name: "Note",
          action: async () => {
            await noteState.softDeleteNote();
            update();
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
        if (noteState && noteState.note) {
          $$renderer3.push("<!--[-->");
          EditTags($$renderer3, {
            currentTags: noteState.note.expand?.tags,
            add: async (selectedTags) => {
              await noteState.addTag(selectedTags);
              update();
            },
            remove: async (selectedTags) => {
              await noteState.removeTag(selectedTags);
              update();
            },
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
            currentNotebookID: noteState.note.expand?.notebook.id,
            action: async (selectedNotebookID) => {
              await noteState.changeNotebook(selectedNotebookID);
              update();
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
            note: noteState.note,
            thumbURL: noteState.note?.thumbnail,
            action: async (title, description, sources, selectedThumbnailURL) => {
              await noteState.changeTitle(title);
              await noteState.changeDescription(description);
              await noteState.changeSources(sources);
              await noteState.changeThumbnail(selectedThumbnailURL);
              await noteState.getNote();
              update();
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
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { selectedNotesID });
  });
}
function EditBulkTags($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, add, remove, clearAll, currentTagID = "" } = $$props;
    const tagState = getTagState();
    let searchText = "";
    let selectedTags = [];
    const uniqueSelectedTags = new Set(selectedTags.map((tag) => tag.id));
    const tags = (() => {
      return tagState.flatTags.filter((tag) => !uniqueSelectedTags.has(tag.id));
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
          if (selectedTags.length > 0) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<div class="gap-golden-sm p-golden-md border-b-base-content/10 flex flex-wrap border-b"><!--[-->`);
            const each_array = ensure_array_like(selectedTags);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let tag = each_array[$$index];
              $$renderer4.push(`<button class="badge badge-primary hover:badge-ghost group flex items-center justify-center text-nowrap">${escape_html(tag.name)}</button>`);
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
                            selectedTags.push(tag);
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
          $$renderer4.push(`<!----> <div class="gap-x-golden-md p-golden-md border-t-base-content/10 flex w-full border-t"><div class="grow"></div> <button class="btn">Clear all existing note tags</button></div>`);
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

export { BulkEditBtn as B, NoteList as N, Pagination as P, BulkToolbar as a };
//# sourceMappingURL=EditBulkTags-KFn5-s4d.js.map
