<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><p align="center">
  <img src="https://raw.githubusercontent.com/costlydeveloper/ngx-awesome-popup/master/assets/logo.png" alt="Logo" width="150" height="150" />
</p>
<h1 align="center">@costlydeveloper/ngx-awesome-popup</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@costlydeveloper/ngx-awesome-popup?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@costlydeveloper/ngx-awesome-popup.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@costlydeveloper/ngx-awesome-popup"><img alt="NPM Version" src="https://img.shields.io/npm/v/@costlydeveloper/ngx-awesome-popup.svg" height="20"/></a>
<a href="https://david-dm.org/costlydeveloper/ngx-awesome-popup"><img alt="Dependencies" src="https://img.shields.io/david/costlydeveloper/ngx-awesome-popup.svg" height="20"/></a>
<a href="https://github.com/costlydeveloper/ngx-awesome-popup/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/costlydeveloper/ngx-awesome-popup.svg" height="20"/></a>
<a href="https://github.com/costlydeveloper/ngx-awesome-popup/graphs/commit-activity"><img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" height="20"/></a>
<a href="https://costlydeveloper.github.io/ngx-awesome-popup/"><img alt="undefined" src="https://awesome.re/badge.svg" height="20"/></a>
	</p>

<p align="center">
  <b>Gives new functionality to Angular 9+, generates beautiful popups, dialogs, ConfirmBoxes, AlertBoxes, ToastNotifications. Also gives the ability of opening dynamic components directly from typescript!</b><br />
  <sub>Use this popup generator to easily generate beautiful, highly scalable popups. From regular Angular component it renders dynamic component view in popup directly from typescript, including toast notifications, alert box or confirm box.</sub>
</p>

<br />

