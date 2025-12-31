import { i as getSettingState } from './utils2-vPAmPu5P.js';
import { a as Scroll_area } from './scroll-area-4udoZtyH.js';
import { T as Topbar, a as Topbar_sidebar } from './topbar-sidebar-BHyfBO4h.js';
import { T as Topbar_back } from './topbar-back-CpSOzEHl.js';
import 'dayjs';
import { a7 as attr, a6 as await_block, $ as ensure_array_like } from './index-DFk0vKPb.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './clsx-ChV9xqsO.js';
import 'spark-md5';
import './exports-Cug9_qxt.js';
import './index2-BlJ4z0wj.js';
import 'pocketbase';
import 'fast-xml-parser';
import './Icon-CiAOWcym.js';
import './arrow-left-DuhA8173.js';

function renderKBD($$renderer, kbds, title) {
  $$renderer.push(`<div class="gap-golden-md flex flex-col"><span class="text-lg">${escape_html(title)}</span> <!--[-->`);
  const each_array = ensure_array_like(kbds);
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let kbd = each_array[$$index_1];
    $$renderer.push(`<div class="grid grid-cols-2">${escape_html(kbd.description)} <div class="gap-golden-md flex"><!--[-->`);
    const each_array_1 = ensure_array_like(kbd.displays);
    for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
      let display = each_array_1[$$index];
      $$renderer.push(`<kbd class="kbd">${escape_html(display)}</kbd>`);
    }
    $$renderer.push(`<!--]--></div></div>`);
  }
  $$renderer.push(`<!--]--></div>`);
}
function KBD($$renderer) {
  const notes = [
    { displays: ["0", "h"], description: "no star" },
    { displays: ["1", "j"], description: "1 star" },
    { displays: ["2", "k"], description: "2 stars" },
    { displays: ["3", "l"], description: "3 stars" },
    { displays: ["4", ";"], description: "4 stars" },
    { displays: ["5", "'"], description: "5 stars" },
    { displays: ["shift + a"], description: "Archive note" },
    { displays: ["del"], description: "Delete note" },
    { displays: ["e"], description: "Edit note" },
    { displays: ["n"], description: "Edit notebook" },
    { displays: ["t"], description: "Edit tags" },
    { displays: ["b"], description: "Bulk edit" }
  ];
  const discover = [
    { displays: ["→", "d", "space"], description: "Next note" },
    { displays: ["←", "a"], description: "Previous note" },
    { displays: ["↑", "w"], description: "See more" },
    { displays: ["↓", "s"], description: "See less" }
  ];
  const navigations = [
    { displays: ["ctrl + l"], description: "Navigation box" },
    { displays: ["→"], description: "Next page" },
    { displays: ["←"], description: "Previous page" },
    { displays: ["Backspace"], description: "Go back" }
  ];
  $$renderer.push(`<div class="card"><div class="card-body"><div class="card-title text-xl">Keyboard Shortcuts</div> <div class="gap-golden-md grid md:grid-cols-2">`);
  renderKBD($$renderer, navigations, "Navigation");
  $$renderer.push(`<!----> <div class="row-span-2">`);
  renderKBD($$renderer, notes, "Editing Notes");
  $$renderer.push(`<!----></div> `);
  renderKBD($$renderer, discover, "Discover Navigation");
  $$renderer.push(`<!----></div></div></div>`);
}
function DiscoverSetting($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const settingState = getSettingState();
    function renderDiscoverSetting($$renderer3, name, title, initialValue = 0, description = "", min = 0, max = 10, step = 1) {
      $$renderer3.push(`<div class="gap-x-golden-md grid grid-cols-12 content-start"><legend class="fieldset-legend col-span-12">${escape_html(title)}</legend> <div class="col-span-9"><p>${escape_html(description)}</p></div> <input type="number" class="input col-span-2 text-right" required${attr("min", min)}${attr("max", max)}${attr("value", initialValue)}${attr("step", step)}/></div>`);
    }
    $$renderer2.push(`<div class="card mb-20"><div class="card-body"><div class="card-title text-xl">Discover Settings</div> <p>Settings are updated on restart.</p> <div class="gap-x-golden-md space-y-golden-lg grid grid-cols-1 md:grid-cols-2">`);
    renderDiscoverSetting($$renderer2, "recencyWeight", "Recency Weight", settingState.recencyWeight, "Weight of how recently a note was seen. Older notes will be ranked higher.");
    $$renderer2.push(`<!----> `);
    renderDiscoverSetting($$renderer2, "ratingWeight", "Rating Weight", settingState.ratingWeight, "Weight of note rating in score calculation. Higher rated notes will be ranked higher.");
    $$renderer2.push(`<!----> `);
    renderDiscoverSetting($$renderer2, "weightWeight", "Voting Weight", settingState.weightWeight, "Weight of upvote vs downvote of a note. More upvoted notes will be ranked higher");
    $$renderer2.push(`<!----> `);
    renderDiscoverSetting($$renderer2, "randomWeight", "Random Weight", settingState.randomWeight, "Weight of random modifier. Higher weight means more randomness.");
    $$renderer2.push(`<!----> `);
    renderDiscoverSetting($$renderer2, "maxDay", "Max Day Cutoff (Day)", settingState.maxDay, "Notes older than this cutoff will receive the maximum recency score.", 0, 365, 1);
    $$renderer2.push(`<!----> `);
    renderDiscoverSetting($$renderer2, "fullPenaltyWindow", "Full Penalty Window (Hour)", settingState.fullPenaltyWindow, "Notes seen in this window will be penalized to be ranked less (default 1 hour).", 1, 24, 1);
    $$renderer2.push(`<!----> `);
    renderDiscoverSetting($$renderer2, "decayWindow", "Penality Recovery Window (Hour)", settingState.decayWindow, "Penalty will gradually reduce during this time period for penalized notes (default 12 hours).", 1, 1e3, 1);
    $$renderer2.push(`<!----> `);
    renderDiscoverSetting($$renderer2, "daysOld", "Refresh Score Cutoff (Day)", settingState.daysOld, "Notes with score older than this will get a score refresh on startup to recalculate based on recency. Use 0 to refresh all notes (can increase load time).", 0, 365, 1);
    $$renderer2.push(`<!----> `);
    renderDiscoverSetting($$renderer2, "scoreRefreshHour", "Score Refresh Frequency When Open (Hour)", settingState.scoreRefreshHour, "Curator will refresh scores when open. Default refresh is every 6 hours. Changing it to 0 to stop refresh automatically.", 0, 24, 1);
    $$renderer2.push(`<!----></div> <div class="divider"></div> <div class="gap-x-golden-md grid grid-cols-12 items-center"><div class="col-span-3"><legend class="fieldset-legend">Youtube API Key</legend> Used to add youtube videos.</div> <input type="text" class="input col-span-9 w-full text-right"${attr("value", settingState.youtubeAPIKey)}/></div></div></div>`);
  });
}
function Version($$renderer) {
  let version = (async () => {
    return await window.electronAPI.getAppVersion();
  })();
  $$renderer.push(`<div class="card"><div class="card-body"><div class="card-title text-xl">App Version</div> <div>`);
  await_block($$renderer, version, () => {
  }, (version2) => {
    $$renderer.push(`Version: ${escape_html(version2)}`);
  });
  $$renderer.push(`<!--]--></div></div></div>`);
}
function _page($$renderer) {
  Topbar($$renderer, {
    children: ($$renderer2) => {
      Topbar_sidebar($$renderer2);
      $$renderer2.push(`<!----> `);
      Topbar_back($$renderer2);
      $$renderer2.push(`<!----> <div class="grow"></div>`);
    }
  });
  $$renderer.push(`<!----> `);
  Scroll_area($$renderer, {
    class: "h-[calc(100vh-60px)]",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="p-golden-xl mx-auto max-w-5xl">`);
      KBD($$renderer2);
      $$renderer2.push(`<!----> <div class="divider"></div> `);
      DiscoverSetting($$renderer2);
      $$renderer2.push(`<!----> <div class="divider"></div> `);
      Version($$renderer2);
      $$renderer2.push(`<!----></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!---->`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CW-lPZoZ.js.map
