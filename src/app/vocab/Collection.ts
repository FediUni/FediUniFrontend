import { Link } from './Link';
import { ActivityPubObject } from './ActivityPubObject';

export interface Collection extends ActivityPubObject {
  totalItems: number;
  current: Link;
  first: Link;
  last: Link;
  items: ActivityPubObject[];
}

export interface CollectionPage extends Collection {
  partOf?: Link;
  next?: Link;
  prev?: Link;
}

export class OrderedCollection extends Object {
  totalItems: number = 0;
  current: Link = new Link();
  first: Link | string = new Link();
  last: Link | string = new Link();
  orderedItems: ActivityPubObject[] = [];

  constructor(o: any) {
    super();
    this.totalItems = o.totalItems;
    this.current = o.current;
    this.first = o.first as string;
    this.last = o.last as string;
    this.orderedItems = o.orderedItems ?? [];
  }
}

export class OrderedCollectionPage extends OrderedCollection {
  partOf?: Link;
  next?: Link;
  prev?: Link;

  constructor(o: any) {
    super(o);
    this.partOf = o.partOf;
    this.next = o.next;
    this.prev = o.prev;
  }
}
