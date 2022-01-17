import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogLayoutDisplay } from '../../../core/enums';
import { ToastNotificationInitializer } from './classes';
import { IToastNotificationPublicResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastEvokeService {
  success(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.SUCCESS
    });
    return toast.openToastNotification$();
  }

  info(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.INFO
    });
    return toast.openToastNotification$();
  }

  warning(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.WARNING
    });
    return toast.openToastNotification$();
  }

  danger(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.DANGER
    });
    return toast.openToastNotification$();
  }

  customOne(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_ONE
    });
    return toast.openToastNotification$();
  }

  customTwo(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_TWO
    });
    return toast.openToastNotification$();
  }

  customThree(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_THREE
    });
    return toast.openToastNotification$();
  }

  customFour(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_FOUR
    });
    return toast.openToastNotification$();
  }

  customFive(title: string, message: string, confirmLabel?: string, declineLabel?: string): Observable<IToastNotificationPublicResponse> {
    const toast = this.#extender(title, message, confirmLabel, declineLabel);
    toast.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_FIVE
    });
    return toast.openToastNotification$();
  }

  #extender(title: string, message: string, confirmLabel?: string, declineLabel?: string): ToastNotificationInitializer {
    const toast = new ToastNotificationInitializer();
    toast.setTitle(title);
    toast.setMessage(message);
    toast.setButtonLabels(confirmLabel, declineLabel);
    return toast;
  }
}
