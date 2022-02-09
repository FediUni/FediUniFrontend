import { Object } from './Object';

export class Image implements Object {
  type: string = '';
  id: string = '';
  attributedTo: Object[] = [];
  content: string = '';
  name: string = '';
  icon: Image[] = [];
  image: Image[] = [];
  inReplyTo: Object[] = []
  published: Date = new Date();
  url: Link[] = [];
}
