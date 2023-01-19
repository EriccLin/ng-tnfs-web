import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  constructor() { }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({ textOrTpl, classname: 'bg-success  text-light', delay: 5000 });
  }

  showDanger(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({ textOrTpl, classname: 'bg-danger  text-light', delay: 9000 });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}