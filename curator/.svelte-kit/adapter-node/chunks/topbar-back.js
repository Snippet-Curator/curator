import "clsx";
import { A as Arrow_left } from "./arrow-left.js";
function Topbar_back($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<button class="btn btn-outline hover:btn-neutral border-base-300 flex items-center transition-colors duration-200">`);
    Arrow_left($$renderer2, { size: 15 });
    $$renderer2.push(`<!----> <div class="hidden md:block">Back</div></button>`);
  });
}
export {
  Topbar_back as T
};
