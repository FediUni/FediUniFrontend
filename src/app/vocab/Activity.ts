import { Object } from "./Object";
import { Actor } from "./Actor";

export interface Activity extends Object {
  actor?: Actor[];
  object?: Object;
  target?: Object;
  result?: Object;
  origin?: Object;
  instrument?: Object;
}
