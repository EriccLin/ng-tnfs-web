import { Injectable, Injector } from '@angular/core';
import { UtilsService } from './utils.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../widgets/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  constructor(
    private injector: Injector,
    private utilsService: UtilsService,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.authService.checkUser()
        .subscribe({
          next: (res) => {
            if (res) {
              setInterval(() => {
                this.checkStatus();
              }, 1000 * 60 * 100)    // check current status every 100 min
            }
            resolve(res);
          },
          error: (err) => {
            console.log(err);
            reject(err);
          }
        });
    });
  }
  checkStatus() {
    if (this.utilsService.isTokenExpired()) {
      this.authService.logout();
      const router = this.injector.get(Router);
      router.navigate(['/']);
      this.toastService.showDanger('超過使用時間，自動登出');
    }
  }
}
