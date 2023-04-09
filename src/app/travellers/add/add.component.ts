import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from "@angular/core";
import {
  FormBuilder,
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { Travellers } from "../../models/travellers";
import { CountriesService } from "../../countries.service";
import { TravellersService } from "../travellers.service";
import { NotificationService } from "../../shared/notification.service";
import * as html2pdf from "../../../../node_modules/html2pdf.js";
import {
  ModalModule,
  MDBModalService,
  MDBModalRef,
  UtilService,
  MdbStepperComponent,
} from "ng-uikit-pro-standard";
import { Router } from "@angular/router";
import { GeoService } from "src/app/shared/geo.service";
import * as moment from "moment";
import { flatMap } from "rxjs/operators";
import { UtilitiesService } from "src/app/utilities.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
export default moment;

// sweetAlert
import Swal from "sweetalert2";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
// HERE WE HAVE THE CLASS CALLED "AddCompoment"
export class AddComponent implements OnInit {
  @ViewChild("success") public success: any;
  @ViewChild("warning") public warning: any;
  @ViewChild("validateOTP") public validateOTP: any;
  @ViewChild("notAuthorized") public notAuthorized: any;
  @ViewChild("stepper", { static: true }) stepper: MdbStepperComponent;
  @ViewChild("date") dateTravel: ElementRef;

  // trigger for depart radio button
  @ViewChild("depart") depart: ElementRef<HTMLElement>;

  // HE WE HAVE THE ATRIBUTESOF THAT CLASS, THESES ATRIBUTES CAN BE CALL FROM THESES TEMPLATES OF THIS COMPONENTS
  countries: Observable<any[]>;
  dept: Observable<any[]>;
  communeLieu: Observable<any[]>;
  communeAdress: Observable<any[]>;
  selectedCountries: [] = [];
  travelModeSelected = "";
  response: any;
  isMatch = true;
  isHotel = false;
  isAir = false;
  isTerre = false;
  isSea = false;
  isTestPCR = false;
  isTested = false;
  isTravelDate = false;
  isPhoneValid = false;
  isPregnant = false;
  voyagedateLimit = false;
  birthdateLimit = false;
  testdateLimit = false;
  isTestedPCR = false;
  isBus = false;
  isNone = false;
  testeddateLimit = false;
  isVehicule = false;
  // submitted = false;
  testDate = null;
  testedDate = null;
  travelDate = null;
  isEmail = false;
  traveller = new Travellers();
  age: number;
  loading = false;
  isIdentityImg = false;
  isPcrTestImg = false;
  passportExpMinDate = moment(new Date()).format("YYYY-MM-DD");
  maxDate = moment(new Date()).format("YYYY-MM-DD");
  notAuthorizedMessage = "";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  testResult = null;

  isArrive = false;
  isLeave = true;
  isOtherAirlineCheck = false;
  isOtherDeb = false;
  isOtherEmb = false;
  isOtherDeviseDeclare = false;
  isOtherDeviseDeclareImpo = false;
  // New varaibale
  // THERES ARE FORMS
  userEmail: FormGroup;
  travelForm: FormGroup;
  healthyForm: FormGroup;
  infosForm: FormGroup;
  declarationForm: FormGroup;
  otpForm: FormGroup;
  infoDouane: FormGroup;
  santeForm: FormGroup;
  // END FORMS

  // THERES ARE FORMS VARIABLES(FIELDS VARIABLES)
  isVertical = false;
  result;
  valideEmail;
  badFile;
  question;
  firstname;
  montant;
  lastname;
  isQuestion = false;
  isFile = false;
  isEqual = false;
  data = "68e62898-037e-401c-9f02-9f57c506a4bc";
  isResidentHaiti = false;
  isHaitian = true;
  isMoney = false;
  isImposable = false;
  owner = false;
  NotHaitianAndResideInHaiti = false;
  isVacinneted = false;
  isCovidSymptome = false;
  AucunIsNotCheck = false;
  symptomes = [];
  haitiPort = [
    "PAP - Toussaint Louverture International Airport",
    "cap haitien",
  ];
  foreignPort = [
    "MIA - Miami",
    "Cuba",
    "Santo domingo",
    "BLB - Panama Pacific International Airport",
    "FFL - Fort-Lauderdale",
    "PFN - Panama City-Bay Co International Airport",
    "Atlanta",
    "Montreal",
    "NYC - NEW YORK",
    "ATL - Hartsfield Jackson Atlanta International Airport",
    "JBQ - LA ISABELA INTERNATIONAL AIRPORT",
    "SDQ - Las Americas International Airport ",
    "Autre",
  ];
  embarquement = this.haitiPort;
  debarquement = this.foreignPort;
  isTestedCovid = false;
  isCovidvaccCheck = true;
  douaneDeclarationCheck = false;

  currentLanguage = "FR";
  // CONSTRUCTOR OF THIS COMPONENTS, THAT INITIALIZE ATRIBUTES
  constructor(
    // PARAMETES OF THIS CONSTRUCTURE
    private country: CountriesService,
    private formBuilder: FormBuilder,
    private travellersService: TravellersService,
    private toastService: NotificationService,
    private modal: ModalModule,
    private geo: GeoService,
    public translate: TranslateService,
    private tools: UtilitiesService,
    private router: Router
  ) {}

  @HostListener("window:resize") onWindowResize() {
    if (window.innerWidth <= 768) {
      this.isVertical = true;
    } else {
      this.isVertical = false;
    }
  }
  // ===============
  // triggerFalseClick() {
  //   let el: HTMLElement = this.depart.nativeElement;
  //   el.click();
  // }
  // =======
  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.isVertical = true;
    } else {
      this.isVertical = false;
    }

    this.countries = this.country.getCountries(this.translate.currentLang);

    if (this.translate.onLangChange) {
      this.translate.onLangChange.subscribe(
        (langChangeEvent: LangChangeEvent) => {
          // language variable for the tooltips
          this.currentLanguage = langChangeEvent.lang;
          // console.log("CURRENT LANGUAGE" + this.currentLanguage);
          // console.log(langChangeEvent.lang);
          this.countries = this.country.getCountries(langChangeEvent.lang);

          // this.timeFormatBehaviorSubject.next(this.getFormat(langChangeEvent.lang));
          this.stepper.next();
        }
      );
    }
    /* Bind Dept */
    this.dept = this.geo.departements();

    // METHOD TO BUILD FORM
    /* Build forms */
    this.buildUserEmailForm();
    this.buildTravelForm();
    //  this.buildHealthyForm();
    this.buildInfosForm();
    this.buildInfoAddForm();
    this.buildOTPForm();
    this.buildSanteForm();
    this.buildDeclarationForm();

    /* Internationalization */
    // FFOR TRANSLATING THE APP
    const language = this.translate.currentLang;
    switch (language) {
      case "FR":
        this.valideEmail = "Veuillez saisir un email valide";
        this.badFile =
          "La taille ou le type de fichier sélectionné n'est pas pris en charge";
        this.question = "Répondez d'abord à cette question.";
        break;
      case "EN":
        this.valideEmail = "Please enter a valid email";
        this.badFile = "Selected file size or type is not supported";
        this.question = "Please answer this question first.";
        break;
      case "ES":
        this.valideEmail =
          "Por favor introduzca una dirección de correo electrónico válida";
        this.badFile =
          "El tamaño o tipo de archivo seleccionado no es compatible";
        this.question = "Responde esta pregunta primero";
        break;
      case "HT":
        this.valideEmail = "Tanpri rantre yon imel ki korèk";
        this.badFile = "Tay fichye ou seleksyone a oubyen tip li pa sipòte";
        this.question = "Tanpri reponn kesyon sa avan.";
        break;
    }
  }

  // THIS IS A METHODE, CALLED "sendOTP"
  // OTP
  sendOTP() {
    const email = this.userEmail.get("email").value;
    if (this.userEmail.valid) {
      this.loading = true;
      this.travellersService.sendOTP(email).subscribe(
        (res) => {
          const respons: any = res;
          if (respons.success) {
            this.openModalOTP();
          } else {
            this.loading = false;
          }
        },
        (err) => {
          this.loading = false;
          this.userEmail.reset();
          this.toastService.isError(
            "une erreur s'est produite au moment de la soumission du formulaire !"
          );
        }
      );
    }
  }

  // THIS IS A METHODE, CALLED "OTP"
  // Check OTP
  checkOTP() {
    const otp = this.otpForm.get("otp").value;
    if (this.otpForm.valid) {
      this.travellersService.checkOTP(otp).subscribe((res) => {
        const respons: any = res;
        if (respons.success) {
          this.closeModalOTP();
          this.stepper.next();
        }
      });
    }
  }

  // THIS IS A METHODE, CALLED "buildOTPForm"
  buildOTPForm(): void {
    // HERE WE ARE BUILDING THE"otpForm" FORM
    this.otpForm = this.formBuilder.group({
      otp: ["", Validators.required],
    });
  }

  // THIS IS A METHODE, CALLED "buildTravelForm"
  buildTravelForm(): void {
    // HERE WE ARE BUILDING THE "travelForm" FORM
    this.travelForm = this.formBuilder.group({
      // THESE ARE FORM FIELDS VARIABLES(WE ARE DEFINDING THEM AS REQUIRED OR NOT)
      option: ["depart", Validators.required],
      travelTypeId: [null, Validators.required],
      dateVoyage: ["", Validators.required],
      // pontDEdesmbarqueMent: [""],
      numeroVisaOrPermis: [""],
      // provenanceCountry: ["", Validators.required],
      // originCountry: ["", Validators.required],
      travelMotif: [""],
      // pontDEmbarqueMent: [""],
      // documentType: ["", Validators.required],
      // documentSerial: ["", Validators.required],
      // docIdentity: ["", Validators.required],
      // visitedCountries: [""],
      issueAt: [""],
      dureeSejour: [""],
      residentHaiti: ["non"],
      residenceNumber: [""],

      // =================NEW FIELD=================
      departementId_ArriverHaiti: [""],
      communeId_ArriverHaiti: [""],
      streetAddress_ArriverHaiti: [""],
    });
  }

  // THIS IS A METHODE, CALLED "buildUserEmailForm"
  buildUserEmailForm(): void {
    // HERE WE ARE BUILDING THE "userEmail" FORM
    this.userEmail = this.formBuilder.group(
      // THESE ARE FORM FIELDS VARIABLES(WE ARE DEFINDING THEM AS REQUIRED OR NOT)
      {
        email: [
          "",
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        emailConfirm: [
          "",
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
      },
      { validator: this.emailConfirming }
    );
  }

  emailConfirming(c: AbstractControl): { nomatch: boolean } {
    if (c.get("email").value !== c.get("emailConfirm").value) {
      return { nomatch: true };
    }
  }

  // THIS IS A METHODE, CALLED "buildHealthyForm"
  buildHealthyForm(): void {
    this.healthyForm = this.formBuilder.group({
      isTestPCR: ["", Validators.required],
      phoneCovidSymptome: ["", Validators.required],
    });
  }

  buildSanteForm() {
    this.santeForm = this.formBuilder.group({
      // convidSymptome: ["", Validators.required],
      phoneCovidSymptome: [""],
      covidvacc: ["", Validators.required],
      dateVaccination: [""],
      vaccinType: [""],
      duree: ["", Validators.required],
      visitedCountries: [""],
    });
  }
  buildDeclarationForm() {
    this.declarationForm = this.formBuilder.group({
      terme: ["", Validators.requiredTrue],
    });
  }
  // THIS IS A METHODE, CALLED "buildInfoAddForm"
  buildInfoAddForm(): void {
    this.infoDouane = this.formBuilder.group({
      argentPossesion: ["non", Validators.required],
      montantDeclarer: [""],
      deviseDeclare: [""],
      ownerMoney: ["non"],
      prenomEnvoie: [""],
      nomEnvoie: [""],
      hebergeurPrenom: [""],
      hebergeurNom: [""],
      hebergeurLien: [""],
      argentUtilisation: [""],
      douaneDeclaration: ["non", Validators.required],
      declaration: ["non", Validators.required],
      imposable: ["non", Validators.required],
      valeurBien: [""],
      bienMonaieValeurDevise: [""],
      detailMachandise: [""],
      valeurApproximatif: [""],

      // contactName: [""],
      // contactPhone: [""],
      // monnaie: [""],
      // contactAdress: [""],
      // streetAddress: ["", Validators.required],
      // lieuSejour: ["", Validators.required],
      // departementId: ["", Validators.required],
      // communeId: ["", Validators.required],
      // streetAddress: [""],
      // lieuSejour: [""],
      // departementId: [""],
      // communeId: [""],
      // contactDepartementId: [""],
      // contactCommuneId: [""],
      // agree: [false, Validators.requiredTrue],
      // agree2: [false, Validators.requiredTrue],
    });
  }

  // THIS IS A METHODE, CALLED "buildInfosForm"
  buildInfosForm(): void {
    this.infosForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      sexe: [null, Validators.required],
      birthdate: ["", Validators.required],
      nationality: [null, Validators.required],
      phone: [""],
      birthCountry: [null],
      cityOfBirth: [""],
      passportNumber: ["", Validators.required],
      passportExpDate: ["", Validators.required],
      resident: ["", Validators.required],
      email: [""],
      etatCivil: ["", Validators.required],
      departementId: [""],
      codePostal: [""],
      addressResidence: [""],
      communeId: [""],
      streetAddress: [""],
      country: [null],
      street: [""],
      city: [""],
      residentTel: [""],
    });
  }

  // VALIDATION ERROR

  // THIS IS A METHODE, CALLED "invalidForms", YHIS IS FORM VALIDATION
  // Return true if at least either travelForm, healthyForm or infosForm is invalid
  invalidForms(): boolean {
    return (
      // this.healthyForm.invalid ||
      this.travelForm.invalid ||
      this.infosForm.invalid ||
      this.infoDouane.invalid ||
      this.santeForm.invalid
    );
  }

  // THIS IS A METHODE, CALLED "getData"
  /* Return travaller by combining the forms value */
  getData(): any {
    return {
      // ...this.healthyForm.value,
      // ...this.userEmail.get("email").value,
      ...this.travelForm.value,
      ...this.infosForm.value,
      ...this.infoDouane.value,
      ...this.santeForm.value,
      symptomes: [...this.symptomes],
      ...this.declarationForm.value,
    };
  }

  // THIS IS A METHODE, CALLED "getData"
  checkTest(event) {
    if (event) {
      this.testResult = event.target.value;
      this.isQuestion = false;
    }
  }

  save() {
    // tslint:disable-next-line: curly
    // if (this.invalidForms()) return;
    const traveller = this.getData();
    this.loading = true;

    this.travellersService.create(traveller).subscribe(
      (res) => {
        const respons: any = res;

        if (respons.success) {
          this.firstname = traveller.firstname;

          this.loading = false;
          // this.stepper.next();
          this.lastname = traveller.lastname;
          window.open(
            `${environment.apiUrl}` +
              "/auth/mict/view_Ticket?pdf=" +
              respons.form.code,
            "_blank"
          );
          this.openModal();
        } else {
          this.loading = false;
          this.toastService.isError("Error");
        }
      },
      (err) => {
        this.loading = false;
        this.toastService.isError(
          "une erreur s'est produite au moment de la soumission du formulaire !"
        );
      }
    );
  }

  ifDeptLieuSelected(event) {
    if (event) {
      this.infosForm.get("communeId").setValue(null);
      this.communeLieu = this.geo.communes(event.code);
    }
  }

  ifDeptAdressSelected(event) {
    if (event) {
      this.infosForm.get("contactCommuneId").setValue(null);
      this.communeAdress = this.geo.communes(event.code);
    }
  }

  /* Display and set validators to compagnyTransport and flight number if travel mode is AIR */
  onTravelModeChange(e) {
    this.travelModeSelected = e.target.value;
    switch (this.travelModeSelected) {
      case "1":
        this.isAir = true;

        this.isTerre = false;
        this.isSea = false;
        // this.travelForm.controls["pontDEdesmbarqueMent"].setValidators([
        //   Validators.required,
        // ]);
        // this.travelForm.controls["pontDEmbarqueMent"].setValidators([
        //   Validators.required,
        // ]);

        this.travelForm.addControl(
          "pontDEdesmbarqueMent",
          new FormControl("", Validators.required)
        );
        this.travelForm.addControl(
          "pontDEmbarqueMent",
          new FormControl("", Validators.required)
        );

        this.travelForm.addControl(
          "compagnyVoyage",
          new FormControl("", Validators.required)
        );
        this.travelForm.addControl(
          "flightNumber",
          new FormControl("", Validators.required)
        );

        this.travelForm.removeControl("compagny");
        // remove the required hideen fileds
        this.travelForm.removeControl("typeGroundTranport");
        this.travelForm.removeControl("travelMotif");

        break;
      case "3":
        this.isTerre = true;
        this.isAir = false;
        this.isSea = false;

        // this.travelForm.controls["pontDEdesmbarqueMent"].clearValidators();
        // this.travelForm.controls["pontDEmbarqueMent"].clearValidators();
        this.travelForm.addControl(
          "typeGroundTranport",
          new FormControl("", Validators.required)
        );

        this.travelForm.removeControl("pontDEdesmbarqueMent");
        this.travelForm.removeControl("pontDEmbarqueMent");
        this.travelForm.removeControl("compagnyVoyage");
        this.travelForm.removeControl("flightNumber");
        break;
      default:
        this.isSea = true;
        this.isTerre = false;
        this.isAir = false;
        this.isTravelDate = false;

        // this.travelForm.controls[
        //   "pontDEdesmbarqueMent"
        // ].updateValueAndValidity();
        // this.travelForm.controls["pontDEmbarqueMent"].updateValueAndValidity();

        this.travelForm.removeControl("typeGroundTranport");
        this.travelForm.removeControl("pontDEdesmbarqueMent");
        this.travelForm.removeControl("pontDEmbarqueMent");
        this.travelForm.removeControl("compagnyVoyage");
        this.travelForm.removeControl("flightNumber");

        if (this.travelForm.controls["option"].value == "depart") {
          this.travelForm.controls["travelMotif"].clearValidators();
        } else if (
          this.travelForm.controls["option"].value != "depart" &&
          !this.isHaitian
        ) {
          this.travelForm.controls["travelMotif"].setValidators([
            Validators.required,
          ]);
        }
        this.travelForm.controls["travelMotif"].updateValueAndValidity();
    }

    // this.travelForm.controls["pontDEdesmbarqueMent"].updateValueAndValidity();
    // this.travelForm.controls["pontDEmbarqueMent"].updateValueAndValidity();

    // this.travelForm.removeControl("pontDEdesmbarqueMent");
    // this.travelForm.removeControl("pontDEmbarqueMent");
  }

  onTransportTypeChange(e) {
    const type = e.target.value;
    switch (type) {
      case "1":
        this.isBus = true;
        this.isVehicule = false;
        this.isSea = false;

        this.travelForm.addControl(
          "compagnyTransport",
          new FormControl("", Validators.required)
        );
        this.travelForm.addControl(
          "numeroTransport",
          new FormControl("", Validators.required)
        );

        this.travelForm.removeControl("marque");
        this.travelForm.removeControl("plaque");
        this.isNone = false;
        this.travelForm.removeControl("precision");
        // remove the require field
        this.travelForm.removeControl("travelMotif");
        break;
      case "2":
        this.isVehicule = true;
        this.isBus = false;
        this.isSea = false;
        this.travelForm.addControl(
          "marque",
          new FormControl("", Validators.required)
        );
        this.travelForm.addControl(
          "plaque",
          new FormControl("", Validators.required)
        );

        this.travelForm.removeControl("compagnyTransport");
        this.travelForm.removeControl("numeroTransport");
        // remove the require field
        this.travelForm.removeControl("travelMotif");
        this.isNone = false;
        this.travelForm.removeControl("precision");
        break;
      case "3":
        this.isNone = true;
        this.travelForm.addControl(
          "precision",
          new FormControl("", Validators.required)
        );
        this.isSea = false;
        this.isBus = false;
        this.isVehicule = false;

        this.travelForm.removeControl("compagnyTransport");
        this.travelForm.removeControl("numeroTransport");
        this.travelForm.removeControl("marque");
        this.travelForm.removeControl("plaque");
        break;
    }
  }

  // validateTest() {
  //   const travelDate = moment(this.travelForm.get("dateVoyage").value);
  //   const testResult = this.healthyForm.get("isTestedPCR").value;
  //   // const testDate = moment(this.healthyForm.get("dateTestPCR").value);

  //   const diff = travelDate.diff(testDate, "days");

  //   if (testResult === "true") {
  //     if (diff > 30) {
  //       this.stepper.next();
  //     } else {
  //       this.notRecoverdYetNessage();
  //       this.openWarningModal();
  //     }
  //   }

  //   if (testResult === "false") {
  //     if (!(diff > 14)) {
  //       this.stepper.next();
  //     } else {
  //       this.recentTestMessage();
  //       this.openWarningModal();
  //     }
  //   }
  // }

  resetForm() {
    this.travelForm.reset();
    // this.healthyForm.reset();
    this.infosForm.reset();
  }

  isTestTrue(event) {
    if (event) {
      this.isTestPCR = true;
      this.isTestedPCR = true;
      this.healthyForm.addControl(
        "isTestedPCR",
        new FormControl("", Validators.required)
      );
      this.healthyForm.addControl(
        "dateTestPCR",
        new FormControl("", Validators.required)
      );
      this.healthyForm.addControl(
        "doctestPcr",
        new FormControl("", Validators.required)
      );
    }
  }

  isTestFalse(event) {
    if (event) {
      this.isTestPCR = false;
      this.isTestedPCR = false;
      this.healthyForm.get("isTestPCR").setValue(null);
      this.healthyForm.removeControl("isTestedPCR");

      if (this.healthyForm.get("dateTestPCR")) {
        this.healthyForm.get("dateTestPCR").setValue(null);
        this.healthyForm.removeControl("dateTestPCR");
      }
      if (this.healthyForm.get("doctestPcr")) {
        this.healthyForm.get("doctestPcr").setValue(null);
        this.healthyForm.removeControl("doctestPcr");
      }
      this.noTestMessage();
      this.openWarningModal();
    }
  }

  birthDateLimit(event) {
    if (event) {
      if (event.target.value > this.maxDate) {
        this.birthdateLimit = true;
        this.infosForm.get("birthdate").setValue(null);
      } else {
        this.birthdateLimit = false;
      }
    }
  }

  passportExpDate(event) {
    if (event) {
      if (event.target.value > this.passportExpDate) {
        this.infosForm.get("passportExpDate").setValue(null);
      } else {
        this.birthdateLimit = false;
      }
    }
  }

  testDateLimit(event) {
    if (event) {
      if (event.target.value > this.maxDate) {
        this.testdateLimit = true;
        this.healthyForm.get("dateTestPCR").setValue(null);
      } else {
        this.testdateLimit = false;
      }

      // Enable uplead file button
      if (this.testResult != null) {
        const testDate = moment(event.target.value);
        const travelDate = moment(this.travelForm.get("dateVoyage").value);

        const diff = travelDate.diff(testDate, "days");

        if (this.testResult === "true") {
          if (diff > 30) {
            // this.stepper.next();
            this.isFile = true;
          } else {
            this.testResult = null;
            this.notRecoverdYetNessage();
            this.openWarningModal();
            this.healthyForm.get("isTestedPCR").setValue(null);
            this.healthyForm.get("dateTestPCR").setValue(null);
          }
        }

        if (this.testResult === "false") {
          if (!(diff > 14)) {
            this.isFile = true;
            // this.stepper.next();
          } else {
            this.testResult = null;
            this.recentTestMessage();
            this.openWarningModal();
            this.healthyForm.get("isTestedPCR").setValue(null);
            this.healthyForm.get("dateTestPCR").setValue(null);
          }
        }
      } else {
        this.isQuestion = true;
        this.healthyForm.get("dateTestPCR").setValue(null);
      }
    }
  }

  testedDateLimit(event) {
    if (event) {
      if (event.target.value > this.maxDate) {
        this.testeddateLimit = true;
        this.healthyForm.get("dateTestedPCR").setValue(null);
      } else {
        this.testedDate = event.target.value;
        this.testdateLimit = false;
      }
    }
  }

  voyageDateLimit(event) {
    if (event) {
      if (event.target.value < this.maxDate) {
        this.voyagedateLimit = true;
        this.travelForm.get("dateVoyage").setValue(null);
      } else {
        this.travelDate = event.target.value;
        this.voyagedateLimit = false;
      }
    }
  }

  isWoman(event) {
    if (event) {
      const gender = event?.target?.value;
      if (gender === "F") {
        this.isPregnant = true;
        this.infosForm.addControl(
          "isPregrant",
          new FormControl("", Validators.required)
        );
      } else {
        this.isPregnant = false;
        this.infosForm.removeControl("isPregrant");
      }
    }
  }

  openModal() {
    this.success.show();
  }

  closeModal() {
    this.success.hide();
    window.location.reload();
  }

  openWarningModal() {
    this.warning.show();
  }

  closeWarningModal() {
    this.warning.hide();
  }

  closeNotAuthorized() {
    this.notAuthorized.hide();
  }

  openModalOTP() {
    this.validateOTP.show();
  }

  closeModalOTP() {
    this.validateOTP.hide();
  }

  phoneValidation(event: any) {
    if (event) {
      this.infosForm.addControl(
        "contactPhone",
        new FormControl("", Validators.minLength(8))
      );
    } else {
      this.infosForm.removeControl("contactPhone");
    }
  }

  get officialEmail() {
    return this.userEmail.get("email");
  }

  get confirmEmail() {
    return this.userEmail.get("emailConfirm");
  }

  get officialPhone() {
    return this.infosForm.get("contactPhone");
  }

  uploadIdentityFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        if (event.target.files[0].size < 9000000) {
          /* checking size here - 9MB */
          this.isIdentityImg = false;
          this.travelForm.get("docIdentity").setValue(file);
        } else {
          this.isIdentityImg = true;
          this.travelForm.get("docIdentity").setValue(null);
        }
      } else {
        this.isIdentityImg = true;
        this.travelForm.get("docIdentity").setValue(null);
      }
    }
  }

  uploadTestFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        if (event.target.files[0].size < 9000000) {
          /* checking size here - 9MB */
          this.isPcrTestImg = false;
          this.healthyForm.get("doctestPcr").setValue(file);
        } else {
          this.isPcrTestImg = true;
          this.healthyForm.get("doctestPcr").setValue(null);
        }
      } else {
        this.isPcrTestImg = true;
        this.healthyForm.get("doctestPcr").setValue(null);
      }
    }
  }

  isHotelChange(event) {
    if (event) {
      if (event.target.value.trim() === "Hotel") {
        this.isHotel = true;
        this.infoDouane.addControl(
          "hotelResider",
          new FormControl("", Validators.required)
        );
      } else {
        this.isHotel = false;
        this.infoDouane.removeControl("hotelResider");
      }
    }
  }

  noTestMessage() {
    const language = this.translate.currentLang;
    switch (language) {
      case "FR":
        this.notAuthorizedMessage =
          "Vous ne pouvez pas rentrer en Haïti sans faire le test PCR.";
        break;
      case "EN":
        this.notAuthorizedMessage =
          "You cannot travel to Haiti without doing the PCR test.";
        break;
      case "ES":
        this.notAuthorizedMessage =
          "No puede viajar a Haití sin hacer la prueba de PCR.";
        break;
      case "HT":
        this.notAuthorizedMessage =
          "Ou pa p ka rantre an Ayiti si w pa fè tès PCR la.";
        break;
    }
  }

  recentTestMessage() {
    const language = this.translate.currentLang;
    switch (language) {
      case "FR":
        this.notAuthorizedMessage =
          "Vous devez avoir un test PCR plus recent pour rentrer dans le pays, Il faut refaire le Test.";
        break;
      case "EN":
        this.notAuthorizedMessage =
          "You must have a recent PCR test to travel to Haiti, you must do the test again.";
        break;
      case "ES":
        this.notAuthorizedMessage =
          "Debe tener una prueba de PCR reciente para ingresar al país, debe volver a hacer la prueba.";
        break;
      case "HT":
        this.notAuthorizedMessage =
          "Ou sipoze gen yon tès ki resan pou rantre an ayiti, Tanpri refè tès la ankò.";
        break;
    }
  }

  notRecoverdYetNessage() {
    const language = this.translate.currentLang;
    switch (language) {
      case "FR":
        this.notAuthorizedMessage =
          "Vous ne pouvez pas rentrer en Haïti parce que vous n’êtes pas encore guéri du COVID-19.";
        break;
      case "EN":
        this.notAuthorizedMessage =
          "You can not travel to Haiti because you are not yet cured of COVID-19.";
        break;
      case "ES":
        this.notAuthorizedMessage =
          "No puede viajar a Haití porque aún no está curado de COVID -19.";
        break;
      case "HT":
        this.notAuthorizedMessage =
          "Ou pa p ka rantre an ayiti paske w poko geri de COVID-19 la.";
        break;
    }
  }

  download() {
    var element = document.getElementById("e-carte");
    var opt = {
      margin: 1,
      filename: "e-carte.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  }

  isResident(event) {
    if (event.code == "HT") {
      this.isResidentHaiti = true;
      this.infosForm.controls["departementId"].setValidators([
        Validators.required,
      ]);
      this.infosForm.controls["communeId"].setValidators([Validators.required]);
      this.infosForm.controls["streetAddress"].setValidators([
        Validators.required,
      ]);
      this.infosForm.controls["phone"].setValidators([Validators.required]);

      // if (this.isHaitian || this.isResidentHaiti) {
      //   this.travelForm.controls["dureeSejour"].clearValidators();
      // }

      // this.infosForm.controls["country"].clearValidators();
      this.infosForm.controls["street"].clearValidators();
      this.infosForm.controls["street"].setValue("");
      this.infosForm.controls["city"].clearValidators();
      this.infosForm.controls["city"].setValue("");
      this.infosForm.controls["addressResidence"].clearValidators();
      this.infosForm.controls["addressResidence"].setValue("");
      this.infosForm.controls["codePostal"].clearValidators();
      this.infosForm.controls["codePostal"].setValue("");
      // this.infosForm.controls["residentTel"].clearValidators();
    } else {
      this.isResidentHaiti = false;
      this.infosForm.controls["departementId"].clearValidators();
      this.infosForm.controls["departementId"].setValue("");
      this.infosForm.controls["communeId"].clearValidators();
      this.infosForm.controls["communeId"].setValue("");
      this.infosForm.controls["streetAddress"].clearValidators();
      this.infosForm.controls["streetAddress"].setValue("");
      this.infosForm.controls["phone"].clearValidators();
      this.infosForm.controls["phone"].setValue("");
      // if (!this.isHaitian || !this.isResidentHaiti) {
      //   this.travelForm.controls["dureeSejour"].clearValidators();
      // }
      // this.infosForm.controls["country"].setValidators([Validators.required]);
      this.infosForm.controls["street"].setValidators([Validators.required]);
      this.infosForm.controls["addressResidence"].setValidators([
        Validators.required,
      ]);
      this.infosForm.controls["codePostal"].setValidators([
        Validators.required,
      ]);
      this.infosForm.controls["city"].setValidators([Validators.required]);
      // this.infosForm.controls["residentTel"].setValidators([
      //   Validators.required,
      // ]);
    }

    // this.infosForm.controls["country"].updateValueAndValidity();
    this.infosForm.controls["street"].updateValueAndValidity();
    this.infosForm.controls["city"].updateValueAndValidity();
    this.infosForm.controls["departementId"].updateValueAndValidity();
    this.infosForm.controls["communeId"].updateValueAndValidity();
    this.infosForm.controls["streetAddress"].updateValueAndValidity();
    // this.infosForm.controls["residentTel"].updateValueAndValidity();
    this.infosForm.controls["phone"].updateValueAndValidity();
    this.infosForm.controls["addressResidence"].updateValueAndValidity();
    this.infosForm.controls["codePostal"].updateValueAndValidity();
    this.travelForm.controls["dureeSejour"].updateValueAndValidity();
  }

  // EVENT METHOD(EVENT FROM THE FORM TEMPLATE)
  onNationalityChange(event) {
    // this.travelForm.reset();

    if (event.code == "HT") {
      this.isHaitian = true;
      document.getElementById("birth-country").style.display = "none";
      this.infosForm.controls["birthCountry"].clearValidators();
      this.infosForm.controls["birthCountry"].setValue("");
      this.infosForm.controls["cityOfBirth"].setValidators([
        Validators.required,
      ]);
      this.travelForm.controls["travelMotif"].clearValidators();
      this.travelForm.controls["travelMotif"].setValue("");
      // this.travelForm.controls["numeroVisaOrPermis"].clearValidators();
      // this.travelForm.controls["issueAt"].clearValidators();
      // if (this.isHaitian) {
      //   this.travelForm.controls["dureeSejour"].clearValidators();
      // }
      // this.travelForm.controls["residentHaiti"].clearValidators();
    } else {
      this.isHaitian = false;
      document.getElementById("birth-country").style.display = "block";
      this.infosForm.controls["birthCountry"].setValidators([
        Validators.required,
      ]);
      this.infosForm.controls["cityOfBirth"].clearValidators();
      this.infosForm.controls["cityOfBirth"].setValue("");
      this.travelForm.controls["travelMotif"].setValidators([
        Validators.required,
      ]);

      // this.travelForm.controls["numeroVisaOrPermis"].setValidators([
      //   Validators.required,
      // ]);
      // this.travelForm.controls["issueAt"].setValidators([Validators.required]);
      // if (!this.isHaitian && !this.isResidentHaiti) {
      //   this.travelForm.controls["dureeSejour"].setValidators([
      //     Validators.required,
      //   ]);
      // }
      // this.travelForm.controls["residentHaiti"].setValidators([
      //   Validators.required,
      // ]);
    }
    this.infosForm.controls["birthCountry"].updateValueAndValidity();
    this.infosForm.controls["cityOfBirth"].updateValueAndValidity();
    this.travelForm.controls["travelMotif"].updateValueAndValidity();
    // this.travelForm.controls["numeroVisaOrPermis"].updateValueAndValidity();
    // this.travelForm.controls["issueAt"].updateValueAndValidity();
    // this.travelForm.controls["dureeSejour"].updateValueAndValidity();
    // this.travelForm.controls["dureeSejour"].updateValueAndValidity();
    // this.travelForm.controls["residentHaiti"].updateValueAndValidity();
  }

  SetNotHaitianAnResidentInHaiti(e) {
    if (e.target.value == "oui") {
      this.NotHaitianAndResideInHaiti = true;
      // this.travelForm.controls["residenceNumber"].setValidators([
      //   Validators.required,
      // ]);
      this.travelForm.controls["dureeSejour"].clearValidators();
      this.travelForm.controls["dureeSejour"].setValue("");
      // this.travelForm.controls["numeroVisaOrPermis"].setValidators([
      //   Validators.required,
      // ]);
      // this.travelForm.controls["issueAt"].setValidators([Validators.required]);
    } else {
      this.NotHaitianAndResideInHaiti = false;
      this.travelForm.controls["dureeSejour"].setValidators([
        Validators.required,
      ]);
      this.travelForm.controls["numeroVisaOrPermis"].clearValidators();
      this.travelForm.controls["numeroVisaOrPermis"].setValue("");
      this.travelForm.controls["issueAt"].clearValidators();
      this.travelForm.controls["issueAt"].setValue("");
      // this.travelForm.controls["residenceNumber"].clearValidators();
    }

    this.travelForm.controls["dureeSejour"].updateValueAndValidity();
    this.travelForm.controls["numeroVisaOrPermis"].updateValueAndValidity();
    this.travelForm.controls["issueAt"].updateValueAndValidity();
  }

  setIsVacinneted(e) {
    if (e.target.value == "oui") {
      this.isVacinneted = true;
      this.isCovidvaccCheck = true;
      this.santeForm.controls["dateVaccination"].setValidators([
        Validators.required,
      ]);
      this.santeForm.controls["vaccinType"].setValidators([
        Validators.required,
      ]);
    } else {
      this.isVacinneted = false;
      this.isCovidvaccCheck = false;
      this.santeForm.controls["vaccinType"].clearValidators();
      this.santeForm.controls["vaccinType"].setValue(null);
      this.santeForm.controls["dateVaccination"].clearValidators();
      this.santeForm.controls["dateVaccination"].setValue(null);

      // Swal.fire({
      //   title: "COVID-19",
      //   text: "Vous devez vous munir d’un résultat de test Covid19 a votre arrivée!",
      //   showClass: {
      //     popup: "animate__animated animate__fadeInDown",
      //   },
      //   hideClass: {
      //     popup: "animate__animated animate__fadeOutUp",
      //   },
      // });
      this.santeForm.controls["dateVaccination"].clearValidators();
    }

    this.santeForm.controls["dateVaccination"].updateValueAndValidity();
    this.santeForm.controls["vaccinType"].updateValueAndValidity();
  }

  setIsCovidSymptome(e: any) {
    switch (e.target.defaultValue) {
      case "Mal":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        if (this.symptomes.includes("Mal")) {
          this.symptomes.splice(this.symptomes.indexOf("Mal"), 1);
        } else {
          this.symptomes.push("Mal");
        }
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;
      case "Frisson":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        if (this.symptomes.includes("Frisson")) {
          this.symptomes.splice(this.symptomes.indexOf("Frisson"), 1);
        } else {
          this.symptomes.push("Frisson");
        }
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;
      case "Fièvre":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        if (this.symptomes.includes("Fièvre")) {
          this.symptomes.splice(this.symptomes.indexOf("Fièvre"), 1);
        } else {
          this.symptomes.push("Fièvre");
        }
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;
      case "gorge":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        if (this.symptomes.includes("gorge")) {
          this.symptomes.splice(this.symptomes.indexOf("gorge"), 1);
        } else {
          this.symptomes.push("gorge");
        }
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;
      case "Nez":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        if (this.symptomes.includes("Nez")) {
          this.symptomes.splice(this.symptomes.indexOf("Nez"), 1);
        } else {
          this.symptomes.push("Nez");
        }
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;

      case "Douleur":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        if (this.symptomes.includes("Douleur")) {
          this.symptomes.splice(this.symptomes.indexOf("Douleur"), 1);
        } else {
          this.symptomes.push("Douleur");
        }
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;

      case "respiratoire":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        if (this.symptomes.includes("respiratoire")) {
          this.symptomes.splice(this.symptomes.indexOf("respiratoire"), 1);
        } else {
          this.symptomes.push("respiratoire");
        }
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;

      case "Toux":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);

        if (this.symptomes.includes("Toux")) {
          this.symptomes.splice(this.symptomes.indexOf("Toux"), 1);
        } else {
          this.symptomes.push("Toux");
        }

        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;

      case "Fatique":
        this.isCovidSymptome = true;
        this.isCovidSymptome = true;
        if (this.symptomes.includes("Fatique")) {
          this.symptomes.splice(this.symptomes.indexOf("Fatique"), 1);
        } else {
          this.symptomes.push("Fatique");
        }
        this.santeForm.controls["phoneCovidSymptome"].setValidators([
          Validators.required,
        ]);
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;

      case "aucun":
        // this.isCovidSymptome =false
        this.AucunIsNotCheck = e.currentTarget.checked;
        this.isCovidSymptome = true;
        this.symptomes = [];
        if (this.symptomes.includes("aucun")) {
          this.symptomes.splice(this.symptomes.indexOf("aucun"), 1);
        } else {
          this.symptomes.push("aucun");
        }
        this.santeForm.controls["phoneCovidSymptome"].clearValidators();
        this.santeForm.controls["phoneCovidSymptome"].setValue("");
        this.santeForm.controls["phoneCovidSymptome"].updateValueAndValidity();
        break;
    }

    if (this.symptomes.length <= 0) {
      this.isCovidSymptome = false;
    }
  }

  setAucunCheck(e) {
    if (e.target.value == "oui") {
      this.AucunIsNotCheck = true;
    } else {
      this.AucunIsNotCheck = false;
    }
  }

  setDouanneDeclaration(e) {
    if (e.target.value == "oui") {
      this.douaneDeclarationCheck = true;
    } else {
      this.douaneDeclarationCheck = false;
    }
  }

  isMonaie(e) {
    if (e.target.value == "oui") {
      this.isMoney = true;
      this.infoDouane.controls["montantDeclarer"].setValidators([
        Validators.required,
        Validators.min(10000),
      ]);
      this.infoDouane.controls["deviseDeclare"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["ownerMoney"].setValidators([
        Validators.required,
      ]);
    } else {
      this.isMoney = false;
      this.infoDouane.controls["montantDeclarer"].clearValidators();
      this.infoDouane.controls["montantDeclarer"].setValue("");
      this.infoDouane.controls["deviseDeclare"].clearValidators();
      this.infoDouane.controls["deviseDeclare"].setValue("");
      this.infoDouane.controls["ownerMoney"].clearValidators();
      this.infoDouane.controls["ownerMoney"].setValue("");
      this.travelForm.removeControl("otherdeviseDeclare");
      this.isOtherDeviseDeclare = false;
    }
    this.infoDouane.controls["montantDeclarer"].updateValueAndValidity();
    this.infoDouane.controls["deviseDeclare"].updateValueAndValidity();
    this.infoDouane.controls["ownerMoney"].updateValueAndValidity();
  }

  isOwner(e) {
    if (e.target.value == "oui") {
      this.owner = true;
      this.infoDouane.controls["prenomEnvoie"].clearValidators();
      this.infoDouane.controls["prenomEnvoie"].setValue("");
      this.infoDouane.controls["nomEnvoie"].clearValidators();
      this.infoDouane.controls["nomEnvoie"].setValue("");
      this.infoDouane.controls["hebergeurPrenom"].clearValidators();
      this.infoDouane.controls["hebergeurPrenom"].setValue("");
      this.infoDouane.controls["hebergeurNom"].clearValidators();
      this.infoDouane.controls["hebergeurNom"].setValue("");
      this.infoDouane.controls["hebergeurLien"].clearValidators();
      this.infoDouane.controls["hebergeurLien"].setValue("");
      this.infoDouane.controls["argentUtilisation"].clearValidators();
      this.infoDouane.controls["argentUtilisation"].setValue("");
    } else {
      this.owner = false;
      this.infoDouane.controls["prenomEnvoie"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["nomEnvoie"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["hebergeurPrenom"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["hebergeurNom"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["hebergeurLien"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["argentUtilisation"].setValidators([
        Validators.required,
      ]);
    }

    this.infoDouane.controls["prenomEnvoie"].updateValueAndValidity();
    this.infoDouane.controls["nomEnvoie"].updateValueAndValidity();
    this.infoDouane.controls["hebergeurPrenom"].updateValueAndValidity();
    this.infoDouane.controls["hebergeurNom"].updateValueAndValidity();
    this.infoDouane.controls["hebergeurLien"].updateValueAndValidity();
    this.infoDouane.controls["argentUtilisation"].updateValueAndValidity();
  }

  bienImposable(e) {
    if (e.target.value == "oui") {
      this.isImposable = true;

      this.infoDouane.controls["valeurBien"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["bienMonaieValeurDevise"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["detailMachandise"].setValidators([
        Validators.required,
      ]);
      this.infoDouane.controls["valeurApproximatif"].setValidators([
        Validators.required,
      ]);
    } else {
      this.isImposable = false;
      this.infoDouane.controls["valeurBien"].clearValidators();
      this.infoDouane.controls["valeurBien"].setValue("");
      this.infoDouane.controls["bienMonaieValeurDevise"].clearValidators();
      this.infoDouane.controls["bienMonaieValeurDevise"].setValue("");
      this.infoDouane.controls["detailMachandise"].clearValidators();
      this.infoDouane.controls["detailMachandise"].setValue("");

      this.infoDouane.controls["valeurApproximatif"].clearValidators();
      this.infoDouane.controls["valeurApproximatif"].setValue("");
      this.isOtherDeviseDeclareImpo = false;
      this.travelForm.removeControl("otherbienMonaieValeurDevise");
    }
    this.infoDouane.controls["bienMonaieValeurDevise"].updateValueAndValidity();
    this.infoDouane.controls["valeurBien"].updateValueAndValidity();
    this.infoDouane.controls["detailMachandise"].updateValueAndValidity();
    this.infoDouane.controls["valeurApproximatif"].updateValueAndValidity();
  }

  isDepart(e) {
    if (e.target.value == "arrive") {
      this.debarquement = this.haitiPort;
      this.embarquement = this.foreignPort;
      this.isArrive = true;
      this.isLeave = false;
      this.travelForm.controls["departementId_ArriverHaiti"].setValidators([
        Validators.required,
      ]);
      this.travelForm.controls["communeId_ArriverHaiti"].setValidators([
        Validators.required,
      ]);
      this.travelForm.controls["streetAddress_ArriverHaiti"].setValidators([
        Validators.required,
      ]);

      if (this.isHaitian) {
        this.travelForm.controls["travelMotif"].clearValidators();
        this.travelForm.controls["travelMotif"].setValue("");
      } else {
        this.travelForm.controls["travelMotif"].setValidators([
          Validators.required,
        ]);
      }
    } else {
      this.isLeave = true;
      this.isArrive = false;
      this.debarquement = this.foreignPort;
      this.embarquement = this.haitiPort;
      this.travelForm.controls["departementId_ArriverHaiti"].clearValidators();
      this.travelForm.controls["departementId_ArriverHaiti"].setValue("");
      this.travelForm.controls["communeId_ArriverHaiti"].clearValidators();
      this.travelForm.controls["communeId_ArriverHaiti"].setValue("");
      this.travelForm.controls["streetAddress_ArriverHaiti"].clearValidators();
      this.travelForm.controls["streetAddress_ArriverHaiti"].setValue("");
      this.travelForm.controls["travelMotif"].clearValidators();
      this.travelForm.controls["travelMotif"].setValue("");
    }

    this.travelForm.controls[
      "departementId_ArriverHaiti"
    ].updateValueAndValidity();
    this.travelForm.controls["communeId_ArriverHaiti"].updateValueAndValidity();
    this.travelForm.controls[
      "streetAddress_ArriverHaiti"
    ].updateValueAndValidity();
    this.travelForm.controls["travelMotif"].updateValueAndValidity();
  }

  setIsTest(e) {
    if (e.target.value == "oui") {
      this.isTestedCovid = true;
    } else {
      this.isTestedCovid = false;
    }
  }

  isOtherAirline(e) {
    if (e.target.value == "-1") {
      this.isOtherAirlineCheck = true;
      this.travelForm.addControl(
        "othercompagnyVoyage",
        new FormControl("", Validators.required)
      );
    } else {
      this.isOtherAirlineCheck = false;
      this.travelForm.removeControl("othercompagnyVoyage");
    }
  }

  otherEmbarquement(e, action) {
    if (action == "emb") {
      if (e.target.value == "Autre") {
        this.isOtherEmb = true;
        this.travelForm.addControl(
          "otherpontDEmbarqueMent",
          new FormControl("", Validators.required)
        );
      } else {
        this.isOtherEmb = false;
        this.travelForm.removeControl("otherpontDEmbarqueMent");
      }
    } else {
      if (e.target.value == "Autre") {
        this.travelForm.addControl(
          "otherpontDEdesmbarqueMent",
          new FormControl("", Validators.required)
        );
        this.isOtherDeb = true;
      } else {
        this.isOtherDeb = false;
        this.travelForm.removeControl("otherpontDEdesmbarqueMent");
      }
    }
  }

  isMoneyDeviseDeclaration(e) {
    if (e.target.value == "-1") {
      this.isOtherDeviseDeclare = true;
      this.infoDouane.addControl(
        "otherdeviseDeclare",
        new FormControl("", Validators.required)
      );
    } else {
      this.isOtherDeviseDeclare = false;
      this.infoDouane.removeControl("otherdeviseDeclare");
    }
  }
  isMoneyDeviseDeclarationImposable(e) {
    if (e.target.value == "-1") {
      this.isOtherDeviseDeclareImpo = true;
      this.infoDouane.addControl(
        "otherbienMonaieValeurDevise",
        new FormControl("", Validators.required)
      );
    } else {
      this.isOtherDeviseDeclareImpo = false;
      this.infoDouane.removeControl("otherbienMonaieValeurDevise");
    }
  }
}
