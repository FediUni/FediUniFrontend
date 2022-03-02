import { ActivityPubObject } from './ActivityPubObject';
import { Image } from './Image';
import { Link } from './Link';

export class Note implements ActivityPubObject {
  type: string = '';
  id?: URL;
  attributedTo?: ActivityPubObject[] | URL = [];
  content?: string = '';
  name?: string = '';
  icon?: Image[] = [];
  image?: Image[] = [];
  inReplyTo?: ActivityPubObject[] = [];
  to?: string[] = [];
  cc?: string[] = []; published?: Date = new Date();
  url?: Link[] = [];
  attachment?: ActivityPubObject[] | ActivityPubObject;
}
