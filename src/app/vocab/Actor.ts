import { ActivityPubObject } from './ActivityPubObject';
import { Image } from './Image';
import { Link } from './Link';

export class Actor implements ActivityPubObject {
  type: string = '';
  id?: URL;
  attributedTo?: ActivityPubObject[] | ActivityPubObject = [];
  content?: string = '';
  name: string = '';
  preferredUsername?: string = '';
  icon?: Image[] | Image = [];
  image?: Image[] | Image = [];
  inReplyTo?: ActivityPubObject[] | ActivityPubObject = [];
  published?: Date = new Date();
  url?: Link[] | Link = [];
  host?: string;

  constructor(o: any) {
    this.type = o.type;
    this.id = new URL(o.id);
    this.attributedTo = o.attributedTo;
    this.content = o.content;
    this.name = o.name;
    this.preferredUsername = o.preferredUsername;
    this.icon = o.icon ?? [];
    this.url = o.url;
    this.host = this.id.host
  }

  identifier() {
    return `@${this.preferredUsername}@${this.host}`;
  }
}
