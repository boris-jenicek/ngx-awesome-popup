# Class: ConfirmBoxConfigModule

This is the module that ignites Confirm box dialog, its purpose is to show popup in a
small dialog window in the middle of the screen. User can provide title, message and include buttons.
Confirm box is available in predefined layout types (enums): [DialogLayoutDisplay](#/documentation/Enum:%20DialogLayoutDisplay).

It is crucial for user to add this module in angular.app imports.
Below is the example with (optional) default user configuration, that's what will be used if there is no
local config when popup is evoked, that means it can be overridden directly when popup is evoked.
That mean it's predefined config, so it doesn't need to be configured each time when confirm box is evoked.
For implementation look: [IConfirmBoxUserConfig](#/documentation/Interface:%20IConfirmBoxUserConfig).

Example:
```typescript
// app.module imports:
ConfirmBoxConfigModule.forRoot({
   confirmBoxCoreConfig: {
      width: '700px',
      layoutType: DialogLayoutDisplay.DANGER,
      buttonPosition: 'center', // optional ' center', 'left', 'right'
      layoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      allowHtmlMessage: true, // default false
      disableIcon: true, // default false
      customStyles: {
          titleCSS: 'color: #ddd; background: #333; font-size: 20px; padding: 20px',
          buttonSectionCSS: 'background: #333',
          buttonCSS: 'font-size: 14px;',
          textCSS: 'color: #ddd; font-size: 16px; background: #333;',
          wrapperCSS: 'background: #333;'
      }
   },
   dispatch: {  // Optional default dispatch object.
      title: 'Default title',
      message: 'Default message'
   },
   // optional predefined custom default buttons
   buttons     : [
      new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
      new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
   ]
})
```
* confirmBoxCoreConfig: [IConfirmBoxCoreConfig](#/documentation/Interface:%20IConfirmBoxCoreConfig)
* dispatch: [IDispatch](#/documentation/Interface:%20IDispatch)
* buttons: [IButton](#/documentation/Interface:%20IButton)
* ButtonMaker: [ButtonMaker](#/documentation/Class:%20ButtonMaker)

## Constructors

### constructor

\+ **new ConfirmBoxConfigModule**(): [*ConfirmBoxConfigModule*](#/documentation/Class:%20ConfirmBoxConfigModule)

**Returns:** [*ConfirmBoxConfigModule*](#/documentation/Class:%20ConfirmBoxConfigModule)

## Methods

### forRoot

▸ `Static`**forRoot**(`confirmBoxConfig?`: [*IConfirmBoxUserConfig*](#/documentation/Interface:%20IConfirmBoxUserConfig)): *ModuleWithProviders*<[*ConfirmBoxConfigModule*](#/documentation/Class:%20ConfirmBoxConfigModule)\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `confirmBoxConfig?` | [*IConfirmBoxUserConfig*](#/documentation/Interface:%20IConfirmBoxUserConfig) |

**Returns:** *ModuleWithProviders*<[*ConfirmBoxConfigModule*](#/documentation/Class:%20ConfirmBoxConfigModule)\>
