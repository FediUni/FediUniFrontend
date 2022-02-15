import { ActivityPubObject } from './ActivityPubObject';
import { Image } from './Image';
import { Link } from './Link';

export class Note implements ActivityPubObject {
  type: string = '';
  id?: URL;
  attributedTo: ActivityPubObject[] = [];
  content: string = '';
  name: string = '';
  icon: Image[] = [];
  image: Image[] = [];
  inReplyTo: ActivityPubObject[] = [];
  published: Date = new Date();
  url: Link[] = [];
}
