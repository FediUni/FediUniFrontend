import { Link } from "./Link"
import { Object } from "./Object"

export interface Collection extends Object {
  totalItems: number
  current: Link
  first: Link
  last: Link
  items: Object[]
}

export class OrderedCollection extends Object {
  totalItems: number = 0;
  current: Link = new Link();
  first: Link = new Link();
  last: Link = new Link();
  orderedItems: Object[] = [];
}
