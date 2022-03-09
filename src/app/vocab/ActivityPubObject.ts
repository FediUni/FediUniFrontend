import { Link } from './Link';
import { Image } from './Image';
import {Collection, OrderedCollection} from "./Collection";

export class ActivityPubObject {
  type: string = "";
  id: URL | string;
  attributedTo?: ActivityPubObject[] | ActivityPubObject | URL;
  content?: string;
  name?: string;
  icon?: Image[] | Image;
  image?: Image[] | Image;
  inReplyTo?: ActivityPubObject[] | ActivityPubObject;
  replies?: Collection;
  published?: Date | string;
  url?: Link[] | Link | string;
  to?: string[];
  cc?: string[];
  summary?: string;
  attachment?: ActivityPubObject[] | ActivityPubObject;
}
