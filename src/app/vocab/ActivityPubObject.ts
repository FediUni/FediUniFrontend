import { Link } from './Link';
import { Image } from './Image';

export class ActivityPubObject {
  type: string = "";
  id?: URL;
  attributedTo?: ActivityPubObject[] | ActivityPubObject | URL;
  content?: string;
  name?: string;
  icon?: Image[] | Image;
  image?: Image[] | Image;
  inReplyTo?: ActivityPubObject[] | ActivityPubObject;
  published?: Date | string;
  url?: Link[] | Link | string;
  to?: string[];
  cc?: string[];
  summary?: string;
}
