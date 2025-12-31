import { a1 as ensure_array_like, a5 as attr, a2 as attr_class, a4 as stringify, a0 as bind_props } from "./index.js";
import { p as page } from "./index2.js";
import { R as Root, T as Trigger, C as Context_menu_content, a as Context_menu_item, b as Context_menu_separator } from "./index3.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import { a as getTagState, g as getNotebookState } from "./utils2.js";
import { h as Delete, R as Root$1, D as Dialog_content, f as Dialog_header, g as Dialog_title, C as Command_dialog, a as Command_input, b as Command_list, c as Command_empty, d as Command_group, e as Command_item } from "./Delete.js";
import "./EditNote.svelte_svelte_type_style_lang.js";
import "@emresandikci/pocketbase-query";
import { T as Tag } from "./tag.js";
import { e as escape_html } from "./escaping.js";
function TagList_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { tags, allowEdit = false } = $$props;
    const tagState = getTagState();
    let isDeleteOpen = false;
    let isChangeParentOpen = false;
    let isNewTagOpen = false;
    let selectedTag = void 0;
    let flatTags = tagState.flatTags;
    function renderTag($$renderer3, tag) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Trigger($$renderer4, {
            class: "flex cursor-auto items-center justify-between p-0 pr-2",
            children: ($$renderer5) => {
              $$renderer5.push(`<a${attr("href", `/tags/${stringify(tag.id)}`)}${attr_class(`${stringify(page.url.hash == `/tags/${tag.id}` ? "badge-neutral" : "")} badge hover:badge-neutral mx-2 my-2 flex items-center gap-x-2 text-nowrap transition-colors`)}>`);
              Tag($$renderer5, { size: 15 });
              $$renderer5.push(`<!---->${escape_html(tag.name)}</a> <span class="text-base-content/80 text-right">${escape_html(tag.note_count)}</span>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <!---->`);
          Context_menu_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  tagState.pin(tag.id);
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Pin`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  selectedTag = tag;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Rename`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  selectedTag = tag;
                  isChangeParentOpen = true;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Change Parent`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  selectedTag = tag;
                  isDeleteOpen = true;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Delete`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_separator($$renderer5, {});
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  selectedTag = tag;
                  isNewTagOpen = true;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->New`);
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
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!--[-->`);
      {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(tags);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let tag = each_array[$$index];
          $$renderer3.push(`<li class="group mr-4">`);
          if (tag.children && tag.children?.length > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<details class="w-full cursor-pointer"><summary class="mr-4 flex w-full py-0 pl-0"><div class="grow">`);
            renderTag($$renderer3, tag);
            $$renderer3.push(`<!----></div></summary> `);
            if (tag.children) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<ul>`);
              TagList_1($$renderer3, { allowEdit, tags: tag.children });
              $$renderer3.push(`<!----></ul>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--></details>`);
          } else {
            $$renderer3.push("<!--[!-->");
            renderTag($$renderer3, tag);
          }
          $$renderer3.push(`<!--]--></li>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> `);
      Delete($$renderer3, {
        name: "Tag",
        action: () => tagState.delete(selectedTag.id),
        get isOpen() {
          return isDeleteOpen;
        },
        set isOpen($$value) {
          isDeleteOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->this tag?`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      ChangeParent($$renderer3, {
        type: "tag",
        fullList: flatTags,
        currentItemID: selectedTag?.id,
        clear: () => tagState.updateOnebyParent(selectedTag?.id, ""),
        action: (selectedParentTagID) => tagState.updateOnebyParent(selectedTag?.id, selectedParentTagID),
        get isOpen() {
          return isChangeParentOpen;
        },
        set isOpen($$value) {
          isChangeParentOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      New($$renderer3, {
        newType: "Tag",
        action: (newTagName) => tagState.createOnebyName(newTagName, selectedTag.id),
        get isOpen() {
          return isNewTagOpen;
        },
        set isOpen($$value) {
          isNewTagOpen = $$value;
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
function renderNotebook($$renderer, notebook) {
  $$renderer.push(`<div class="flex w-full items-center justify-between"><a${attr("href", `/notebook/${stringify(notebook.id)}`)} class="w-full items-center gap-x-2 text-nowrap px-3 py-1">${escape_html(notebook.name)}</a> <span class="text-right">${escape_html(notebook.note_count)}</span></div>`);
}
function NotebookList_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { notebooks, allowEdit = false } = $$props;
    const notebookState = getNotebookState();
    let isDeleteOpen = false;
    let isChangeParentOpen = false;
    let isNewNotebookOpen = false;
    let selectedNotebook = void 0;
    let flatNotebooks = notebookState.flatNotebooks;
    function renderNotebookSection($$renderer3, notebook) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Trigger($$renderer4, {
            class: `${stringify(page.url.pathname == `/notebook/${notebook.id}` ? " bg-neutral text-neutral-content" : "")} my-1 flex cursor-auto items-center justify-between rounded-md p-0 pr-2`,
            children: ($$renderer5) => {
              renderNotebook($$renderer5, notebook);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!----> <!---->`);
          Context_menu_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  notebookState.pin(notebook.id);
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Pin`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  selectedNotebook = notebook;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Rename`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  selectedNotebook = notebook;
                  isChangeParentOpen = true;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Change Parent`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  selectedNotebook = notebook;
                  isDeleteOpen = true;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Delete`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_separator($$renderer5, {});
              $$renderer5.push(`<!----> <!---->`);
              Context_menu_item($$renderer5, {
                onSelect: () => {
                  selectedNotebook = notebook;
                  isNewNotebookOpen = true;
                },
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->New`);
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
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!--[-->`);
      {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(notebooks);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let notebook = each_array[$$index];
          if (notebook.name != "Inbox") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<li class="group mr-4">`);
            if (notebook.children?.length > 0) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<details class="w-full"><summary class="flex w-full py-0 pl-0"><div class="grow">`);
              renderNotebookSection($$renderer3, notebook);
              $$renderer3.push(`<!----></div></summary> `);
              if (notebook.children) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<ul>`);
                NotebookList_1($$renderer3, { allowEdit, notebooks: notebook.children });
                $$renderer3.push(`<!----></ul>`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--></details>`);
            } else {
              $$renderer3.push("<!--[!-->");
              renderNotebookSection($$renderer3, notebook);
            }
            $$renderer3.push(`<!--]--></li>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> `);
      Delete($$renderer3, {
        name: "Notebook",
        action: () => notebookState.delete(selectedNotebook.id),
        get isOpen() {
          return isDeleteOpen;
        },
        set isOpen($$value) {
          isDeleteOpen = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->this notebook?`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      ChangeParent($$renderer3, {
        type: "notebook",
        fullList: flatNotebooks,
        currentItemID: selectedNotebook?.id,
        clear: () => notebookState.updateOnebyParent(selectedNotebook?.id, ""),
        action: (selectedParentNotebookID) => notebookState.updateOnebyParent(selectedNotebook?.id, selectedParentNotebookID),
        get isOpen() {
          return isChangeParentOpen;
        },
        set isOpen($$value) {
          isChangeParentOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      New($$renderer3, {
        newType: "Notebook",
        action: (newNotebookName) => notebookState.createOnebyName(newNotebookName, selectedNotebook.id),
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
function New($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, newType, action } = $$props;
    let newName = "";
    $$renderer2.push(`<!---->`);
    Root$1($$renderer2, {
      open: isOpen,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Dialog_content($$renderer3, {
          onCloseAutoFocus: (e) => {
            e.preventDefault();
            isOpen = false;
          },
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Dialog_header($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Dialog_title($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->New ${escape_html(newType)}`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> <label class="input w-full"><span class="label">${escape_html(newType)} Name</span> <input type="text" class="ring-0"${attr("value", newName)}/></label> <div class="flex justify-end gap-x-2"><button class="btn">Close</button> <button${attr("disabled", newName === "", true)} class="btn btn-primary">Create</button></div>`);
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
function ChangeParent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isOpen = void 0,
      fullList,
      currentItemID,
      action,
      clear,
      type
    } = $$props;
    let filteredList = (() => {
      return fullList.filter((item) => item.id != currentItemID && item.expand?.parent?.id != currentItemID);
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
          Command_input($$renderer4, { placeholder: `Search ${stringify(type)}s...` });
          $$renderer4.push(`<!----> <!---->`);
          Command_list($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Command_empty($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->No ${escape_html(type)} found.`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Command_group($$renderer5, {
                heading: "",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!--[-->`);
                  const each_array = ensure_array_like(filteredList);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let item = each_array[$$index];
                    $$renderer6.push(`<!---->`);
                    Command_item($$renderer6, {
                      onSelect: () => {
                        action(item.id);
                        isOpen = false;
                      },
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->${escape_html(item.name)}`);
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
          $$renderer4.push(`<!----> <div class="gap-x-golden-md p-golden-md border-b-base-content/10 flex w-full border-b"><div class="grow"></div> <button class="btn">Cancel</button> <button class="btn btn-primary">Clear Parent ${escape_html(type)}</button></div>`);
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
export {
  NotebookList_1 as N,
  TagList_1 as T,
  New as a
};
