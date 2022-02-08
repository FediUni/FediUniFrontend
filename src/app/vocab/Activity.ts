import { Object } from "./Object";

export interface Activity extends Object {
  actor: Object
  object: Object
  target: Object
  result: Object
  origin: Object
  instrument: Object
}
