import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs/Rx';

import { AppealContent, AppealCode, Appeal } from '../../../../../models/appeal';
import { Campaign } from '../../../../../models/campaign';
import { CampaignService } from '../../../../../campaign.service';
import { AppealService } from '../../../../../appeal.service';
import { PlainTextPipe } from '../../../../../plain-text.pipe';
import { RemoveHtmlPipe } from '../../../../../remove-html.pipe';

import { TemplateCodes } from '../../template.controller';

@Component({
  selector: 'store-email',
  templateUrl: './store-email.component.html',
  styleUrls: ['./store-email.component.css']
})
export class StoreEmailComponent {
  preview: any;
  private version: any = {};
  private appeal: Appeal;
  private _appealSub$;
  private body;
  private template = new TemplateCodes();

  constructor(private campaignService: CampaignService, private appealService: AppealService, private sanitizer: DomSanitizer) {
    this._appealSub$ = this.appealService.currentAppeal$;
    this._appealSub$.subscribe(data => {
      if (data){
        this.appeal = data;
        this.body = this.template.generateBody(this.appeal);

        this.body.html.forEach((item, index) => {
          item = item.replace(/<a\s/g, '<a style="color:#00529c; text-decoration:none; font-weight:bold;" ');
          this.body.html[index] = sanitizer.bypassSecurityTrustHtml(item);
        });
        this.body.plain.forEach((item, index) => {
          this.body.plain[index] = sanitizer.bypassSecurityTrustHtml(item);
        });
      }
    });
  }

  @ViewChild('htmlVersion') htmlVersion: ElementRef;
  @ViewChild('plainVersion') plainVersion: ElementRef;

  ngOnInit(){
  }
  ngOnDestory(){
    if (this._appealSub$){
      this._appealSub$.unsubscribe();
    }
  };
}
