import { ActivityPubObject } from './ActivityPubObject';
import { Actor } from './Actor';
import { Image } from './Image';
import { Link } from './Link';

export interface Activity extends ActivityPubObject {
  type: string;
  id: URL;
  attributedTo?: ActivityPubObject | ActivityPubObject[] | undefined;
  content?: string | undefined;
  name?: string | undefined;
  icon?: Image | Image[] | undefined;
  image?: Image | Image[] | undefined;
  inReplyTo?: ActivityPubObject | ActivityPubObject[] | undefined;
  published?: Date | string | undefined;
  url?: string | Link | Link[] | undefined;
  actor?: Actor;
  object?: ActivityPubObject;
  target?: ActivityPubObject;
  result?: ActivityPubObject;
  origin?: ActivityPubObject;
  instrument?: ActivityPubObject;
}
