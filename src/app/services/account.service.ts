import { Injectable, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getAccountByName(username: string): Observable<Account> {
    let url = ConfigService.apiUrl + '/accounts/name';
    let body = { username: username };
    let options = {
      headers: new HttpHeaders(),
      params: {}
    }
    console.log('account post request', body)
    return this.http.post<Account>(url, body, options);
  }

}
