import {Component, OnInit, Output, ViewChild} from '@angular/core';
import * as EventEmitter from 'events';
import {AppComponent} from '../../app.component';
import {TranslateService} from '@ngx-translate/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../auth/authentication.service';
import {Role} from '../../models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() switchLang = new EventEmitter();

  loginUser: any;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.loginUser = x);
  }

  ngOnInit(): void {
  }

  getSwitchLang(lang){
    const app = new AppComponent(this.translate, this.router, this.authenticationService);
    app.switchLang(lang);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }

   get isAdmin() {
     const role: any = this.loginUser;
     return true;//this.loginUser &&  role.account.role === Role.Admin;
  }

  get isSupervisor() {
    const role: any = this.loginUser;
    return false;//this.loginUser && role.account.role === Role.Supervisor;
  }


}
