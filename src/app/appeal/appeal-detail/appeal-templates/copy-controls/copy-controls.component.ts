import { Component, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'copy-controls',
  templateUrl: './copy-controls.component.html',
  styleUrls: ['./copy-controls.component.css']
})
export class CopyControlsComponent {
  @Input() htmlVersion;
  @Input() plainVersion;
  @Input() htmlStyle;
  copyHtml(){
    
    var temp = document.createElement('input');
    var hidden = document.querySelector('#hidden');
    hidden.appendChild(temp);
    if (this.htmlStyle){
      var style = document.createElement('style');
      style.innerHTML = this.htmlStyle;
      this.htmlVersion.getElementsByTagName('head')[0].appendChild(style);
    }

    temp.value = this.htmlVersion.innerHTML.toString();
    temp.value = temp.value.replace(/_ngcontent\S+"/g, '');
    temp.value = temp.value.replace(/ng-reflect-href\S+\s/g, '');
    temp.value = temp.value.replace(/ng-reflect-src\S+"/g, '');
    temp.value = temp.value.replace(/ng-reflect-inner-h-t-m-l=".[^"]+"/g, '');
    temp.value = temp.value.replace(/&amp;/g, '&');
    temp.value = temp.value.replace(/–/g, '&ndash;');
    temp.select();

    try {
      let success = document.execCommand('copy');
    } catch (err) {
      console.log(err);
    }

    window.getSelection().removeAllRanges();
    while (hidden.hasChildNodes()) {
      hidden.removeChild(hidden.lastChild);
    }
    if (this.htmlStyle){
      this.htmlVersion.getElementsByTagName('head')[0].removeChild(style);
    }
  }

  copyPlain(){
    var plainTemp = document.createElement('textarea');
    var hidden = document.querySelector('#hidden');
    hidden.appendChild(plainTemp);

    plainTemp.value = this.plainVersion.innerText;
    plainTemp.value = plainTemp.value.replace(/–/g, '-');
    plainTemp.select();
    try {
      let success = document.execCommand('copy');
    } catch(err){
      console.log(err);
    }
    window.getSelection().removeAllRanges();
    while (hidden.hasChildNodes()) {
      hidden.removeChild(hidden.lastChild);
    }
  }
}