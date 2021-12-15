import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormComponent } from './form/form.component';
import { Client } from './form/client';
import { Account } from './form/account';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlApiLogin = "/api/username"
  urlApiRegister = "/api/register/"
  tokenParse: String = "";

  constructor(private httpClient: HttpClient) { }

  public postLogin(username: string, password: string): Observable<Account> {
    // let data: Object = {
    //   "username": username,
    //   "password": password,
    // };

    let data : String;

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    data = "username=" + username + "&password="+password;

    // console.log ("LOG : username 1 : " + username );
    // console.log ("LOG : psw 1 : " + password );
    return this.httpClient.post<Account>(environment.apiUrl + this.urlApiLogin, data, httpOptions);
  }

  public postRegistration(client: Client): Observable<Account> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };

    return this.httpClient.post<Account>(environment.apiUrl + this.urlApiRegister, client, httpOptions);
  }

  public getLogin(username: string) : Observable<Account> {

    let data: string = "username=" + username;

    //console.log(data);
    return this.httpClient.get<Account>(environment.apiUrl + this.urlApiRegister + username);
  }
}