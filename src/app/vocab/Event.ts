import { Place } from './Place';
import { ActivityPubObject } from './ActivityPubObject';
import { Image } from './Image';
import { Link } from './Link';


export class Event implements ActivityPubObject {
  type: string = '';
  id: URL | string;
  attributedTo?: ActivityPubObject[] | URL = [];
  content?: string = '';
  name?: string = '';
  location?: Place;
  startTime?: Date;
  endTime?: Date;
  published?: Date;

  constructor(o: any) {
    this.type = o.type;
    this.id = new URL(o.id);
    this.attributedTo = o.attributedTo;
    this.content = o.content;
    this.name = o.name;
    this.startTime = new Date(o.startTime);
    this.endTime = new Date(o.endTime);
    this.published = new Date(o.published);
    this.location = o.location;
  }
}
