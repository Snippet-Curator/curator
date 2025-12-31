import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BKq-uxqp.js","_app/immutable/chunks/ZeYipwfv.js","_app/immutable/chunks/D6MYdS9h.js","_app/immutable/chunks/CqKpht16.js","_app/immutable/chunks/cli-iPJS.js","_app/immutable/chunks/CB1YDqdC.js","_app/immutable/chunks/FAXfw1af.js","_app/immutable/chunks/HfSINFkk.js","_app/immutable/chunks/Yh8spgc9.js","_app/immutable/chunks/D-VGJNw3.js","_app/immutable/chunks/iduMi8zz.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/CUTd93zW.js"];
export const stylesheets = ["_app/immutable/assets/scroll-area.bHHIbcsu.css","_app/immutable/assets/FilterSearch.Bfnm9isJ.css","_app/immutable/assets/0.BEChjhqk.css"];
export const fonts = [];
