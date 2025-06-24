/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";


const displaySearchbar = signal(false)

const state = {
  displaySearchbar,
};

export const useUI = () => state;