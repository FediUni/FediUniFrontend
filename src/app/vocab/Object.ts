import { Link } from "./Link";
import { Image } from "./Image";

export interface ActivityPubObject {
  type: string
  id: string
  attributedTo?: ActivityPubObject[]
  content?: string
  name?: string
  icon?: Image[] | Image
  image?: Image[] | Image
  inReplyTo?: ActivityPubObject[]
  published?: Date
  url?: Link[]
}
