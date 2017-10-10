var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Campaign = require('./campaign.js');
var Group = require('./group.js');

var imageSchema = new Schema({
  original: { type: String, default: '' },
  url: { type: String, default: '' },
  link: { type: String, default: '' },
  code: { type: String, default: 'PH1' },
  utm: { type: String, default: 'photo-link-1' },
  merlinId: { type: String, default: '' },
  brightcoveId: { type: String, default: '' },
  button: { type: String, default: '' },
  caption: { type: String, default: '' },
  captionSize: { type: Number, default: 22 },
  captionColor: { type: String, default: '' },
  captionShadow: { type: String, default: '' },
  credit: { type: String, default: '' },
  creditPlacement: { type: String, default: '' },
  creditColor: { type: String, default: '' },
  treatment: { type: String, default: '' }
});

var calloutSchema = new Schema({
  headline: { type: String, default: '' },
  url: { type: String, default: '' },
  body: { type: String, default: '' },
  image: imageSchema,
  utm: { type: String, default: '' },
  code: { type: String, default: '' }
});

var appealSchema = new Schema({
  info: {
    name: { type: String, default: '' },
    template: { type: String, default: '' },
    sender: { type: String, default: '' },
    senderAddress: { type: String, default: '' },
    subjectLine: { type: String, default: '' },
    campaign: {
      _id: { type: Schema.Types.ObjectId, ref: 'Campaign' },
      name: String,
      utm: String,
      country: String,
      templates: Array,
      __v: Number
    },
    sendDate: { type: Date, default: new Date() },
    scheduled: { type: Boolean, default: false },
    group: { type: String, default: '' },
    groupName: { type: String, default: '' }
  },
  content: {
    url: { type: String, default: '' },
    body: [{ type: String, default: '' }],
    callout: calloutSchema,
    customSignature: { type: String, default: '' },
    image: [imageSchema],
    donateButton: { type: String, default: 'Donate Now' },
    donateColor: { type: String, default: 'red-btn' },
    linkColor: { type: String, default: 'blue-links' }
  },
  codes: {
    utm_medium: { type: String, default: 'email' },
    utm_source: { type: String, default: 'eappeal' },
    audience: { type: String, default: '' },
    resend: { type: Number, default: 1 },
    series: { type: Number, default: 1 },
    s_subsrc: { type: String, default: '' }
  },
  signoffs: {
    web: { type: String, default: '' },
    funDev: { type: String, default: '' },
    editor: { type: String, default: '' }
  },
  notes: { type: String, default: '' }
});
module.exports = mongoose.model('Appeal', appealSchema);
