import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { FormComponent } from '../form/form.component';
import { Account } from '../form/account';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  account$!: Observable<Account>;

  @Input() password: string = "";

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.loginForm = this.formBuilder.group({
      account: this.formBuilder.group({
        username: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`.{5}.*`)])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`.{5}.*`)])),
      })
    });

    this.onValueChanges();
  }

  onValueChanges() {
    this.loginForm.valueChanges.subscribe(val => {
    })
  }

  submit() {

    const account = new Account(
      this.loginForm.value.account.username,
      this.loginForm.value.account.password
    );

    this.api.postLogin(account.username, account.password)
      .subscribe(event => console.log(event));
      //console.log("LOG : User logged in");
      this.account$ = this.api.getLogin(this.loginForm.value.account.username);
  }

  ngOnInit(): void {
  }
}
