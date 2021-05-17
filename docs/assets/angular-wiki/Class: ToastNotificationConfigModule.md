# Class: ToastNotificationConfigModule

This is the module that ignites Toast notifications dialog, its purpose is to show toast popup in a
small dialog window in the corner of the screen. User can provide title and message and include buttons, or setup auto disappearing.
Toast notifications are available in predefined layout types (enums): [DialogLayoutDisplay](#/documentation/Enum:%20DialogLayoutDisplay).

It is crucial for user to add this module in angular.app imports.
Below is the example with (optional) default user configuration, that's what will be used if there is no
local config when popup is evoked, that means it can be overridden directly when popup is evoked.
For implementation look: [IToastNotificationUserConfig](#/documentation/Interface:%20IToastNotificationUserConfig).

Example:
```typescript
// app.module imports:
ToastNotificationConfigModule.forRoot({
   ToastCoreConfig: {
      Width: '300px',
   },
   GlobalSettings: {
      // The number of toast notifications that can be shown at once.
      AllowedNotificationsAtOnce: 4,

       // Milliseconds it will be ignored if buttons are included.
      AutoCloseDelay: 3000
   },
   // Optional default dispatch object.
   Dispatch: {
     Title: 'Default title',
     Message: 'Default message'
  },
  Buttons: [
     new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
     new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
  ]
})
```
* ToastCoreConfig: [IToastCoreConfig](#/documentation/Interface:%20IToastCoreConfig)
* GlobalSettings: [IGlobalToastSettings](#/documentation/Interface:%20IGlobalToastSettings)
* Dispatch: [IDispatch](#/documentation/Interface:%20IDispatch)
* Buttons: [IButton](#/documentation/Interface:%20IButton)
* ButtonMaker: [ButtonMaker](#/documentation/Class:%20ButtonMaker)

## Constructors

### constructor

\+ **new ToastNotificationConfigModule**(): [*ToastNotificationConfigModule*](#/documentation/Class:%20ToastNotificationConfigModule)

**Returns:** [*ToastNotificationConfigModule*](#/documentation/Class:%20ToastNotificationConfigModule)

## Methods

### forRoot

▸ `Static`**forRoot**(`toastNotificationConfig?`: [*IToastNotificationUserConfig*](#/documentation/Interface:%20IToastNotificationUserConfig)): *ModuleWithProviders*<[*ToastNotificationConfigModule*](#/documentation/Class:%20ToastNotificationConfigModule)\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `toastNotificationConfig?` | [*IToastNotificationUserConfig*](#/documentation/Interface:%20IToastNotificationUserConfig) |

**Returns:** *ModuleWithProviders*<[*ToastNotificationConfigModule*](#/documentation/Class:%20ToastNotificationConfigModule)\>
