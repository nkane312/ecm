import { Campaign } from './campaign';

export class Appeal {
  _id: string;
  info: AppealInfo = new AppealInfo();
  codes: AppealCode = new AppealCode();
  signoffs: AppealSignoff = new AppealSignoff();
  content: AppealContent = new AppealContent();
  notes: string = '';
}
export class AppealInfo {
  name: string = '';
  template: string = '';
  sender: string = '';
  senderAddress: string = '';
  subjectLine: string = '';
  campaign: Campaign = new Campaign();
  sendDate: Date = new Date();
  scheduled: boolean = false;
  group: string;
  groupName: string;
}
export class AppealContent {
  url: string = '';
  body: Array<string> = [''];
  callout: AppealCallout = new AppealCallout();
  customSignature: string = '';
  image: Array<AppealImage> = [new AppealImage()];
}
export class AppealCallout {
  headline: string = '';
  url: string = '';
  body: string = '';
  utm: string = '';
  code: string = '';
  image: AppealImage = new AppealImage();
}
export class AppealCode {
  utm_medium: string;
  utm_source: string;
  audience: string;
  series: number;
  resend: number;
  s_subsrc: string;
}
export class AppealElement {
  tag: string;
  text: string;
  href: string;
  src: string;
}
export class AppealSignoff {
  editor: string;
  funDev: string;
  web: string;
}

export class AppealImage {
  original: string = '';
  url: string = '';
  code: string = '';
  link: string = '';
  utm: string = '';
  merlinId: string = '';
  brightcoveId: string = '';
  button: string = '';
  caption: string = '';
  captionSize: number = 16;
  captionColor: string = '';
  captionShadow: string = '';
  credit: string = '';
  creditPlacement: string = '';
  creditColor: string = '';
  treatment: string = '';
}
