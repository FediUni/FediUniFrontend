import { Link } from './Link';
import { Image } from './Image';

export interface ActivityPubObject {
  type: string;
  id?: URL;
  attributedTo?: ActivityPubObject[] | ActivityPubObject;
  content?: string;
  name?: string;
  icon?: Image[] | Image;
  image?: Image[] | Image;
  inReplyTo?: ActivityPubObject[] | ActivityPubObject;
  published?: Date | string;
  url?: Link[] | Link | string;
  summary?: string;
}
