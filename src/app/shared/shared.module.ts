import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonsModule, IconsModule, ToastModule, WavesModule} from 'ng-uikit-pro-standard';
import {NotificationService} from './notification.service';



@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    IconsModule,
    ButtonsModule
  ],
  exports: [
    TranslateModule,
    WavesModule,
    IconsModule,
    ButtonsModule
  ],
  providers: [NotificationService]
})
export class SharedModule { }
