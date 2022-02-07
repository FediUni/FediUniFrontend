import { Link } from "./Link"
import { Object } from "./Object"

export interface Collection extends Object {
    totalItems: number
    current: Link
    first: Link
    last: Link
    items: Object[]
}

export interface OrderedCollection extends Collection { }