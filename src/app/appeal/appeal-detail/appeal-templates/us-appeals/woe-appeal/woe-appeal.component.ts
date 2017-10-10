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
  selector: 'woe-appeal',
  templateUrl: './woe-appeal.component.html',
  styleUrls: ['./woe-appeal.component.css']
})
export class WOEAppealComponent {
  preview: any;
  private version: any = {};
  private appeal: Appeal;
  private _appealSub$;
  private body;
  private template = new TemplateCodes();

  constructor(
    private campaignService: CampaignService,
    private appealService: AppealService,
    private sanitizer: DomSanitizer
  ) {
    this._appealSub$ = this.appealService.currentAppeal$;
    this._appealSub$.subscribe(data => {
      if (data) {
        this.appeal = data;
        this.body = this.template.generateBody(this.appeal);

        this.body.html.forEach((item, index) => {
          if (
            this.appeal.content.linkColor === undefined ||
            this.appeal.content.linkColor === null ||
            this.appeal.content.linkColor === '' ||
            this.appeal.content.linkColor === 'blue-links'
          ) {
            item = item.replace(/<a\s/g, '<a style="text-decoration:none; font-weight:bold; color:#00529c;"');
          } else {
            item = item.replace(/<a\s/g, '<a style="text-decoration:none; font-weight:bold; color:#a61d26;"');
          }
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

  private htmlStyle = `
        @media only screen{
          html{
            min-height:100%;
            background:#f3f3f3
          }
        }
        @media only screen and (max-width:596px){
          .small-float-center{
            margin:0 auto!important;
            float:none!important;
            text-align:center!important
          }
        }
        @media only screen and (max-width:596px){
          table.body img{
            width:auto;height:auto
          }
          table.body center{
            min-width:0!important
          }
          table.body .container{
            width:95%!important
          }
          table.body .columns{
            height:auto!important;
            -moz-box-sizing:border-box;
            -webkit-box-sizing:border-box;
            box-sizing:border-box;
            padding-left:16px!important;
            padding-right:16px!important
          }
          table.body .columns .columns{
            padding-left:0!important;
            padding-right:0!important
          }
          table.body .collapse .columns{
            padding-left:0!important;
            padding-right:0!important
          }
          th.small-6{
            display:inline-block!important;
            width:50%!important
          }
          th.small-12{
            display:inline-block!important;
            width:100%!important
          }
          .columns th.small-12{
            display:block!important;
            width:100%!important
          }
          table.menu{
            width:100%!important
          }
          table.menu td,table.menu th{
            width:auto!important;
            display:inline-block!important
          }
          table.menu.small-vertical td,table.menu.small-vertical th,table.menu.vertical td,table.menu.vertical th{
            display:block!important
          }
          table.menu[align=center]{
            width:auto!important
          }
        }
        @media only screen {
            html {
                min-height: 100%;
                background: #f3f3f3
            }
        }
        
        @media only screen and (max-width:596px) {
            .small-float-center {
                margin: 0 auto!important;
                float: none!important;
                text-align: center!important
            }
        }
        
        @media only screen and (max-width:596px) {
            table.body img {
                width: auto;
                height: auto
            }
            table.body center {
                min-width: 0!important
            }
            table.body .container {
                width: 95%!important
            }
            table.body .columns {
                height: auto!important;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                padding-left: 16px!important;
                padding-right: 16px!important
            }
            table.body .columns .columns {
                padding-left: 0!important;
                padding-right: 0!important
            }
            table.body .collapse .columns {
                padding-left: 0!important;
                padding-right: 0!important
            }
            th.small-6 {
                display: inline-block!important;
                width: 50%!important
            }
            th.small-12 {
                display: inline-block!important;
                width: 100%!important
            }
            .columns th.small-12 {
                display: block!important;
                width: 100%!important
            }
            table.menu {
                width: 100%!important
            }
            table.menu td,
            table.menu th {
                width: auto!important;
                display: inline-block!important
            }
            table.menu.small-vertical td,
            table.menu.small-vertical th,
            table.menu.vertical td,
            table.menu.vertical th {
                display: block!important
            }
            table.menu[align=center] {
                width: auto!important
            }
        }
        .red-btn {
          background-color: #9a0000 !important;
          border: 0px solid #9a0000 !important;
        }
        .orange-btn {
          background-color: #e48c1b !important;
          border: 0px solid #e48c1b !important;
        }
  `;

  ngOnInit() {}
  ngOnDestory() {
    if (this._appealSub$) {
      this._appealSub$.unsubscribe();
    }
  }
}
