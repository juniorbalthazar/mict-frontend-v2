import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "./auth/authentication.service";
import { Router, NavigationExtras } from "@angular/router";
import { Role } from "./models/role";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  //title = 'MSPP';
  //currentUser: any;
  // title = 'Systeme de Surveillance Epidemiologique (SSE)';
  public loginUser: any;
  constructor(
    public translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.authenticationService.currentUser.subscribe(
      (x) => (this.loginUser = x)
    );
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  public ngOnInit(): void {
    // this.translate.addLangs(["FR", "HT", "EN", "ES"]);
    this.translate.addLangs(["FR", "HT"]);
    this.translate.setDefaultLang("FR");
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/auth"]);
  }

  get isAdmin() {
    const role: any = this.loginUser;
    return this.loginUser && role.account.role === Role.Admin;
  }

  get isSupervisor() {
    const role: any = this.loginUser;
    return this.loginUser && role.account.role === Role.Supervisor;
  }
}
