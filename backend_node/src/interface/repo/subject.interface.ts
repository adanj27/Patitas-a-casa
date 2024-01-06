/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */

import { Observer } from "./observer.interface";

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(message: unknown): void;
}
