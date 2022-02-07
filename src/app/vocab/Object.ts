import { Link } from "./Link";
import { Image } from "./Image";

export interface Object { 
  type: String
  id: String
  attributedTo: Object[]
  content: String
  name: String
  icon: Image[]
  image: Image[]
  inReplyTo: Object[]
  published: Date
  url: Link[]
}