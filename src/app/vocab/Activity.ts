import { Object } from "./Object";

export class Activity extends Object {
  actor?: Object[];
  object?: Object;
  target?: Object;
  result?: Object;
  origin?: Object;
  instrument?: Object;
}
