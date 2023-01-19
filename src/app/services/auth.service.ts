import { Injectable, Injector, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpBackend, HttpClient, HttpContext, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { LoginData } from '../models/logindata';
import { MyTokens } from '../models/myTokens';
import { Account } from '../models/account';
import { AccountService } from './account.service';
import { ACCESS_TOKEN, UtilsService } from './utils.service';
import { ToastService } from '../widgets/toast/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  loginStatus$ = new BehaviorSubject<boolean>(false);
  currentAcnt$ = new BehaviorSubject<Account>({} as Account);

  constructor(
    private utilsService: UtilsService,
    private toastService: ToastService,
    private http: HttpClient,
    private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.currentAcnt$.unsubscribe();
  }

  loginServer(logindata: LoginData): Observable<MyTokens> {
    const _apiUrl = ConfigService.apiUrl;
    let url = _apiUrl + '/login';
    let body = { username: logindata.username.trim(), password: logindata.password.trim(), };
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<MyTokens>(url, body, options);
  }
  login(logindata: LoginData) {
    this.loginServer(logindata).subscribe({
      next: (val) => {
        this.utilsService.writeTokens(val);
        let msg: string = '';

        this.getCurrentUserFromServer().subscribe({
          next: (val: Account) => {
            this.loginStatus$.next(true);
            this.currentAcnt$.next(val)
            console.log(this.currentAcnt$.getValue());
            msg = `帳號<<${logindata.username}>>登入成功`;
            this.toastService.showSuccess(msg);
            this.router.navigate(['platform', 'case-create']);
          },
          error: (err: HttpErrorResponse) => {
            this.loginStatus$.next(false);
            this.currentAcnt$.next({} as Account);
            msg = `無法取得帳號<<${logindata.username}>>資料，err: ${err.message}`;
            console.log(msg);
            this.toastService.showDanger(msg);
          }
        });
      },
      error: (err: HttpErrorResponse) => {
        this.loginStatus$.next(false);
        this.currentAcnt$.next({} as Account);
        this.utilsService.removeAllTokens();
        console.log('error ', err);
        let msg: string = '';
        if (err instanceof Error) {
          msg = "網頁錯誤";
        } else {
          switch (true) {
            case err.status === 401:
              msg = "帳號或密碼錯誤";
              break;
            case err.status === 403:
              msg = "傳輸格式錯誤";
              break;
            case err.status === 0: default:
              msg = "資料庫伺服器連線失敗";
          }
          console.log(msg, err.message);
          this.toastService.showDanger(`帳號<<${logindata.username}>>登入失敗：` + msg);
        }
      },
      complete: () => { }
    });
  }

  getCurrentUserFromServer(): Observable<Account> {
    let url = ConfigService.apiUrl + '/currentUser';
    return this.http.post<Account>(url, {}, {});
  }

  logout() {
    this.loginStatus$.next(false);
    this.currentAcnt$.next({} as Account);
    this.utilsService.removeAllTokens();
    this.router.navigate(['/']);
  }

  checkUser(): Observable<boolean> {
    if (!this.utilsService.isTokenExpired(ACCESS_TOKEN)) {
      this.loginStatus$.next(true);
      return of(true);
    } else {
      let username = this.currentAcnt$.getValue()['username'];
      this.toastService.showDanger(`帳號<<${username}>>超過登入時間自動登出：`);
      this.utilsService.removeAllTokens();
      this.loginStatus$.next(false);
      return of(false);
    }
  }
}
