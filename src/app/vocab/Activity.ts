import { Object } from "./Object";
import { Actor } from "./Actor";

export interface Activity extends Object {
  actor?: Actor[] | Actor;
  object?: Object;
  target?: Object;
  result?: Object;
  origin?: Object;
  instrument?: Object;
}
