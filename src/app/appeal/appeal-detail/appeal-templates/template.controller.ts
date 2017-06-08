import { PlainTextPipe } from '../../../plain-text.pipe';
import { RemoveHtmlPipe } from '../../../remove-html.pipe';
import { AppealContent, AppealCode, Appeal } from '../../../models/appeal';
import { Campaign } from '../../../models/campaign';

import * as _ from 'lodash';
declare var $: any;

interface JQuery {
  chosen(options?: any): JQuery;
}

export class TemplateCodes {
private version: any;
private appeal: Appeal;
private linkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
private textLinkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };

public generateBody(appeal) {
    this.appeal = appeal;
    let version = {};
    let html = _.clone(this.appeal.content.body);
    let plain = _.clone(this.appeal.content.body);
    var self = this;

    if (this.appeal.info.campaign) {
      this.setVersion();
      html.forEach(function(h, i){

        if (h === undefined || h === null) {
          h = '';
        }
        h = h.replace(/<a[\s]{1,}href="(.[^"]{1,})">/g, function(url, g1){
          let linkWithCodes = self.addCodes(g1, 'TL', 'html');
          let linkNoCodes = g1;
          if (g1 === 'http://fellowship.ifcj.org/site/TellAFriend') {
            return `<a href="${linkNoCodes}">`;
          } else if (g1 === 'mailto:') {
            return `<a href="${linkNoCodes}">`
          } else {
            return `<a href="${linkWithCodes}">`;
          }
        });
        html[i] = h;
      });

      plain.forEach(function(p, i){
        if (p === undefined || p === null) {
          p = '';
        }
        p = p.replace(/<a[\s]{1,}href="(.[^"]{1,})">/g, function(url, g1){
          let linkWithCodes = self.addCodes(g1, 'TL', 'plain');
          let linkNoCodes = g1;
          if (g1 === 'http://fellowship.ifcj.org/site/TellAFriend') {
            return `<a href="${linkNoCodes}">`;
          } else {
            return `<a href="${linkWithCodes}">`;
          }        });
        plain[i] = p;
      });
      plain = plain.map((p) => {
        return p = new PlainTextPipe().transform(p);
      });

      /*
      $(html)
        .find('a').each(function() {
          let url = $(this).attr('href');
          url = self.addCodes(url, 'TL', 'html');
          $(this).attr('href', url);
          $(this).css({
            'color': '#00529c',
            'textDecoration': 'none',
            'fontWeight': 'bold'
          });
        });
      
      $(plain)
        .find('a').each(function() {
          let url = $(this).attr('href');
          url = self.addCodes(url, 'TL', 'plain');
          $(this).attr('href', url);
        });
        */
    }
    
    this.linkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
    this.textLinkCount = { buttonLink: 1, footerLink: 1, textLink: 2, photoLink: 1, videoLink: 1, audioLink: 1, headerLink: 1 };
    return {html, plain};
  }

  private setVersion() {
    this.version = { src: '', utm: (this.appeal.info.campaign.utm || '') + '-' + (this.appeal.codes.series || '1') };
    if (this.appeal.codes.resend > 1) {
      this.version.utm += '-rs';
    }

    if (this.appeal.codes.audience === 'sustainer') {
      this.version.src = '_S';
      this.version.utm += '-sus';
    }
    else if (this.appeal.codes.audience === 'donor') {
      this.version.src = '';
      this.version.utm += '-d';
    }
    else if (this.appeal.codes.audience === 'nonDonor') {
      this.version.src = '_N';
      this.version.utm += '-nd';
    }
    else if (this.appeal.codes.audience === 'middleDonor') {
      this.version.src = '';
      this.version.utm += '-md';
    }
    else {
      this.version.utm += '-reg';
    }
  }
  public addUtmOnly(url: string, utmContent: string, emailType: string): string {
    if (url && this.appeal.hasOwnProperty('_id')) {
      var hasQuestionMark = url.search('\\?');
      if (hasQuestionMark < 0) {
        url += '?';
      }
      url += '&utm_medium=' + (this.appeal.codes.utm_medium || '');
      url += '&utm_source=' + (this.appeal.codes.utm_source || '');
      url += '&utm_campaign=' + (this.appeal.info.campaign.utm || '');
      url += '&autologin=true';
      url += '&utm_content=' + (this.version.utm || '') + '-' + (emailType || '') + '-' + (utmContent || '');
      return url;
    }
    else {
      return 'URL not set';
    }
  }
  public addCodes(url: string, linkType: any, emailType: string): string {
    if (url && this.appeal.hasOwnProperty('_id')) {
      var hasQuestionMark = url.search('\\?');
      if (hasQuestionMark < 0) {
        url += '?';
      }
      if (emailType === 'html') {
        if (linkType === 'TL') {
          linkType = { src: 'TL' + this.linkCount.textLink, utm: 'text-link-' + this.linkCount.textLink };
          this.linkCount.textLink++;
        }
        else if (linkType === 'FT') {
          linkType = { src: 'FT' + this.linkCount.footerLink, utm: 'footer-link-' + this.linkCount.footerLink };
          this.linkCount.footerLink++;
        }
        else if (linkType === 'PH') {
          linkType = { src: 'PH' + this.linkCount.photoLink, utm: 'photo-link-' + this.linkCount.photoLink };
          this.linkCount.photoLink++;
        }
        else if (linkType === 'VID') {
          linkType = { src: 'VID' + this.linkCount.videoLink, utm: 'video-link-' + this.linkCount.videoLink };
          this.linkCount.videoLink++;
        }
        else if (linkType === 'AUD') {
          linkType = { src: 'AUD' + this.linkCount.audioLink, utm: 'audio-link-' + this.linkCount.audioLink };
          this.linkCount.audioLink++;
        }
        else if (linkType === 'BN') {
          linkType = { src: 'BN' + this.linkCount.buttonLink, utm: 'button-link-' + this.linkCount.buttonLink };
          this.linkCount.buttonLink++;
        }
        url = this.addSource(url, linkType);
      }
      else if (emailType === 'plain') {
        if (linkType === 'TL') {
          linkType = { src: 'TL' + this.textLinkCount.textLink, utm: 'text-link-' + this.textLinkCount.textLink };
          this.textLinkCount.textLink++;
        }
        else if (linkType === 'FT') {
          linkType = { src: 'FT' + this.textLinkCount.footerLink, utm: 'footer-link-' + this.textLinkCount.footerLink };
          this.textLinkCount.footerLink++;
        }
        else if (linkType === 'PH') {
          linkType = { src: 'PH' + this.textLinkCount.photoLink, utm: 'photo-link-' + this.textLinkCount.photoLink };
          this.textLinkCount.photoLink++;
        }
        else if (linkType === 'VID') {
          linkType = { src: 'VID' + this.textLinkCount.videoLink, utm: 'video-link-' + this.textLinkCount.videoLink };
          this.textLinkCount.videoLink++;
        }
        else if (linkType === 'AUD') {
          linkType = { src: 'AUD' + this.textLinkCount.audioLink, utm: 'audio-link-' + this.textLinkCount.audioLink };
          this.textLinkCount.audioLink++;
        }
        else if (linkType === 'BN') {
          linkType = { src: 'BN' + this.textLinkCount.buttonLink, utm: 'button-link-' + this.textLinkCount.buttonLink };
          this.textLinkCount.buttonLink++;
        }
        url = this.addSource(url, linkType);
      }

      url = this.addStaticCodes(url);
      url += '&utm_content=' + (this.version.utm || '') + '-' + (emailType || '') + '-' + (linkType.utm || '');
      return url;
    }
    else {
      return 'loading or URL not set';
    }
  }

  private addSource(url, linkType) {
    url += '&s_src=EM' + (this.appeal.codes.resend || '1') + linkType.src + this.version.src;
    return url;
  }

  private addStaticCodes(url) {
    url += '&s_subsrc=' + (this.appeal.codes.s_subsrc || '');
    url += '&utm_medium=' + (this.appeal.codes.utm_medium || '');
    url += '&utm_source=' + (this.appeal.codes.utm_source || '');
    url += '&utm_campaign=' + (this.appeal.info.campaign.utm || '');
    url += '&autologin=true';
    return url;
  }
    public escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

}
