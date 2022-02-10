import { Link } from "./Link"
import { ActivityPubObject } from "./ActivityPubObject"

export interface Collection extends ActivityPubObject {
  totalItems: number
  current: Link
  first: Link
  last: Link
  items: ActivityPubObject[]
}

export class OrderedCollection extends Object {
  totalItems: number = 0;
  current: Link = new Link();
  first: Link = new Link();
  last: Link = new Link();
  orderedItems: ActivityPubObject[] = [];
}
