import { Link } from './Link';
import { ActivityPubObject } from './ActivityPubObject';
import {Image} from "./Image";

export class Collection implements ActivityPubObject {
  type: string = "";
  id: URL | string;
  attributedTo?: ActivityPubObject[] | ActivityPubObject | URL;
  content?: string;
  name?: string;
  icon?: Image[] | Image;
  image?: Image[] | Image;
  inReplyTo?: ActivityPubObject[] | ActivityPubObject;
  replies?: Collection;
  published?: Date | string;
  url?: Link[] | Link | string;
  to?: string[];
  cc?: string[];
  summary?: string;
  attachment?: ActivityPubObject[] | ActivityPubObject;
  totalItems: number;
  current: Link;
  first: CollectionPage;
  last: CollectionPage;
  next: CollectionPage;
  prev: CollectionPage;
  items: ActivityPubObject[]

  constructor(c: any) {
    this.type = c.type;
    this.id = new URL(c.id);
    this.totalItems = c.totalItems;
    this.current = c.current;
    this.first = c.first;
    this.last = c.last;
    this.next = c.next;
    this.items = c.items;
  }
}

export interface CollectionPage extends Collection {
  partOf?: Link;
  next: CollectionPage;
  prev: CollectionPage;
}

export class OrderedCollection extends Object {
  totalItems: number = 0;
  current: Link = new Link();
  first: Link | string = new Link();
  last: Link | string = new Link();
  orderedItems: ActivityPubObject[] | ActivityPubObject = [];

  constructor(o: any) {
    super();
    this.totalItems = o.totalItems;
    this.current = o.current;
    this.first = o.first as string;
    this.last = o.last as string;
    this.orderedItems = o.orderedItems;
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
