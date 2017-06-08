import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, BehaviorSubject, Subject } from 'rxjs/Rx';

import { AppealService } from '../../appeal.service';
import { PreviewService, Template } from '../../preview.service';
import { Appeal, AppealImage } from '../../models/appeal';
import { Settings } from '../../models/settings';

@Component({
  selector: 'app-appeal-detail',
  templateUrl: './appeal-detail.component.html',
  styleUrls: ['./appeal-detail.component.css'],
})
export class AppealDetailComponent implements OnInit {
  private appeal: Appeal;
  private template: string;
  private settings: Settings = new Settings();
  private groupId: string;
  private relatedAppeals: Array<Appeal> = [];
  private _currentAppeal$: Observable<Appeal>;
  private _appealSub: Subscription;
  private _routeSub: Subscription;
  private _groupSub: Subscription;
  private options: any;

  constructor(private appealService: AppealService, private route: ActivatedRoute, private router: Router, private previewService: PreviewService) {
    this.settings.campaign = false;
    this.settings.sendDate = false; 
    this.settings.delete = false;
    this.settings.active = '';
  }
  checkTemplate(tmpl){
    if (this.template !== tmpl){
      this.template = tmpl;
      this.setOptions();
      this.router.navigate(['/appeal', this.appeal._id, tmpl]);
    }
    else {
      this.setOptions();
    }
  }
  onInfoSaved(data) {
    this.appeal.info = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
    this.checkTemplate(data.template);
  }
  onInfoCanceled(data) {
    this.appeal.info = data;
    this.previewService.appeal.next(this.appeal);
  }

  onContentSaved(data) {
    this.appeal.content = data;
    console.log('updating Appeal');
    console.log(this.appeal);
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onContentCanceled(data) {
    this.appeal.content = data;
    this.previewService.appeal.next(this.appeal);
  }
  onContentUpdated(data){
    console.log(data);
    this.appeal.content = data;
    //this.appealService.updateCurrentAppeal(this.appeal);
  }

  onCodesSaved(data) {
    this.appeal.codes = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onCodesCanceled(data){
    this.appeal.codes = data;
    this.previewService.appeal.next(this.appeal);
  }

  onSignoffsSaved(data) {
    this.appeal.signoffs = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onSignoffsCanceled(data) {
    this.appeal.signoffs = data;
    this.previewService.appeal.next(this.appeal);
  }

  onNotesSaved(data) {
    this.appeal.notes = data;
    this.appealService.updateAppeal(this.appeal);
    this.previewService.appeal.next(this.appeal);
  }
  onNotesCanceled(data) {
    this.appeal.notes = data;
    this.previewService.appeal.next(this.appeal);
  }


  onImageSaved(data){
    /*
    let image$ = this.appealService.uploadImage(data, this.appeal._id);
    image$.subscribe(
      data => {
        if (data.status === 200){
          this.appeal.content.image.map(function(img, index){
            return img.url = `http://digital.ifcj.org/appeal-images/${this.appeal._id + index}.jpg?${Date.now()}`;
          });
          this.appealService.updateAppeal(this.appeal);
          this.previewService.appeal.next(this.appeal);
        }
        else {
          console.log(data);
        }
      },
      err => console.log(err)
    );
    */
  }
  onCalloutSaved(data){
    /*
    let callout$ = this.appealService.uploadImage(data, this.appeal._id + 'cta');
    callout$.subscribe(
      data => {
        if (data.status === 200){
          this.appeal.content.callout.image.url = `http://digital.ifcj.org/appeal-images/${this.appeal._id}cta.jpg?${Date.now()}`;
          this.appealService.updateAppeal(this.appeal);
          this.previewService.appeal.next(this.appeal);
        }
        else {
          console.log(data);
        }
      },
      err => console.log(err)
    );
    */
  }

  onAppealDuplicated(data){
    this.groupSubscription(data);
  }
  
  setAppeal(qs) {
    if (qs.hasOwnProperty('appealId')) {
      this.appealService.setCurrentAppeal(qs.appealId);
    }
  }
  currentAppealSubscription(){
    if (!this._currentAppeal$){
      console.warn('A subscription is being made to _currentAppeal$');
      this._currentAppeal$ = this.appealService.getCurrentAppeal();
      this._appealSub = this._currentAppeal$.subscribe(data => {
        if (data){
          this.appeal = data;
          if (!Array.isArray(this.appeal.content.image)){
            this.appeal.content.image = [this.appeal.content.image];
          }
          if (!this.template){
            this.template = data.info.template;
            this.setOptions();
          }
          else {
            this.checkTemplate(data.info.template);
          }
          
          this.groupId = data.info.group;
          if (this.appeal._id) {
            this.settings.active = this.appeal._id;
          }
          this.previewService.appeal.next(this.appeal);
          if (this.groupId){
            this.groupSubscription(this.groupId);
          }
        }
      });
    }
  }

  setOptions(){
    this.options = this.previewService.findTemplate(this.template);
    if(this.options.image.length > this.appeal.content.image.length) {
      for (let i = 0; i < this.options.image.length; i++){
        if(!this.appeal.content.image[i]){
          this.appeal.content.image.push(new AppealImage());
        }
      }
    }
  }

  ngOnInit() {
    if (!this._routeSub){
      console.warn('A subscription is being made to route.params');

      this._routeSub = this.route.params
      .subscribe(queryString => {
        this.setAppeal(queryString);
        this.currentAppealSubscription();
      });
    }
  }

  groupSubscription(id){
    if (!this._groupSub){
      this._groupSub = this.appealService.getAppeals().flatMap(a => {this.relatedAppeals = []; return a;}).filter(function(appeal: Appeal, index: Number){
        if (appeal.info.group === id){
          return true;
        }
        else {
          return false;
        }
      }).subscribe(
        data => { this.relatedAppeals.push(data); }
      );
    }
  }

  ngOnDestroy(){
    if(this._routeSub){
      console.info('unsubscribing from _routeSub');
      this._routeSub.unsubscribe();
    }
    if(this._groupSub){
      console.info('unsubscribing from _groupSub');
      this._groupSub.unsubscribe();
    }
    if(this._currentAppeal$){
      console.info('unsubscribing from _currentAppeal$');
      this._appealSub.unsubscribe();
    }
  }

}
