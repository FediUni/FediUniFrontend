import { Link } from "./Link"
import { Object } from "./Object"
import { Activity } from "./Activity"

export interface Collection extends Object {
  totalItems: number
  current: Link
  first: Link
  last: Link
  items: Object[]
}

export interface OrderedCollection extends Object {
  totalItems: number
  current: Link
  first: Link
  last: Link
  orderedItems: Activity | Activity[]
}
