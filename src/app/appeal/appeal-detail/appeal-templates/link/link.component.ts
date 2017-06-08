import { Component, OnInit, Input } from '@angular/core';

interface anchorLink {
  url: string,
  style: string,
  innerHTML: string
}

@Component({
  selector: 'app-link',
  templateUrl: 'link.component.html',
  styleUrls: ['link.component.css']
})
export class LinkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() anchor: anchorLink;

}
