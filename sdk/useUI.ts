/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal as _signal } from "@preact/signals";

const state = {};

export const useUI = () => state;
