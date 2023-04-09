import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-intro-form',
  templateUrl: './intro-form.component.html',
  styleUrls: ['./intro-form.component.scss']
})
export class IntroFormComponent implements OnInit {

  public aFormGroup: FormGroup;
  public siteKey:any;
  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.siteKey="6LfXlM4gAAAAAEi39ubHW5JpOKe8NC1UAzf77xeE"
  }

}
