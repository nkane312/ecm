import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;
  title = 'eAppeal Campaign Manager';
  public constructor(viewContainerRef:ViewContainerRef){
    this.viewContainerRef = viewContainerRef;
  }
}
