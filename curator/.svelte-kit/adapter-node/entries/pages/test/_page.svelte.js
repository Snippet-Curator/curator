import "clsx";
import "../../../chunks/utils2.js";
import { a as Scroll_area } from "../../../chunks/scroll-area.js";
import { a5 as attr } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/escaping.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Youtube($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let title = "";
    let description = "";
    let channelTitle = "";
    let thumbnails = "";
    let duration = "";
    let channelID = "";
    let publishedDate = "";
    let viewCount = "";
    dayjs.extend(customParseFormat);
    function parseYouTubeDuration(duration2) {
      const regex = /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
      const matches = duration2.match(regex);
      if (!matches) return null;
      const days = parseInt(matches[1] || 0, 10);
      const hours = parseInt(matches[2] || 0, 10);
      const minutes = parseInt(matches[3] || 0, 10);
      const seconds = parseInt(matches[4] || 0, 10);
      const parts = [];
      if (days) parts.push(`${days}d`);
      if (hours) parts.push(`${hours}h`);
      if (minutes) parts.push(`${minutes}m`);
      if (seconds) parts.push(`${seconds}s`);
      return parts.join(" ") || "0s";
    }
    $$renderer2.push(`<div style="font-family: Verdana, 'Segoe UI', sans-serif; font-size: 16px"><h2 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1.2rem">${escape_html(title)}</h2> <div style="margin-bottom: 1rem"><figure style="width: 100%"><img style="width: 100%"${attr("src", thumbnails)} alt="thumbnail"/></figure></div> <div style="margin-bottom: 1rem"><iframe style="width: 100%;aspect-ratio: 16/9;" src="https://www.youtube.com/embed/vIzopZRbMso?si=Gi26b7n5kpxPLtz5"${attr("title", title)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div> <div style="font-weight: 600">By <a${attr("href", channelID)}>${escape_html(channelTitle)}</a> <div style="font-size: 0.8rem">${escape_html(dayjs(publishedDate).format("MM/DD/YYYY"))}<br/> ${escape_html(parseYouTubeDuration(duration))}<br/> ${escape_html(Number(viewCount).toLocaleString("en-US"))} views</div></div> <div style="padding: 1.6rem">${html(description.replace(/\n/g, "<br/>"))}</div></div>`);
  });
}
function _page($$renderer) {
  Scroll_area($$renderer, {
    class: "h-full",
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="card mx-auto mt-10 h-full max-w-3xl px-2 pb-40 md:px-10 lg:max-w-5xl">`);
      Youtube($$renderer2);
      $$renderer2.push(`<!----></div>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
