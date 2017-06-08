import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as Cropper from 'cropperjs';
import { ModalDirective } from 'ng2-bootstrap';
import { AppealImage as ImageMeta, Appeal } from '../../models/appeal';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { AppealService } from '../../appeal.service';

interface ImageChanges {
  crop: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  imageMeta?: ImageMeta;
  height?: number;
  width?: number;
  fileName: string;
}

@Component({
  selector: 'photo-crop',
  templateUrl: './photo-crop.component.html',
  styleUrls: ['./photo-crop.component.css']
})
export class PhotoCropComponent implements OnInit {
  @Output() saved = new EventEmitter<any>();
  private _imageMeta: ImageMeta;
  private appealId: string;
  private _suffix: string;
  private cropper: Cropper;
  private imageChanges: ImageChanges = {
    imageMeta: this._imageMeta,
    crop: {
      x: undefined,
      y: undefined,
      width: undefined,
      height: undefined,
    },
    height: undefined,
    width: undefined,
    fileName: undefined,
  };
  private cropUrl = 'http://' + window.location.hostname + ':3001/crop-image';
  @Input()
  set suffix(num){
    this._suffix = num;
  }
  get suffix(){
    return this._suffix;
  }

  @Input()
  set imageMeta(data: ImageMeta){
    this._imageMeta = data;
    if (data){
      this.updateSize(data.treatment);
    }
    this.imageChanges.imageMeta = this._imageMeta;
  }
  get imageMeta(){
    return this._imageMeta;
  }

  @ViewChild('img') private img;
  @ViewChild('settingsModal') public settingsModal:ModalDirective;
  @ViewChild('cropModal') public cropModal:ModalDirective; 

  constructor(private appealService: AppealService, private http: Http) {
    this.appealService.getCurrentAppeal().subscribe(
      data => this.appealId = data._id
    );
  }

  ngOnInit() {
    
  }

  /* Modal Functions */

  public showSettingsModal(){
    this.cropModal.hide();
    this.settingsModal.show();
  }
  private showCropModal(){
    this.settingsModal.hide();
    this.cropModal.show();
  }

  private c = false;
  private checkOriginal(){
    if (!this.c){
      if (this._imageMeta.original){
        this.c = true;
        this.createCropper(this._imageMeta.original);
      }
    }
    else {
      this.c = false;
    }
  }

  public cancel(){
    this.cropModal.hide();
    this.settingsModal.hide();
    if (this.cropper){
      this.cropper.destroy();
    }
  }

  /* Called from template when image is uploaded */
  createCropper(fileName){
    if (this.cropper){
      this.cropper.destroy();
    }
    this.img.nativeElement.src = `http://${window.location.hostname}:3001/assets/appeal-images/` + fileName + '?' + Date.now();
    this.imageChanges.fileName = fileName;

    this.cropper = new Cropper(this.img.nativeElement, {
      aspectRatio: this.aspectRatio(this.imageChanges.width, this.imageChanges.height),
      crop: (e) => {
        this.imageChanges.crop.x = e.detail.x;
        this.imageChanges.crop.y = e.detail.y;
        this.imageChanges.crop.width = e.detail.width;
        this.imageChanges.crop.height = e.detail.height;
      },
      viewMode: 1
    });
  }

  /* Updates the aspect ratio of the cropper */
  updateSize(val){
    switch(val){
      case 'polaroid':
        this.imageChanges.width = 306;
        this.imageChanges.height = 238;
        break;
      case 'small':
        this.imageChanges.width = 313;
        this.imageChanges.height = 329;
        break;
      case 'large':
        this.imageChanges.width = 650;
        this.imageChanges.height = 391;
        break;
       case 'promoHeader':
        this.imageChanges.width = 580;
        this.imageChanges.height = 300;
        break;
      case 'promo':
        this.imageChanges.width = 326;
        this.imageChanges.height = 198;
        break;   
      case 'calloutLarge':
        this.imageChanges.width = 650;
        this.imageChanges.height = 150;
        break;
      case 'calloutSmall':
        this.imageChanges.width = 313;
        this.imageChanges.height = 200;
      default:
        this.imageChanges.width = 313;
        this.imageChanges.height = 329;
        break;
    }
  }

  aspectRatio(x, y){
    return x/y;
  }

  saveImage(data){
    this.saved.emit(data);
    this.cancel();
  }

  cropImage(){
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.post(this.cropUrl, this.imageChanges, options).subscribe(
      data => {console.log('image Saved'); this.saveImage({original: this.imageChanges.fileName, edited: data['_body']})},
      err => console.log(err)
    );
  }
}

