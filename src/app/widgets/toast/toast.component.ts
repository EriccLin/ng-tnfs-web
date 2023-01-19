import { Component, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  // host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) { }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}