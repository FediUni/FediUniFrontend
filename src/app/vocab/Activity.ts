import { Object } from "./Object";
import { Actor } from "./Actor";

export class Activity extends Object {
  actor?: Actor[];
  object?: Object;
  target?: Object;
  result?: Object;
  origin?: Object;
  instrument?: Object;
}
