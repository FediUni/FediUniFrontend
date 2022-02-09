import { ActivityPubObject } from './Object';
import { Image } from './Image';
import { Link } from './Link';

export class Note implements ActivityPubObject {
  type: string = '';
  id: string = '';
  attributedTo: ActivityPubObject[] = [];
  content: string = '';
  name: string = '';
  icon: Image[] = [];
  image: Image[] = [];
  inReplyTo: ActivityPubObject[] = []
  published: Date = new Date();
  url: Link[] = [];
}