* **Well documented**: Extremely simple to use - just follow the tutorials and API documentation!
* **Powerful**: It uses Angular factory features - generates any component anywhere in popup without HTML selector!
* **Awesome**: The tool you don't know you needed before!

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Installation](#-installation)
* [➤ Usage](#-usage)
	* [Toast Notification](#toast-notification)
	* [Confirm Box / Alert Box](#confirm-box--alert-box)
	* [Open any component in Dialog](#open-any-component-in-dialog)
		* [Setup of evoke of the dialog:](#setup-of-evoke-of-the-dialog)
		* [Setup of child-dynamic component that is rendered in dialog:](#setup-of-child-dynamic-component-that-is-rendered-in-dialog)
* [➤ License](#-license)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#installation)

## ➤ Installation
Install the library with:
```javascript
npm install @costlydeveloper/ngx-awesome-popup
```




Then import it in your `AppModule`:
```typescript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';

// Import your library
import {ConfirmBoxConfigModule, DialogConfigModule, NgxAwesomePopupModule, ToastNotificationConfigModule} from '@costlydeveloper/ngx-awesome-popup';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,

        // Importing @costlydeveloper/ngx-awesome-popup modules
        NgxAwesomePopupModule.forRoot(),
        DialogConfigModule.forRoot(),
        ConfirmBoxConfigModule.forRoot(),
        ToastNotificationConfigModule.forRoot()
    ],
    providers   : [],
    bootstrap   : [AppComponent]
})
export class AppModule {
}
```
API documentation:
- [NgxAwesomePopupModule](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20NgxAwesomePopupModule)
- [DialogConfigModule](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20DialogConfigModule)
- [ConfirmBoxConfigModule](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20ConfirmBoxConfigModule)
- [ToastNotificationConfigModule](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20ToastNotificationConfigModule)



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#usage)

## ➤ Usage
**Check [The API Documentation](https://github.com/costlydeveloper/ngx-awesome-popup/wiki) for more advance setup.**

### Toast Notification
Simply open toast notification from any component or any custom typescript class:
```typescript
import {Component, OnInit} from '@angular/core';

// import library classes
import {DialogLayoutDisplay, ToastNotificationInitializer} from '@costlydeveloper/ngx-awesome-popup';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit {

    ngOnInit() {
        
        // Call the method
        this.toastNotification();
    }

    // Create the method
    toastNotification() {
        const newToastNotification = new ToastNotificationInitializer();
        newToastNotification.setTitle('Warning!');
        newToastNotification.setDescription('Form is not valid!');
        
        // Choose layout color type
        newToastNotification.setConfig({
            LayoutType: DialogLayoutDisplay.WARNING // SUCCESS | INFO | NONE | DANGER | WARNING
        });
        
        // Simply open the popup
        newToastNotification.openToastNotification$();
    }

}

```

API documentation:
- [ToastNotificationInitializer](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20ToastNotificationInitializer)
- [DialogLayoutDisplay](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Enum:%20DialogLayoutDisplay)
- [IToastNotificationPublicResponse](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Interface:%20IToastNotificationPublicResponse)


### Confirm Box / Alert Box
It is very easy to open Confirm Box or Alert Box from any component or any custom typescript class:
```typescript
import {Component, OnInit} from '@angular/core';

// import library classes
import {DialogLayoutDisplay, ConfirmBoxInitializer} from '@costlydeveloper/ngx-awesome-popup';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
    ngOnInit() {
    
        // Call the method
        this.confirmBox();
    }
    
    // Create the method
    confirmBox() {
        const confirmBox = new ConfirmBoxInitializer();
        confirmBox.setTitle('Are you sure?');
        confirmBox.setDescription('Confirm to delete user: John Doe!');
        confirmBox.setButtonLabels('YES', 'NO');
        
        // Choose layout color type
        confirmBox.setConfig({
            LayoutType: DialogLayoutDisplay.DANGER // SUCCESS | INFO | NONE | DANGER | WARNING
        });
        
        // Simply open the popup and listen which button is clicked
        confirmBox.openConfirmBox$().subscribe(resp => {
            // IConfirmBoxPublicResponse
            console.log('Clicked button response: ', resp);
        });
    }

}

```
API documentation:
- [ConfirmBoxInitializer](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20ConfirmBoxInitializer)
- [DialogLayoutDisplay](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Enum:%20DialogLayoutDisplay)
- [IConfirmBoxPublicResponse](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Interface:%20IConfirmBoxPublicResponse)


### Open any component in Dialog
Simply open any Angular component from any typescript file without HTML selector.
* Send and receive any data with dialog dynamic component and back.
* Set custom buttons and listen the click event inside dynamic component (AnyAngularComponent)

#### Setup of evoke of the dialog:
```typescript
import {Component, OnInit} from '@angular/core';

// import desired angular component for DialogInitializer 
import {AnyAngularComponent} from './any-angular-component/any-angular.component';

// import library classes
import {DialogLayoutDisplay, DialogInitializer, ButtonLayoutDisplay, ButtonMaker} from '@costlydeveloper/ngx-awesome-popup';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit {

    ngOnInit() {
        
        // Call the method.
        this.dialog();
    }

    // Create the method.
    dialog() {
        
        // Instance of DialogInitializer includes any valid angular component as argument.
        const dialogPopup = new DialogInitializer(AnyAngularComponent);
        
        // Any data can be sent to AnyAngularComponent.
        dialogPopup.setCustomData({name: 'John', surname: 'Doe', id: 1});
        
        // Set some configuration.
        dialogPopup.setConfig({
            Width     : '500px',
            LayoutType: DialogLayoutDisplay.NONE // SUCCESS | INFO | NONE | DANGER | WARNING
        });
        
        // Set some custom buttons as list.
        // SUCCESS | INFO | NONE | DANGER | WARNING | PRIMARY | SECONDARY | LINK | DARK | LIGHT
        dialogPopup.setButtons([
            new ButtonMaker('Edit', 'edit', ButtonLayoutDisplay.WARNING), 
            new ButtonMaker('Submit', 'submit', ButtonLayoutDisplay.SUCCESS),
            new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
        ]);
    
        // Simply open the popup and listen which button is clicked and, 
        // receive optional payload from AnyAngularComponent.
        dialogPopup.openDialog$().subscribe(resp => {
            // IDialogPublicResponse
            console.log('dialog response: ', resp);
        });
    }

}

```
API documentation:
- [DialogInitializer](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20DialogInitializer)
- [DialogLayoutDisplay](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Enum:%20DialogLayoutDisplay)
- [ButtonLayoutDisplay](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Enum:%20ButtonLayoutDisplay)
- [ButtonMaker](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20ButtonMaker)
- [IDialogPublicResponse](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Interface:%20IDialogPublicResponse)

#### Setup of child-dynamic component that is rendered in dialog:
The child dynamic component represents AnyAngularComponent from example above.
```typescript
import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {DialogBelonging} from '@costlydeveloper/ngx-awesome-popup';

@Component({
    selector: 'app-any-angular-component',
    templateUrl: './any-angular.component.html',
    styleUrls: ['./any-angular.component.scss']
})
export class AnyAngularComponent implements OnInit {
    
    subscriptions: Subscription[] = [];
    
    // Dependency Injection of the dialogBelonging in constructor is crucial.
    constructor(private dialogBelonging: DialogBelonging) {}
    
    ngOnInit(): void {
        // Check recived data and other available features.
        console.log(this.dialogBelonging);
        
        // Subscribe to button listeners.
        this.subscriptions.push(
            // IDialogEventsController
            this.dialogBelonging.EventsController.onButtonClick$.subscribe((_Button) => {
                if (_Button.ID === 'edit') {
                    
                    // Do some logic for example edit user.
                } else if (_Button.ID === 'submit') {
                    
                    // Do some logic and close popup.
                    this.dialogBelonging.EventsController.close();
                }
                else if (_Button.ID === 'cancel') {
                    
                    // Do some logic and close popup.
                    this.dialogBelonging.EventsController.close();
                }
            })
        );
        
        // Timeout emulates asyinc data.
        setTimeout(() => {
            
            // Close the loader after some data is ready.
            // IDialogEventsController
            this.dialogBelonging.EventsController.closeLoader();
        }, 1000);
    }
    
    ngOnDestroy(): void {
        
        // Care about memory and close all subscriptions.
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
```
API documentation:
- [DialogBelonging](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Class:%20DialogBelonging)
- [IDialogEventsController](https://github.com/costlydeveloper/ngx-awesome-popup/wiki/Interface:%20IDialogEventsController)






[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#license)

## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).

