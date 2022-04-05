import { Link } from './Link';
import { Image } from './Image';
import {Collection, OrderedCollection} from "./Collection";
import {Place} from "./Place";
import {Activity} from "./Activity";

export interface ActivityPubObject {
  type: string;
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

export function isActivity(o: any):boolean {
  switch (o?.type){
    case "Create":
      return true;
    case "Announce":
      return true;
    case "Invite":
      return true;
    default:
      return false;
  }
}
