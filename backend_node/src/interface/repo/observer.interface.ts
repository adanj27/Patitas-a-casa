/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */

import { Subject } from "./subject.interface";

export interface Observer {
  update(subject: Subject): void;
}
