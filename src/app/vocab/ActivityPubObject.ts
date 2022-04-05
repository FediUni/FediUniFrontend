import { Link } from './Link';
import { Image } from './Image';
import {Collection, OrderedCollection} from "./Collection";
import {Place} from "./Place";

export class ActivityPubObject {
  type: string = "";
  id: URL | string;
  attributedTo?: ActivityPubObject[] | ActivityPubObject | URL;
  content?: string;
  name?: string;
  icon?: Image[] | Image;
  image?: Image[] | Image;
  location?: Place;
  startTime?: Date | string;
  endTime?: Date | string;
  inReplyTo?: ActivityPubObject;
  replies?: Collection;
  published?: Date | string;
  url?: Link[] | Link | string;
  to?: string[];
  cc?: string[];
  summary?: string;
  attachment?: ActivityPubObject[] | ActivityPubObject;
}
