import { k as getAuth, m as makeDefaultNotebook } from "../../chunks/utils2.js";
async function load() {
  await getAuth();
  await makeDefaultNotebook();
}
export {
  load
};
