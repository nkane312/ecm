import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { RestoreService } from '../../../restore.service';
import { AppealSignoff } from '../../../models/appeal';

@Component({
  selector: 'app-appeal-signoffs',
  templateUrl: './appeal-signoffs.component.html',
  styleUrls: ['./appeal-signoffs.component.css'],
  providers: [RestoreService]
})
export class AppealSignoffsComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealSignoff>();
  @Output() canceled = new EventEmitter<AppealSignoff>();
  private changed = false;
  private _signoffs: AppealSignoff;
  constructor(private restoreService: RestoreService<AppealSignoff>) { }
  checkChanged(){
    if (_.isEqual(this.signoffs, this._signoffs)){
      this.changed = false;
    }
    else {
      this.changed = true
    };
  }
  @Input()
  set signoffs(data: AppealSignoff){
    this._signoffs = data;
    this.restoreService.setItem(data);
    this.checkChanged();
  }
  get signoffs(): AppealSignoff {
    return this.restoreService.getItem();
  }
  save() {
    this.restoreService.setItem(this._signoffs);
    this.saved.emit(this._signoffs);
    this.checkChanged();
  }
  cancel() {
    this._signoffs = this.restoreService.restoreItem();
    this.canceled.emit(this._signoffs);
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', container: 'body', html: true});
    });
  }
}
