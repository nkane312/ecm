import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable()
export class RestoreService<T> {
  originalItem: T;
  currentItem: T;
  setItem(item:T) {
    this.originalItem = this.clone(item);
    this.currentItem = this.clone(item);
  }

  getItem(): T {
    return this.currentItem;
  }

  getOriginal(): T {
    return this.originalItem;
  }

  isChanged(): boolean {
    return !(_.isEqual(this.currentItem,this.originalItem));
    //return !(_.isEqual(_.omit(this.currentItem, _.functions(this.currentItem)), _.omit(this.originalItem, _.functions(this.originalItem))));
  }

  restoreItem(): T {
    this.currentItem = this.clone(this.originalItem);
    return this.getItem();
  }

  clone(item: T): T {
    let temp = _.cloneDeep(item);
    return temp;
  }
}
