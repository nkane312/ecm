import { Template } from '../preview.service';

export class Campaign {
  _id: any;
  name: String;
  utm: String;
  country: String;
  templates: Array<Template>;
  __v: any;
}
