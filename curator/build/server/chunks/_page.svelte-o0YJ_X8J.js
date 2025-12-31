import { a6 as await_block } from './index-DFk0vKPb.js';
import { l as setNotelistState, n as getNotelistState, o as signalPageState, p as saveCurrentPage } from './utils2-vPAmPu5P.js';
import { a as Scroll_area } from './scroll-area-4udoZtyH.js';
import './exports-Cug9_qxt.js';
import { p as page } from './index2-BlJ4z0wj.js';
import { B as BulkEditBtn, P as Pagination, a as BulkToolbar, N as NoteList } from './EditBulkTags-KFn5-s4d.js';
import './EditNote.svelte_svelte_type_style_lang-N4Cf3Uss.js';
import '@emresandikci/pocketbase-query';
import { T as Topbar, a as Topbar_sidebar } from './topbar-sidebar-BHyfBO4h.js';
import { T as Topbar_back } from './topbar-back-CpSOzEHl.js';
import 'dayjs';
import './escaping-CqgfEcN3.js';
import './clsx-ChV9xqsO.js';
import 'spark-md5';
import 'pocketbase';
import 'fast-xml-parser';
import './notebook-PosgQq5g.js';
import './Icon-CiAOWcym.js';
import './tags-DAIgStR6.js';
import './EditNote-BnnrAADa.js';
import './Delete-CCIhHOHZ.js';
import './index3-Dby5GV8o.js';
import './NoteLoading-ChiH4MIz.js';
import './arrow-left-DuhA8173.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isBulkEdit = false;
    let selectedNotesID = [];
    const noteType = { type: "archive", id: page.params.slug };
    setNotelistState("archived", noteType);
    const notelistState = getNotelistState("archived");
    signalPageState.savedPages.get(page.url.hash) ?? 1;
    const updatePage = async (newPage) => {
      await notelistState.getArchived(newPage);
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
                  isArchive: true,
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

export { _page as default };
//# sourceMappingURL=_page.svelte-o0YJ_X8J.js.map
