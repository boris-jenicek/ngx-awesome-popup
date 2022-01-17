# Class: DialogInitializer

This is the class that needs to be instantiated to set up and ignite a Dialog and create dynamic component,
its purpose is to render any angular component view with specific configuration from any angular typescript file.
Dynamic component means that user can evoke the popup from typescript and component view
is dynamically created with the Awesome Popup engine. There is no need to call any selector in HTML to create component view.

DialogInitializer can send data to child component (dynamic component) where data will be accessible with [DialogBelonging](#/documentation/class-DialogBelonging).

Below is the example with (some optional) user configuration,
it will override default configuration from app.module.

Example:
```typescript
 import {DialogInitializer, DialogLayoutDisplay, ButtonMaker, ButtonLayoutDisplay} from 'ngx-awesome-popup';
 import {DynamicComponent} from './dynamic/dynamic.component';

 const newDialogPopup = new DialogInitializer(DynamicComponent); // Any Angular component.

 // Custom data will be sent to dynamic component available in dialogBelonging object.
 newDialogPopup.setCustomData({name: 'John', surname: 'Doe', id: 1});

 // Local config settings IDialogCoreConfig.
 newDialogPopup.setConfig({
     layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
     height: '500px',  // optional
     // maxHeight: '600px',  // optional
     // minHeight: '200px',  // optional
     // width: '500px', // optional
     // maxWidth: '600px', // optional
     // minWidth: '200px', // optional
     // hideScrollbar: true, // optional, default is false
     // fullScreen: true, // optional, default is false
     // escapeKeyClose: true, // optional, default is false
     // buttonPosition: "left", // optional, default is "right"
     // loaderComponent: Any Angular component,
     // customStyles: {
     //     buttonSectionCSS: 'background: #333',
     //     buttonCSS: 'font-size: 30px;',
     //     wrapperCSS: 'background: #333;'
     //   }
  });

 // Custom buttons, listener is available in child component in dialogBelonging object.
 newDialogPopup.setButtons([
     new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
     new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY) // SUCCESS | INFO | NONE | DANGER | WARNING | PRIMARY | SECONDARY | LINK | DARK | LIGHT
 ]);

 // Command to open dialog, it returns observable.
 newDialogPopup.openDialog$<any>().subscribe(resp => {
          console.log('response: ', resp.Payload);
      });
```
* IDialogCoreConfig: [IDialogCoreConfig](#/documentation/interface-IDialogCoreConfig)
* layoutType: [DialogLayoutDisplay](#/documentation/enum-DialogLayoutDisplay)
* ButtonLayoutDisplay: [ButtonLayoutDisplay](#/documentation/enum-ButtonLayoutDisplay)
* ButtonMaker: [ButtonMaker](#/documentation/class-ButtonMaker)
* IDialogPublicResponse: [IDialogPublicResponse](#/documentation/interface-IDialogPublicResponse)

## Table of contents

### Constructors

- [constructor](#/documentation/class-DialogInitializer#constructor)

### Methods

- [openDialog$](#/documentation/class-DialogInitializer#opendialog$)
- [setButtons](#/documentation/class-DialogInitializer#setbuttons)
- [setConfig](#/documentation/class-DialogInitializer#setconfig)
- [setCustomData](#/documentation/class-DialogInitializer#setcustomdata)

## Constructors

### constructor

• **new DialogInitializer**(`component`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `component` | `Type`<`any`\> |

## Methods

### openDialog$

▸ **openDialog$**<`ResponsePayload`\>(): `Observable`<[`IDialogPublicResponse`](#/documentation/interface-IDialogPublicResponse)<`ResponsePayload`\>\>

Generic method accept expected payload from dynamic child component.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ResponsePayload` | `any` |

#### Returns

`Observable`<[`IDialogPublicResponse`](#/documentation/interface-IDialogPublicResponse)<`ResponsePayload`\>\>

___

### setButtons

▸ **setButtons**(`_Buttons`): `void`

It accepts list of custom buttons

#### Parameters

| Name | Type |
| :------ | :------ |
| `_Buttons` | [`IButton`](#/documentation/interface-IButton)[] |

#### Returns

`void`

___

### setConfig

▸ **setConfig**(`_DialogConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_DialogConfig` | [`IDialogCoreConfig`](#/documentation/interface-IDialogCoreConfig) |

#### Returns

`void`

___

### setCustomData

▸ **setCustomData**(`_CustomData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_CustomData` | `any` |

#### Returns

`void`
