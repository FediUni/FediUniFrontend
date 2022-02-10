import { ActivityPubObject } from './ActivityPubObject';
import { Image } from './Image';
import { Link } from './Link';

export class Actor implements ActivityPubObject {
  type: string = '';
  id: string = '';
  attributedTo: ActivityPubObject[] | ActivityPubObject = [];
  content: string = '';
  name: string = '';
  preferredUsername: string = '';
  icon: Image[] | Image = [];
  image: Image[] | Image = [];
  inReplyTo: ActivityPubObject[] | ActivityPubObject = [];
  published: Date = new Date();
  url: Link[] | Link = [];
}
