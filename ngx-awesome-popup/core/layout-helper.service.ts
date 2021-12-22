import { Injectable } from '@angular/core';
import { ButtonLayoutDisplay, DialogLayoutDisplay } from './enums';

@Injectable({
  providedIn: 'root'
})
export class LayoutHelperService {
  getIconClasses(layoutType: DialogLayoutDisplay, iconStyleClass: string): string {
    let returnString = '';
    if (iconStyleClass) {
      returnString += iconStyleClass;
      return returnString;
    }
    switch (layoutType) {
      case DialogLayoutDisplay.SUCCESS: {
        returnString += 'ap-icon-success icon-check-circle';
        break;
      }
      case DialogLayoutDisplay.INFO: {
        returnString += 'ap-icon-info icon-info-circle';
        break;
      }
      case DialogLayoutDisplay.WARNING: {
        returnString += 'ap-icon-warning icon-warning';
        break;
      }
      case DialogLayoutDisplay.DANGER: {
        returnString += 'ap-icon-danger icon-times-circle';
        break;
      }
    }
    return returnString;
  }

  getButtonClasses(layoutType: ButtonLayoutDisplay | DialogLayoutDisplay | null, perm: string = '', type?: 'auto-button'): string {
    let returnString = perm + ' ';
    if (type === 'auto-button' && layoutType === DialogLayoutDisplay.NONE) {
      layoutType = ButtonLayoutDisplay.PRIMARY;
    }
    switch (layoutType) {
      case ButtonLayoutDisplay.SUCCESS: {
        returnString += 'ed-btn-success';
        break;
      }
      case ButtonLayoutDisplay.INFO: {
        returnString += 'ed-btn-info';
        break;
      }
      case ButtonLayoutDisplay.WARNING: {
        returnString += 'ed-btn-warning';
        break;
      }
      case ButtonLayoutDisplay.DANGER: {
        returnString += 'ed-btn-danger';
        break;
      }
      case ButtonLayoutDisplay.DARK: {
        returnString += 'ed-btn-dark';
        break;
      }
      case ButtonLayoutDisplay.LIGHT: {
        returnString += 'ed-btn-light';
        break;
      }
      case ButtonLayoutDisplay.PRIMARY: {
        returnString += 'ed-btn-primary';
        break;
      }
      case ButtonLayoutDisplay.SECONDARY: {
        returnString += 'ed-btn-secondary';
        break;
      }
      case ButtonLayoutDisplay.LINK: {
        returnString += 'ed-btn-link';
        break;
      }
      case ButtonLayoutDisplay.CUSTOM_ONE: {
        returnString += 'ed-btn-customone';
        break;
      }
      case ButtonLayoutDisplay.CUSTOM_TWO: {
        returnString += 'ed-btn-customtwo';
        break;
      }
      case ButtonLayoutDisplay.CUSTOM_THREE: {
        returnString += 'ed-btn-customthree';
        break;
      }
      case ButtonLayoutDisplay.CUSTOM_FOUR: {
        returnString += 'ed-btn-customfour';
        break;
      }
      case ButtonLayoutDisplay.CUSTOM_FIVE: {
        returnString += 'ed-btn-customfive';
        break;
      }
    }
    return returnString;
  }

  getBoxClasses(layoutType: DialogLayoutDisplay, perm: string = ''): string {
    let returnString = perm + ' ';
    switch (layoutType) {
      case DialogLayoutDisplay.NONE: {
        returnString += 'standard-dialog';
        break;
      }
      case DialogLayoutDisplay.SUCCESS: {
        returnString += 'success-dialog';
        break;
      }
      case DialogLayoutDisplay.INFO: {
        returnString += 'info-dialog';
        break;
      }
      case DialogLayoutDisplay.WARNING: {
        returnString += 'warning-dialog';
        break;
      }
      case DialogLayoutDisplay.DANGER: {
        returnString += 'danger-dialog';
        break;
      }
      case DialogLayoutDisplay.CUSTOM_ONE: {
        returnString += 'customone-dialog';
        break;
      }
      case DialogLayoutDisplay.CUSTOM_TWO: {
        returnString += 'customtwo-dialog';
        break;
      }
      case DialogLayoutDisplay.CUSTOM_THREE: {
        returnString += 'customthree-dialog';
        break;
      }
      case DialogLayoutDisplay.CUSTOM_FOUR: {
        returnString += 'customfour-dialog';
        break;
      }
      case DialogLayoutDisplay.CUSTOM_FIVE: {
        returnString += 'customfive-dialog';
        break;
      }
    }
    return returnString;
  }
}
