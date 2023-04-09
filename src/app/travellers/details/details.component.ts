import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TravellersService} from '../travellers.service';
import {ModalModule} from 'ng-uikit-pro-standard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../shared/notification.service';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  @ViewChild ('temperatureModal') public temperatureModal: any;
  @ViewChild('noteModal') public noteModal: any;
  @ViewChild('approuved') public approuved: any;
  @ViewChild('refuse') public refuse: any;

  temForm: FormGroup;
  noteForm: FormGroup;
  rejectForm: FormGroup;
  isTemSubmit = false;
  isNoteSubmit = false;
  isRejectSubmit = false;
  isAdmin = false;
  isAgent = false;
  isSupervisor = false;
  respons: any;
  traveller: any;
  id: any;
  error = '';
  pdfSrc: any;
  loginUser: any;
  pdfSrcDoc: any;
  userRole;
  user: any;
  loading = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private travellersService: TravellersService,
    private modal: ModalModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: NotificationService,
    private authenticationService: AuthenticationService,
    private toast: NotificationService) { }

  ngOnInit(): void {
    const user: any = JSON.parse(localStorage.getItem('currentUser'))['account'];
    this.userRole = user.role;
    // Subscribe to listen changes of login status
    this.authenticationService.loginStatus.subscribe(
      status => {
        if (status) {
          this.user = this.authenticationService.getUserDetail();
        } else {
          this.user = null;
        }

      }
    );
    // const role: any = this.loginUser;
    // this.userRole = role.account.role;
    // console.log(this.loginUser);
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getDetails();
    });

    this.temForm = this.formBuilder.group({
      mesure: ['', Validators.required],
      degre: ['', Validators.required]
    });

    this.noteForm = this.formBuilder.group({
      note: ['', Validators.required]
    });

    this.rejectForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.loginUser = null;
    this.user = null;
   // this.authenticationService.loginStatus.unsubscribe();
  }

  getDetails() {
    this.loading = true;
    this.travellersService.travellersDetails(this.id)
      .pipe(first())
      .subscribe(data => {
      this.loading = false;
      this.respons = data;
      this.traveller = this.respons?.details?.voyager;
      this.pdfSrcDoc = `${environment.apiUrl}` + '/auth/viewIdentity/' + this.traveller.codeEncode;
      this.pdfSrc = `${environment.apiUrl}` + '/auth/viewtestPCR/' + this.traveller.codeEncode;
    }, error => {
      this.loading = false;
    });
  }

  getIdentityPicture() {
    this.travellersService.identityPicture(this.id).subscribe(data => {
      this.respons = data;
    });
  }

  openTempModal(){
    this.temperatureModal.show();
  }

  closeTemModal(){
    this.temperatureModal.hide();
  }

  openNoteModal(){
    this.noteModal.show();
  }

  closeNoteModal(){
    this.noteModal.hide();
  }

  openApprouvedModal() {
    this.approuved.show();
  }

  closeApprouvedModal() {
    this.approuved.hide();
  }

  openRefuseModal() {
    this.refuse.show();
  }

  closeRefuseModal() {
    this.refuse.hide();
  }


  // convenience getter for easy access to form fields
  get temFormControls() { return this.temForm.controls; }
  get noteFormControls() { return this.noteForm.controls; }

  onTemperatureSubmit() {
    this.isTemSubmit = true;
    // stop here if form is invalid
    if (this.temForm.invalid) {
      return;
    }
    this.travellersService.temperature(this.id, this.temFormControls.degre.value, this.temFormControls.mesure.value)
      // .pipe(first())
      .subscribe(
        data => {
          this.toastService.isSuccess('SUCCESS !');
          this.closeTemModal();
          this.getDetails();
        },
        error => {
          this.error = error;
        });
  }

  onNoteSubmit(){
    this.isNoteSubmit = true;
    // stop here if form is invalid
    if (this.noteForm.invalid) {
      return;
    }

    this.travellersService.note(this.id, this.noteFormControls.note.value)
    // .pipe(first())
      .subscribe(
        data => {
          this.toastService.isSuccess('SUCCESS !');
          this.closeNoteModal();
          this.getDetails();
        },
        error => {
          this.error = error;
        });
  }

  authorizedTraveller(confirmation?: boolean) {
    this.travellersService.accept(this.id, confirmation).subscribe(
      res => {
        this.respons = res;
        console.log(this.respons);
        if (this.respons.success) {
          this.closeApprouvedModal();
          this.toast.isSuccess('Voyageurs a été approuvé avec succes !');
          this.router.navigate(['/travellers/list']);
        }
      }
    );
  }

  onRejectSubmit() {
    this.isRejectSubmit = true;
    if (this.rejectForm.invalid) {
      return;
    }

    this.travellersService.refuse(this.id, true, this.rejectForm.get('reason').value).subscribe(
      res => {
        this.respons = res;
        if (this.respons.success) {
          this.closeRefuseModal();
          this.toast.isError('Voyageurs n\'a été approuvé !');
          this.router.navigate(['/travellers/list']);
        }
      }
    );
  }

}
