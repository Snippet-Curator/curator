import { $ as ensure_array_like, _ as bind_props, a7 as attr, Y as stringify, a3 as sanitize_props, Z as spread_props, a4 as slot, a8 as props_id, a0 as attributes, a5 as derived } from './index-DFk0vKPb.js';
import { k as cn } from './utils2-vPAmPu5P.js';
import { b as createBitsAttrs, a as Scroll_area, e as boxWith, C as Context, d as createId, m as mergeProps, g as attachRef, k as getDataOpenClosed, j as boolToStr } from './scroll-area-4udoZtyH.js';
import { I as Icon } from './Icon-CiAOWcym.js';
import { A as Archive, T as Trash_2 } from './Delete-CCIhHOHZ.js';
import { P as Pencil, A as Archive_restore } from './EditNote-BnnrAADa.js';
import dayjs from 'dayjs';
import { n as noop, F as Floating_layer, P as PresenceManager, b as Portal, c as Floating_layer_anchor, d as Popper_layer_force_mount, e as Popper_layer, E as ENTER, S as SPACE, W as isElement$1, Q as getFloatingContentCSSVars } from './EditNote.svelte_svelte_type_style_lang-N4Cf3Uss.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { N as Notebook } from './notebook-PosgQq5g.js';
import { T as Tag } from './tag-h51GbcUy.js';

