import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api.service';
import { Account } from './account';
import { Client } from './client';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  signUpForm: FormGroup;
  recapdesable : boolean = true;

  @Input() password: string = "";

  //public client: Client;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    this.signUpForm = this.formBuilder.group({
      lastname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`[A-Z][a-z]+`)])),
      firstname: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`[A-Z][a-z]+`)])),
      civility: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`Mister|Madame|Nothing`)])),
      address: new FormControl('', [Validators.required]),
      zip: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`^[0-9]{5}$`)])),
      city: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`^([a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$`)])),
      state: new FormControl('', [Validators.required]),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`^[0-9]{10}|\\+33[0-9]{9}$`)])),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`.{5}.*`)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`.{5}.*`)])),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.checkPasswords });

    this.onValueChanges();
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    return group.get('password')?.value === group.get('confirmPassword')?.value ?
      null :
      { notSame: true }
  }


  onValueChanges() {
    this.signUpForm.valueChanges.subscribe(val => {
      // console.log(val);
    })
  }

  inPasswordConfirmation: any;

  onSubmit() {
    const account = new Account(
      this.signUpForm.value.account.username,
      this.signUpForm.value.account.password,
    );

    const client = new Client(
    //this.client = new client(
      this.signUpForm.value.lastname,
      this.signUpForm.value.firstname,
      this.signUpForm.value.civility,
      this.signUpForm.value.address,
      this.signUpForm.value.zip,
      this.signUpForm.value.city,
      this.signUpForm.value.state,
      this.signUpForm.value.email,
      this.signUpForm.value.phone,
      account
    );

    this.api.postRegistration(client)
      .subscribe(event => console.log(event));
  }

  ngOnInit(): void { }

}
