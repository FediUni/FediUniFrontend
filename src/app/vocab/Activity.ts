import { ActivityPubObject } from "./ActivityPubObject";
import { Actor } from "./Actor";

export interface Activity extends ActivityPubObject {
  actor?: Actor[];
  object?: ActivityPubObject;
  target?: ActivityPubObject;
  result?: ActivityPubObject;
  origin?: ActivityPubObject;
  instrument?: ActivityPubObject;
}