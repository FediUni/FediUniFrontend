import { Link } from "./Link";
import { Image } from "./Image";

export interface ActivityPubObject {
  type: string
  id: string
  attributedTo?: ActivityPubObject[] | ActivityPubObject
  content?: string
  name?: string
  icon?: Image[] | Image
  image?: Image[] | Image
  inReplyTo?: ActivityPubObject[] | ActivityPubObject
  published?: Date
  url?: Link[] | Link | string
}
