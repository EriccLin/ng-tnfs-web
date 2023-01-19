import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static _url: string = 'http://127.0.0.1:8080';
  private static _version: string = 'api-v1';
  constructor() { }
  static get url(): string {
    return this._url;
  }
  static get version(): string {
    return this._version;
  }
  static get apiUrl(): string {
    return this._url + '/' + this._version;
  }
}
