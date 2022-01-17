import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogLayoutDisplay } from '../../../core/enums';
import { ConfirmBoxInitializer } from './classes';
import { IConfirmBoxPublicResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConfirmBoxEvokeService {
  success(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.SUCCESS
    });
    return confirmBox.openConfirmBox$();
  }

  info(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.INFO
    });
    return confirmBox.openConfirmBox$();
  }

  warning(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.WARNING
    });
    return confirmBox.openConfirmBox$();
  }

  danger(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.DANGER
    });
    return confirmBox.openConfirmBox$();
  }

  customOne(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_ONE
    });
    return confirmBox.openConfirmBox$();
  }

  customTwo(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_TWO
    });
    return confirmBox.openConfirmBox$();
  }

  customThree(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_THREE
    });
    return confirmBox.openConfirmBox$();
  }

  customFour(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_FOUR
    });
    return confirmBox.openConfirmBox$();
  }

  customFive(title: string, message: string, confirmLabel: string, declineLabel?: string): Observable<IConfirmBoxPublicResponse> {
    const confirmBox = this.#extender(title, message, confirmLabel, declineLabel);
    confirmBox.setConfig({
      layoutType: DialogLayoutDisplay.CUSTOM_FIVE
    });
    return confirmBox.openConfirmBox$();
  }

  #extender(title: string, message: string, confirmLabel: string, declineLabel?: string): ConfirmBoxInitializer {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle(title);
    confirmBox.setMessage(message);
    confirmBox.setButtonLabels(confirmLabel, declineLabel);
    return confirmBox;
  }
}
