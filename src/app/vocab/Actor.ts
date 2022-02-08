import { Image } from './Image';
import { Link } from './Link';
import { Object } from './Object';

export class Actor implements Object {
  type: string = '';
  id: string = '';
  attributedTo: Object[] = [];
  content: string = '';
  name: string = '';
  icon: Image[] = [];
  image: Image[] = [];
  inReplyTo: Object[] = [];
  published: Date = new Date();
  url: Link[] = [];
}
