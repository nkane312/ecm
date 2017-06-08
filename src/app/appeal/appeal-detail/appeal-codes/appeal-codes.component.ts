import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppealCode } from '../../../models/appeal';
import { RestoreService } from '../../../restore.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-appeal-codes',
  templateUrl: './appeal-codes.component.html',
  styleUrls: ['./appeal-codes.component.css'],
  providers: [RestoreService]
})
export class AppealCodesComponent implements OnInit {
  @Output() saved = new EventEmitter<AppealCode>();
  @Output() canceled = new EventEmitter<AppealCode>();
  
  constructor(private restoreService: RestoreService<AppealCode>) {
  }
  private changed = false;
  checkChanged(){
    this.changed = this.restoreService.isChanged();
  }
  @Input()
  set codes(appealCode: AppealCode){
    this.restoreService.setItem(appealCode);
    this.checkChanged();
  }
  get codes(): AppealCode {
    return this.restoreService.getItem();
  }
  save() {
    this.restoreService.setItem(this.codes);
    this.saved.emit(this.codes);
    this.checkChanged();
  }
  cancel() {
    this.restoreService.restoreItem();
    this.canceled.emit(this.codes);
    this.checkChanged();
  }

  ngOnInit() {
    $(function () {
      $('[data-toggle="popover"]').popover({trigger: 'hover', html: true});
    });
  }
}

