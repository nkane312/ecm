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
  selector: 'app-fast-appeal',
  templateUrl: './fast-appeal.component.html',
  styleUrls: ['./fast-appeal.component.css']
})
export class FastAppealComponent {
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
          item = item.replace(/<a\s/g, '<a style="color:#5D3888; text-decoration:none; font-weight:bold;" ');
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
