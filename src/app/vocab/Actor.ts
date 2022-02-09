import { Image } from './Image';
import { Link } from './Link';
import { ActivityPubObject } from './Object';

export class Actor implements ActivityPubObject {
  type: string = '';
  id: string = '';
  attributedTo: ActivityPubObject[] = [];
  content: string = '';
  name: string = '';
  icon: Image[] = [];
  image: Image[] = [];
  inReplyTo: ActivityPubObject[] = [];
  published: Date = new Date();
  url: Link[] = [];
}
