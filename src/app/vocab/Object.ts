import { Link } from "./Link";
import { Image } from "./Image";

export interface Object {
  type: string
  id: string
  attributedTo?: Object[]
  content?: string
  name?: string
  icon?: Image[] | Image
  image?: Image[] | Image
  inReplyTo?: Object[]
  published?: Date
  url?: Link[]
}
