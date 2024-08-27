/* eslint-disable no-unused-vars */

import { DOMAIN } from "./environment";

// eslint-disable-next-line no-shadow
export enum Routes {
  HOME = "/",
  STATS = "/stats",
}

export const makeStatsRoute = (shortHash: string) =>
  `${Routes.STATS}/${shortHash}`;

export const makeRedirectURL = (shortHash: string) => `${DOMAIN}/${shortHash}`;
