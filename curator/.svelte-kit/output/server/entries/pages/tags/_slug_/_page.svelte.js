import { a6 as await_block } from "../../../../chunks/index.js";
import { l as setNotelistState, n as getNotelistState, o as signalPageState, p as saveCurrentPage } from "../../../../chunks/utils2.js";
import { a as Scroll_area } from "../../../../chunks/scroll-area.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import { p as page } from "../../../../chunks/index2.js";
import { B as BulkEditBtn, P as Pagination, a as BulkToolbar, N as NoteList } from "../../../../chunks/EditBulkTags.js";
import "../../../../chunks/EditNote.svelte_svelte_type_style_lang.js";
import "@emresandikci/pocketbase-query";
import { T as Topbar, a as Topbar_sidebar } from "../../../../chunks/topbar-sidebar.js";
import { T as Topbar_back } from "../../../../chunks/topbar-back.js";
import "dayjs";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let tagID = page.params.slug;
    let isBulkEdit = false;
    let selectedNotesID = [];
    const noteType = { type: "tags", id: page.params.slug };
    setNotelistState(tagID, noteType);
    const notelistState = getNotelistState(tagID);
    signalPageState.savedPages.get(page.url.hash);
    const updatePage = async (newPage) => {
      await notelistState.getByTag(tagID, newPage);
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
          $$renderer4.push(`<!----> <div class="grow"></div> `);
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
