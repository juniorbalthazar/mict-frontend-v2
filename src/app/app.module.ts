import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import {
  DropdownModule,
  IconsModule,
  MDBSpinningPreloader,
  NavbarModule, ToastModule,
  WavesModule
} from 'ng-uikit-pro-standard';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LoginComponent } from './auth/login/login.component';
import {AuthModule} from './auth/auth.module';
import {JwtInterceptor} from './interceptor/jwt.interceptor';
import {ErrorInterceptor} from './interceptor/error.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { IntroFormComponent } from './intro-form/intro-form.component';


export function TranslationLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    IntroFormComponent,
    
  ],
  imports: [
    BrowserModule,
    // ======
    ReactiveFormsModule,
    NgxCaptchaModule,
    // ===========
  
    BrowserAnimationsModule,
    NavbarModule,
    ToastModule.forRoot(),
    WavesModule.forRoot(),
    IconsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: TranslationLoaderFactory, deps: [HttpClient]}
    }),
    DropdownModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MDBSpinningPreloader
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }


