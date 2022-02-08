import { Link } from "./Link";
import { Image } from "./Image";

export interface Object {
  type: string
  id: string
  attributedTo: Object[]
  content: string
  name: string
  icon: Image[]
  image: Image[]
  inReplyTo: Object[]
  published: Date
  url: Link[]
}
