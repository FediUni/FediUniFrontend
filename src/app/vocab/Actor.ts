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
  icon?: Image;
  image?: Image;
  inReplyTo?: ActivityPubObject[] | ActivityPubObject = [];
  published?: Date = new Date();
  url?: Link[] | Link = [];
  host?: string;
  summary?: string = '';

  constructor(o: any) {
    this.type = o.type;
    this.id = new URL(o.id);
    this.attributedTo = o.attributedTo;
    this.content = o.content;
    this.name = o.name || '';
    this.preferredUsername = o.preferredUsername;
    this.icon = o.icon;
    this.url = o.url;
    this.summary = o.summary;
    this.host = this.id.host;
  }

  profilePicture(): String {
    if (this.icon === undefined) {
      return '';
    }
    let icon = this.icon;
    if (Array.isArray(icon.url)) {
      return icon.url?.[0]?.href ?? '';
    } else if (icon.url instanceof Link) {
      return icon.url?.href ?? '';
    }
    return icon.url ?? '';
  }

  identifier() {
    return `@${this.preferredUsername}@${this.host}`;
  }
}
