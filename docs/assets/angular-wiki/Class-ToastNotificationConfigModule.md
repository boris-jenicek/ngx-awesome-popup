# Class: ToastNotificationConfigModule

This is the module that ignites Toast notifications dialog, its purpose is to show toast popup in a
small dialog window in the corner of the screen. User can provide title and message and include buttons, or setup auto disappearing.
Toast notifications are available in predefined layout types (enums): [DialogLayoutDisplay](#/documentation/enum-DialogLayoutDisplay).

It is crucial for user to add this module in angular.app imports.
Below is the example with (optional) default user configuration, that's what will be used if there is no
local config when popup is evoked, that means it can be overridden directly when popup is evoked.
That mean it's predefined config, so it doesn't need to be configured each time when toast is evoked.
For implementation look: [IToastNotificationUserConfig](#/documentation/interface-IToastNotificationUserConfig).

Example:
```typescript
// app.module imports:
ToastNotificationConfigModule.forRoot({
   toastCoreConfig: {
      // AutoClose it will be ignored if buttons are included.
      autoCloseDelay: 3000, // milliseconds, optional set 0 to never expires
      textPosition: 'right', // optional ' center', 'left', 'right'
      layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
      progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      toastPosition: ToastPositionEnum.TOP_RIGHT,  // TOP_LEFT | TOP_CENTER | TOP_RIGHT | TOP_FULL_WIDTH | BOTTOM_LEFT | BOTTOM_CENTER | BOTTOM_RIGHT | BOTTOM_FULL_WIDTH
      allowHtmlMessage: true,  // default false
      disableIcon: true, // default false
      buttonPosition: 'right', // optional ' center', 'left', 'right'
      customStyles: {
          titleCSS: 'background: rgba(0,0,0, .7); font-size: 20px; padding: 20px',
          buttonSectionCSS: 'background: #333',
          buttonCSS: 'font-size: 14px;',
          textCSS: 'color: #ddd; font-size: 16px; background: #333;'
        }
   },
   globalSettings: {
      // The number of toast notifications that can be shown at once.
      allowedNotificationsAtOnce: 4
   },
   // Optional default dispatch object.
   dispatch: {
     title: 'Default title',
     message: 'Default message'
  },
  // optional predefined custom default buttons
  buttons: [
     new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
     new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
  ]
})
```
* toastCoreConfig: [IToastCoreConfig](#/documentation/interface-IToastCoreConfig)
* globalSettings: [IGlobalToastSettings](#/documentation/interface-IGlobalToastSettings)
* dispatch: [IDispatch](#/documentation/interface-IDispatch)
* buttons: [IButton](#/documentation/interface-IButton)
* ButtonMaker: [ButtonMaker](#/documentation/class-ButtonMaker)

## Table of contents

### Constructors

- [constructor](#/documentation/class-ToastNotificationConfigModule#constructor)

### Methods

- [forRoot](#/documentation/class-ToastNotificationConfigModule#forroot)

## Constructors

### constructor

• **new ToastNotificationConfigModule**()

## Methods

### forRoot

▸ `Static` **forRoot**(`toastNotificationConfig?`): `ModuleWithProviders`<[`ToastNotificationConfigModule`](#/documentation/class-ToastNotificationConfigModule)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `toastNotificationConfig?` | [`IToastNotificationUserConfig`](#/documentation/interface-IToastNotificationUserConfig) |

#### Returns

`ModuleWithProviders`<[`ToastNotificationConfigModule`](#/documentation/class-ToastNotificationConfigModule)\>
