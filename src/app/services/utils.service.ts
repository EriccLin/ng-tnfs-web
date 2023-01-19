import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MyTokens } from '../models/myTokens';
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private jwtHelper: JwtHelperService) { }

  isTokenExpired(token: string = ACCESS_TOKEN): boolean {
    let jwtStr = this.getToken(token);
    if (jwtStr) {
      return this.jwtHelper.isTokenExpired(jwtStr);
    } else {
      return false;
    }
  }

  getTokenExpirationDate(token: string = ACCESS_TOKEN): Date {
    let jwtStr = this.getToken(token);
    if (jwtStr) {
      let date = this.jwtHelper.getTokenExpirationDate(jwtStr);
      if (date) {
        return date;
      }
    }
    return new Date(); // get current time
  }
  writeTokens(tokens: MyTokens) {
    // console.log('tokens: ', tokens)
    // console.log('tokens--: ', tokens.access_token)
    localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
  }
  writeToken(value: string, token: string = ACCESS_TOKEN) {
    localStorage.setItem(token, value);
  }
  getToken(token: string) {
    return localStorage.getItem(token);
  }
  removeToken(token: string) {
    if (this.getToken(token)) {
      localStorage.removeItem(token);
    }
  }
  removeAllTokens() {
    this.removeToken(ACCESS_TOKEN);
    this.removeToken(REFRESH_TOKEN);
  }
}
