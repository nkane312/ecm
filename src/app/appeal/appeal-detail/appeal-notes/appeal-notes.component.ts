import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { RestoreService } from '../../../restore.service';

@Component({
  selector: 'app-appeal-notes',
  templateUrl: './appeal-notes.component.html',
  styleUrls: ['./appeal-notes.component.css'],
  providers: [RestoreService]
})
export class AppealNotesComponent implements OnInit {
  @Output() saved = new EventEmitter<String>();
  @Output() canceled = new EventEmitter<String>();
  private _notes: String;
  constructor(private restoreService: RestoreService<String>) { }
  private changed = false;

  checkChanged(){
    if (_.isEqual(this.notes, this._notes)){
      this.changed = false;
    }
    else {
      this.changed = true
    };
  }

  @Input()
  set notes(data: String){
    this._notes = data;
    this.restoreService.setItem(data);
    this.checkChanged();
  }
  get notes(): String {
    return this.restoreService.getItem();
  }
  save() {
    this.restoreService.setItem(this._notes);
    this.saved.emit(this._notes);
    this.checkChanged();
  }
  cancel() {
    this._notes = this.restoreService.restoreItem();
    this.canceled.emit(this._notes);
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', html: true});
    });
  }
}
