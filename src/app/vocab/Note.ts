import { Object } from './Object';
import { Image } from './Image';
import { Link } from './Link';

export class Note implements Object {
  type: String = '';
  id: String = '';
  attributedTo: Object[] = [];
  content: String = '';
  name: String = '';
  icon: Image[] = [];
  image: Image[] = [];
  inReplyTo: Object[] = []
  published: Date = new Date();
  url: Link[] = [];
}
