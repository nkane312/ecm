import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppealService } from '../../appeal.service';
import { RestoreService } from '../../restore.service';
import { Appeal } from '../../models/appeal';

@Component({
    selector: 'duplicate-appeal',
    templateUrl: './duplicate-appeal.component.html',
    styleUrls: ['./duplicate-appeal.component.css']
})
export class DuplicateAppealComponent implements OnInit {
    @Input() appeal: Appeal;
    @Output() groupEmitter = new EventEmitter<String>();
    constructor(private appealService:AppealService, private restoreService: RestoreService<Appeal>){

    }

    duplicate(){
        console.log(this.appeal.info.group);
        if (this.appeal.info.group === '' || this.appeal.info.group === undefined){
            this.appeal.info.group = this.appeal._id;
            this.appealService.updateAppeal(this.appeal);
        }
        let appealCopy = this.restoreService.clone(this.appeal);
        appealCopy.info.scheduled = false;
        appealCopy.signoffs.editor = '';
        appealCopy.signoffs.web = '';
        appealCopy.signoffs.funDev = '';
        this.appealService.addAppeal(appealCopy);
        this.groupEmitter.emit(appealCopy.info.group);
    }
    ngOnInit(){
    }
}