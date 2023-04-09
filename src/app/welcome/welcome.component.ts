import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  constructor() {}
  ngOnDestroy(): void {
    document.getElementById("topHe").style.visibility = "visible";
    document.getElementById("imt").style.color = " #101728";
  }
  // public siteKey:any
  ngOnInit(): void {
    document.getElementById("topHe").style.visibility = "hidden";
    document.getElementById("imt").style.color = " #000080";
    //
  }

  // resolved(CaptchaResponse:string){
  //   this.captcha=CaptchaResponse;
  //   console.log("resolved catcha with response:",this.captcha)

  // }

  // siteKey:string="6LfXlM4gAAAAAEi39ubHW5JpOKe8NC1UAzf77xeE"
}
