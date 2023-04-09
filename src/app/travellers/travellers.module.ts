import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QRCodeModule } from "angularx-qrcode";

import { TravellersRoutingModule } from "./travellers-routing.module";
import { AddComponent } from "./add/add.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ListComponent } from "./list/list.component";
import {
  InputsModule,
  ModalModule,
  PreloadersModule,
  TableModule,
  DatepickerModule,
  TabsModule,
  BadgeModule,
  StepperModule,
} from "ng-uikit-pro-standard";
import { TravellersService } from "./travellers.service";
import { CountriesService } from "../countries.service";
import { DetailsComponent } from "./details/details.component";
//import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AuthenticationService } from "../auth/authentication.service";
import { UpdateAddressComponent } from "./update-address/update-address.component";
//import { Ng2TelInputModule } from 'ng2-tel-input';

//const maskConfig: Partial<IConfig> = {  validation: false,};
//export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
//const maskConfigFunction: () => Partial<IConfig> = () => {
//  return {
//   validation: false,
// };
//};

@NgModule({
  declarations: [
    AddComponent,
    DashboardComponent,
    ListComponent,
    DetailsComponent,
    UpdateAddressComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    TableModule,
    ModalModule,
    PreloadersModule,
    DatepickerModule,
    BadgeModule,
    InputsModule,
    StepperModule,
    TabsModule.forRoot(),
    //NgxMaskModule.forRoot(maskConfigFunction),
    TravellersRoutingModule,
    QRCodeModule,
  ],
  exports: [AddComponent],
  providers: [TravellersService, AuthenticationService, CountriesService],
})
export class TravellersModule {}
