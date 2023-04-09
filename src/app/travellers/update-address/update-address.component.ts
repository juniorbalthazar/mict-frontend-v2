import { Component, OnInit } from '@angular/core';
import { GeoService } from 'src/app/shared/geo.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TravellersService } from '../travellers.service';
import { turnState } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { UtilitiesService } from 'src/app/utilities.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent implements OnInit {
  dept: Observable<any[]>;
  commune: Observable<any[]>;
  addressForm: FormGroup;
  submitted = false;
  ifSerialExist = false;
  response: any;
  loading = false;
  constructor(
    private geo: GeoService,
    private formBuilder: FormBuilder,
    private traverllerServce: TravellersService,
    private router: Router,
    private tools: UtilitiesService,
    private toast: NotificationService,
  ) { }

  ngOnInit(): void {
    this.dept = this.geo.departements();
    this.addressForm = this.formBuilder.group({
      communeId: ['', Validators.required],
      departementId: ['', Validators.required],
      documentSerial: ['', Validators.required],
      streetAddress: ['', Validators.required],
    });
  }

  ifDeptLieuSelected(event) {
    if (event) {
      this.addressForm.get('communeId').setValue(null);
      this.commune = this.geo.communes(event.code);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }
    this.traverllerServce.updateAddress(
      this.addressForm.get('communeId').value,
      this.addressForm.get('departementId').value,
      this.addressForm.get('documentSerial').value,
      this.addressForm.get('streetAddress').value).subscribe(
      res => {
        const respons: any  = res;
        if (respons.success) {
          this.loading = false;
          this.router.navigate(['/']);
          this.toast.isSuccess('Address has been updated successfully');
        } else {
          this.loading = false;
          this.toast.isError('une erreur s\'est produite au moment de la soumission du formulaire !');
        }
      }, err => {
        this.loading = false;
        this.toast.isError('une erreur s\'est produite au moment de la soumission du formulaire !');
      }
    );
  }

  checkDocument(event) {
    this.traverllerServce.checkDocumentSerial(event.target.value).subscribe(
      res => {
        this.response = res;
        if (!this.response.success) {
          this.ifSerialExist = true;
        } else {
          this.ifSerialExist = false;
        }
      }
    );
  }

}
