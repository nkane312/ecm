import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppealContent, AppealCallout } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';
import { PreviewService } from '../../../preview.service';
import { Template } from '../../../preview.service';
import * as _ from 'lodash';

declare var $: any;

interface JQuery {
  chosen(options?: any): JQuery;
}

@Component({
  selector: 'app-appeal-content',
  templateUrl: './appeal-content.component.html',
  styleUrls: ['./appeal-content.component.css'],
  providers: [RestoreService]
})
export class AppealContentComponent implements OnInit {
  @Output() updated = new EventEmitter<AppealContent>();
  @Output() saved = new EventEmitter<AppealContent>();
  @Output() canceled = new EventEmitter<AppealContent>();
  @Output() imageSaved = new EventEmitter<any>();
  @Output() calloutSaved = new EventEmitter<any>();
  private changed = false;
  private _appealId;

  constructor(private restoreService: RestoreService<AppealContent>, private previewService: PreviewService) {
  }

  checkChanged(){
    this.changed = this.restoreService.isChanged();
    //this.updated.emit(this.content);
  }

  @Input()
  set content(data: AppealContent){
    /*
    if (!this._content.callout){
      this._content.callout = new AppealCallout();
    }
    */
    this.restoreService.setItem(data);
  }
  get content(): AppealContent {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover focus', container: 'app-root', html: true});
    });
    return this.restoreService.getItem();
  }

  private _options;
  @Input()
  set options(data){
    this._options = data;
  }
  get options(){
    return this._options;
  }

  save() {
    this.restoreService.setItem(this.content);
    this.saved.emit(this.content);
    this.checkChanged();
  }
  cancel() {
    this.restoreService.restoreItem();
    this.canceled.emit(this.content);
  }
  onImageSaved(data, i){
    this.content.image[i].url = `http://digital.ifcj.org/appeal-images/${data.edited}?${Date.now()}`;
    this.content.image[i].original = data.original;
    this.save();
  }
  onCalloutSaved(data){
    this.calloutSaved.emit(data);
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover focus', container: 'app-root', html: true});
    });
  }
}
