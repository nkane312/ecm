import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  private _fileName: string;
  private _imageUrl = 'http://' + window.location.hostname + ':3001/image-upload';
  private loading = false;
  private _suffix = '';

  @Input()
  set suffix(s){
    this._suffix = s;
  }
  get suffix(){
    return this._suffix;
  }

  @Input() 
  set fileName(name){
    this._fileName = name;
  }
  get fileName(){
    return this._fileName;
  }

  @Output() onLoaded = new EventEmitter<any>();

  constructor(private http: Http) { }
  
  ngOnInit() {
  }

  fileChosen(input){
    this.loading = true;
    var file = input.target.files[0];
    let formData = new FormData();
    if (file){
      let extension = file.name.toLowerCase().match(/\.(jpg|png|gif|bmp|svg)$/);
      let fileName = this._fileName + this._suffix + extension[0];
      formData.append('image', file, fileName);
      let headers = new Headers({
        'Accept': 'application/json'
      });
      let options = new RequestOptions({ headers: headers });
      this.http.post(this._imageUrl, formData, options)
        .subscribe(
          data => {console.log(data); this.loading = false; this.onLoaded.emit(fileName)},
          error => {console.log(error); this.loading = false;}
        );
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body.data);
    return body.data || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
