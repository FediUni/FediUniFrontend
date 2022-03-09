import { ActivityPubObject } from './ActivityPubObject';
import { Actor } from './Actor';
import { Image } from './Image';
import { Link } from './Link';
import {Note} from "./Note";

export class Activity implements ActivityPubObject {
  type: string = "";
  id: URL | string = "";
  attributedTo?: ActivityPubObject | ActivityPubObject[] | URL;
  content?: string;
  name?: string;
  icon?: Image | Image[];
  image?: Image | Image[];
  inReplyTo?: ActivityPubObject | ActivityPubObject[];
  published?: Date | string;
  url?: string | Link | Link[];
  actor?: Actor;
  object?: ActivityPubObject;
  target?: ActivityPubObject;
  result?: ActivityPubObject;
  origin?: ActivityPubObject;

  constructor(activity: any) {
    this.type = activity.type;
    this.id = new URL(activity.id);
    this.attributedTo = activity.attributedTo;
    this.content = activity.content;
    this.name = activity.name
    this.icon = activity.icon;
    this.image = activity.image;
    this.inReplyTo = activity.inReplyTo;
    this.published = activity.published;
    this.url = activity.url;
    this.actor = activity.actor;
    this.object = activity.object;
    this.target = activity.target;
    this.result = activity.result;
    this.origin = activity.origin;
  }
}
