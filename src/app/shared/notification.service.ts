import { Injectable } from '@angular/core';
import {ToastService} from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastService) {

  }
  isSuccess(message) {
    this.toastrService.success(message);
  }

  isError(message){
    this.toastrService.error(message);
  }
}