function Case_sensitive($$renderer, $$props) {
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
    ["path", { "d": "m3 15 4-8 4 8" }],
    ["path", { "d": "M4 13h6" }],
    ["circle", { "cx": "18", "cy": "12", "r": "3" }],
    ["path", { "d": "M21 9v6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "case-sensitive" },
    $$sanitized_props,
    {
      /**
       * @component @name CaseSensitive
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMyAxNSA0LTggNCA4IiAvPgogIDxwYXRoIGQ9Ik00IDEzaDYiIC8+CiAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxMiIgcj0iMyIgLz4KICA8cGF0aCBkPSJNMjEgOXY2IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/case-sensitive
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
function Inbox($$renderer, $$props) {
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
      "polyline",
      { "points": "22 12 16 12 14 15 10 15 8 12 2 12" }
    ],
    [
      "path",
      {
        "d": "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "inbox" },
    $$sanitized_props,
    {
      /**
       * @component @name Inbox
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWxpbmUgcG9pbnRzPSIyMiAxMiAxNiAxMiAxNCAxNSAxMCAxNSA4IDEyIDIgMTIiIC8+CiAgPHBhdGggZD0iTTUuNDUgNS4xMSAyIDEydjZhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0ydi02bC0zLjQ1LTYuODlBMiAyIDAgMCAwIDE2Ljc2IDRINy4yNGEyIDIgMCAwIDAtMS43OSAxLjExeiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/inbox
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
function Info($$renderer, $$props) {
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
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["path", { "d": "M12 16v-4" }],
    ["path", { "d": "M12 8h.01" }]
  ];
  Icon($$renderer, spread_props([
    { name: "info" },
    $$sanitized_props,
    {
      /**
       * @component @name Info
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cGF0aCBkPSJNMTIgMTZ2LTQiIC8+CiAgPHBhdGggZD0iTTEyIDhoLjAxIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/info
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
const popoverAttrs = createBitsAttrs({
  component: "popover",
  parts: ["root", "trigger", "content", "close", "overlay"]
});
const PopoverRootContext = new Context("Popover.Root");
class PopoverRootState {
  static create(opts) {
    return PopoverRootContext.set(new PopoverRootState(opts));
  }
  opts;
  contentNode = null;
  contentPresence;
  triggerNode = null;
  overlayNode = null;
  overlayPresence;
  constructor(opts) {
    this.opts = opts;
    this.contentPresence = new PresenceManager({
      ref: boxWith(() => this.contentNode),
      open: this.opts.open,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
    this.overlayPresence = new PresenceManager({ ref: boxWith(() => this.overlayNode), open: this.opts.open });
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  handleClose() {
    if (!this.opts.open.current) return;
    this.opts.open.current = false;
  }
}
class PopoverTriggerState {
  static create(opts) {
    return new PopoverTriggerState(opts, PopoverRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.triggerNode = v);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  onclick(e) {
    if (this.opts.disabled.current) return;
    if (e.button !== 0) return;
    this.root.toggleOpen();
  }
  onkeydown(e) {
    if (this.opts.disabled.current) return;
    if (!(e.key === ENTER || e.key === SPACE)) return;
    e.preventDefault();
    this.root.toggleOpen();
  }
  #getAriaControls() {
    if (this.root.opts.open.current && this.root.contentNode?.id) {
      return this.root.contentNode?.id;
    }
    return void 0;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": boolToStr(this.root.opts.open.current),
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "aria-controls": this.#getAriaControls(),
    [popoverAttrs.trigger]: "",
    disabled: this.opts.disabled.current,
    //
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class PopoverContentState {
  static create(opts) {
    return new PopoverContentState(opts, PopoverRootContext.get());
  }
  opts;
  root;
  attachment;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.contentNode = v);
  }
  onInteractOutside = (e) => {
    this.opts.onInteractOutside.current(e);
    if (e.defaultPrevented) return;
    if (!isElement$1(e.target)) return;
    const closestTrigger = e.target.closest(popoverAttrs.selector("trigger"));
    if (closestTrigger && closestTrigger === this.root.triggerNode) return;
    if (this.opts.customAnchor.current) {
      if (isElement$1(this.opts.customAnchor.current)) {
        if (this.opts.customAnchor.current.contains(e.target)) return;
      } else if (typeof this.opts.customAnchor.current === "string") {
        const el = document.querySelector(this.opts.customAnchor.current);
        if (el && el.contains(e.target)) return;
      }
    }
    this.root.handleClose();
  };
  onEscapeKeydown = (e) => {
    this.opts.onEscapeKeydown.current(e);
    if (e.defaultPrevented) return;
    this.root.handleClose();
  };
  get shouldRender() {
    return this.root.contentPresence.shouldRender;
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    tabindex: -1,
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    [popoverAttrs.content]: "",
    style: { pointerEvents: "auto" },
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
  popperProps = {
    onInteractOutside: this.onInteractOutside,
    onEscapeKeydown: this.onEscapeKeydown
  };
}
function Popover_content$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      child,
      children,
      ref = null,
      id = createId(uid),
      forceMount = false,
      onCloseAutoFocus = noop,
      onEscapeKeydown = noop,
      onInteractOutside = noop,
      trapFocus = true,
      preventScroll = false,
      customAnchor = null,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const contentState = PopoverContentState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      onInteractOutside: boxWith(() => onInteractOutside),
      onEscapeKeydown: boxWith(() => onEscapeKeydown),
      customAnchor: boxWith(() => customAnchor)
    });
    const mergedProps = mergeProps(restProps, contentState.props);
    if (forceMount) {
      $$renderer2.push("<!--[-->");
      {
        let popper = function($$renderer3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") });
          if (child) {
            $$renderer3.push("<!--[-->");
            child($$renderer3, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$renderer3.push(`<!---->`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
            children?.($$renderer3);
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        };
        Popper_layer_force_mount($$renderer2, spread_props([
          mergedProps,
          contentState.popperProps,
          {
            ref: contentState.opts.ref,
            enabled: contentState.root.opts.open.current,
            id,
            trapFocus,
            preventScroll,
            loop: true,
            forceMount: true,
            customAnchor,
            onCloseAutoFocus,
            shouldRender: contentState.shouldRender,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else {
      $$renderer2.push("<!--[!-->");
      if (!forceMount) {
        $$renderer2.push("<!--[-->");
        {
          let popper = function($$renderer3, { props, wrapperProps }) {
            const finalProps = mergeProps(props, { style: getFloatingContentCSSVars("popover") });
            if (child) {
              $$renderer3.push("<!--[-->");
              child($$renderer3, {
                props: finalProps,
                wrapperProps,
                ...contentState.snippetProps
              });
              $$renderer3.push(`<!---->`);
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`<div${attributes({ ...wrapperProps })}><div${attributes({ ...finalProps })}>`);
              children?.($$renderer3);
              $$renderer3.push(`<!----></div></div>`);
            }
            $$renderer3.push(`<!--]-->`);
          };
          Popper_layer($$renderer2, spread_props([
            mergedProps,
            contentState.popperProps,
            {
              ref: contentState.opts.ref,
              open: contentState.root.opts.open.current,
              id,
              trapFocus,
              preventScroll,
              loop: true,
              forceMount: false,
              customAnchor,
              onCloseAutoFocus,
              shouldRender: contentState.shouldRender,
              popper,
              $$slots: { popper: true }
            }
          ]));
        }
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { ref });
  });
}
function Popover_trigger$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const uid = props_id($$renderer2);
    let {
      children,
      child,
      id = createId(uid),
      ref = null,
      type = "button",
      disabled = false,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const triggerState = PopoverTriggerState.create({
      id: boxWith(() => id),
      ref: boxWith(() => ref, (v) => ref = v),
      disabled: boxWith(() => Boolean(disabled))
    });
    const mergedProps = mergeProps(restProps, triggerState.props, { type });
    Floating_layer_anchor($$renderer2, {
      id,
      ref: triggerState.opts.ref,
      children: ($$renderer3) => {
        if (child) {
          $$renderer3.push("<!--[-->");
          child($$renderer3, { props: mergedProps });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<button${attributes({ ...mergedProps })}>`);
          children?.($$renderer3);
          $$renderer3.push(`<!----></button>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
    bind_props($$props, { ref });
  });
}
function Popover($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      onOpenChange = noop,
      onOpenChangeComplete = noop,
      children
    } = $$props;
    PopoverRootState.create({
      open: boxWith(() => open, (v) => {
        open = v;
        onOpenChange(v);
      }),
      onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
    });
    Floating_layer($$renderer2, {
      children: ($$renderer3) => {
        children?.($$renderer3);
        $$renderer3.push(`<!---->`);
      }
    });
    bind_props($$props, { open });
  });
}
function NoteContent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { noteState } = $$props;
    noteState.note;
    noteState.note?.content ?? "";
    let noteTitle = noteState.note?.title ?? "";
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="bg-base-100/90 p-golden-sm md:p-golden-md z-20 flex w-full px-4 md:sticky md:top-0"><div class="flex w-full"><input class="card-title focus:ring-base-content/40 bg-base-100/90 mr-2 grow truncate rounded-md border-0"${attr("value", noteTitle)}/> <div class="text-base-content/20 hover:text-base-content hidden items-center gap-x-4 transition-colors duration-300 md:flex"><input type="range" class="range range-xs" min="0.96" max="1.1" step="0.01"${attr("value", noteState.fontScale)}/> `);
      Case_sensitive($$renderer3, { size: 32 });
      $$renderer3.push(`<!----></div></div></div> `);
      Scroll_area($$renderer3, {
        scrollHideDelay: 200,
        type: "scroll",
        class: "mb-20 h-full",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="card mx-auto mt-10 max-w-3xl px-2 pb-40 md:px-10 lg:max-w-5xl"><iframe title="content" class="bg-base-100 mb-10" scrolling="no"></iframe> `);
          {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`<div class="flex justify-end"><button class="btn">Add to Note</button></div>`);
          }
          $$renderer4.push(`<!--]--></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      {
        $$renderer3.push("<!--[!-->");
      }
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
function renderArchived$1($$renderer, archived, Icon2, archiveAction) {
  $$renderer.push(`<div class="tooltip tooltip-bottom z-30"${attr("data-tip", archived)}><button class="btn btn-ghost flex items-center gap-x-2"><!---->`);
  Icon2($$renderer, { size: 18 });
  $$renderer.push(`<!----></button></div>`);
}
function Topbar_archive($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { archive, noteStatus, unarchive } = $$props;
    if (noteStatus === "active") {
      $$renderer2.push("<!--[-->");
      renderArchived$1($$renderer2, "Archive", Archive);
    } else {
      $$renderer2.push("<!--[!-->");
      if (noteStatus === "archived") {
        $$renderer2.push("<!--[-->");
        renderArchived$1($$renderer2, "Un-Archive", Archive_restore);
      } else {
        $$renderer2.push("<!--[!-->");
        if (noteStatus === "deleted") {
          $$renderer2.push("<!--[-->");
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function renderArchived($$renderer, status, Icon2, action) {
  $$renderer.push(`<div class="tooltip tooltip-bottom z-30"${attr("data-tip", status)}><button class="btn btn-ghost"><!---->`);
  Icon2($$renderer, { size: 18 });
  $$renderer.push(`<!----></button></div>`);
}
function Topbar_delete($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = void 0,
      noteStatus,
      restore,
      isPermaDeleteNoteOpen = void 0
    } = $$props;
    if (noteStatus === "active" || noteStatus === "archived") {
      $$renderer2.push("<!--[-->");
      renderArchived($$renderer2, "Delete", Trash_2);
    } else {
      $$renderer2.push("<!--[!-->");
      if (noteStatus === "deleted") {
        $$renderer2.push("<!--[-->");
        renderArchived($$renderer2, "Delete Forever", Trash_2);
        $$renderer2.push(`<!----> `);
        renderArchived($$renderer2, "Restore", Inbox);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen, isPermaDeleteNoteOpen });
  });
}
function Popover_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      sideOffset = 4,
      align = "center",
      portalProps,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Portal($$renderer3, spread_props([
        portalProps,
        {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Popover_content$1($$renderer4, spread_props([
              {
                "data-slot": "popover-content",
                sideOffset,
                align,
                class: cn("bg-base-100 border-base-content/20 text-base-content data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 data-[state=closed]:motion-scale-out-95 motion-duration-75 data-[state=open]:motion-scale-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-popover-content-transform-origin) outline-hidden font-display z-50 w-72 rounded-md border p-4 text-sm shadow-md", className)
              },
              restProps,
              {
                get ref() {
                  return ref;
                },
                set ref($$value) {
                  ref = $$value;
                  $$settled = false;
                }
              }
            ]));
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
function Popover_trigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Popover_trigger$1($$renderer3, spread_props([
        { "data-slot": "popover-trigger", class: cn("", className) },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { ref });
  });
}
const Root = Popover;
function Topbar_note_info($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { note } = $$props;
    const lastOpened = note.last_opened ? dayjs(note.last_opened).format("MMM DD YYYY, hh:ss a") : "Never";
    const created = dayjs(note.added).format("MMM DD YYYY, hh:ss a");
    const modified = dayjs(note.updated).format("MMM DD YYYY, hh:ss a");
    const size = (() => {
      const sizeInBytes = note.resources?.reduce(
        (total, current) => {
          return total + current.size;
        },
        0
      );
      if (!sizeInBytes) return null;
      const sizeInMB = (sizeInBytes / 1048576).toFixed(2);
      return sizeInMB;
    })();
    $$renderer2.push(`<!---->`);
    Root($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Popover_trigger($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="btn btn-ghost">`);
            Info($$renderer4, { size: 18 });
            $$renderer4.push(`<!----></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> <!---->`);
        Popover_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="gap-golden-md grid grid-cols-3"><div>Last Opened</div> <div class="col-span-2">${escape_html(lastOpened)}</div> <div>Created</div> <div class="col-span-2">${escape_html(created)}</div> <div>Modified</div> <div class="col-span-2">${escape_html(modified)}</div> <!--[-->`);
            const each_array = ensure_array_like(note.sources);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let source = each_array[$$index];
              $$renderer4.push(`<div>Source</div> <div class="col-span-2">${escape_html(source.source)}</div> <div>URL</div> <div class="col-span-2 break-all"><a class="link line-clamp-2"${attr("href", source.source_url)}>${escape_html(source.source_url)}</a></div>`);
            }
            $$renderer4.push(`<!--]--> `);
            if (size) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="text-nowrap">Size</div> <div>${escape_html(size)} MB</div>`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]--></div>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
function Topbar_notebook($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { notebook, isOpen = void 0 } = $$props;
    $$renderer2.push(`<div class="tooltip tooltip-bottom z-30" data-tip="Change Notebook"><button class="btn btn-ghost flex items-center gap-x-2">`);
    Notebook($$renderer2, { class: "md:hidden", size: 18 });
    $$renderer2.push(`<!----> <span class="hidden md:inline">${escape_html(notebook.name)}</span></button></div>`);
    bind_props($$props, { isOpen });
  });
}
function Topbar_tags($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0 } = $$props;
    $$renderer2.push(`<div class="tooltip tooltip-bottom z-30" data-tip="Edit Tags"><button class="btn btn-ghost flex items-center gap-x-2">`);
    Tag($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div>`);
    bind_props($$props, { isOpen });
  });
}
function Topbar_rating($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { rating, action } = $$props;
    $$renderer2.push(`<div class="rating rating-xs"><!--[-->`);
    const each_array = ensure_array_like([1, 2, 3, 4, 5]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let star = each_array[$$index];
      $$renderer2.push(`<input type="radio" name="ratings" class="mask mask-star-2 bg-orange-400"${attr("aria-label", `${stringify(star)} star`)}${attr("checked", rating === star, true)}/>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Topbar_tag_list($$renderer, $$props) {
  let { tags } = $$props;
  Scroll_area($$renderer, {
    orientation: "horizontal",
    class: "min-w-10 max-w-80 whitespace-nowrap text-right",
    children: ($$renderer2) => {
      if (tags) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!--[-->`);
        const each_array = ensure_array_like(tags);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let tag = each_array[$$index];
          $$renderer2.push(`<span class="badge mx-1 text-nowrap">${escape_html(tag.name)}</span>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    },
    $$slots: { default: true }
  });
}
function Topbar_edit($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0 } = $$props;
    $$renderer2.push(`<div class="tooltip tooltip-bottom z-30" data-tip="Edit Note"><button class="btn btn-ghost flex items-center gap-x-2">`);
    Pencil($$renderer2, { size: 18 });
    $$renderer2.push(`<!----></button></div>`);
    bind_props($$props, { isOpen });
  });
}

export { NoteContent as N, Topbar_tag_list as T, Topbar_tags as a, Topbar_notebook as b, Topbar_rating as c, Topbar_edit as d, Topbar_archive as e, Topbar_delete as f, Topbar_note_info as g };
//# sourceMappingURL=topbar-edit-D4LgA6jL.js.map
