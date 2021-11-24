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
   ConfirmBoxCoreConfig: {
      Width: '700px',
      LayoutType: DialogLayoutDisplay.DANGER,
      ButtonPosition: 'center', // optional ' center', 'left', 'right'
      LayoutType: DialogLayoutDisplay.SUCCESS, // SUCCESS | INFO | NONE | DANGER | WARNING
      AnimationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      AnimationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      AllowHTMLMessage: true, // default false
      DisableIcon: true, // default false
      CustomStyles: {
          TitleCSS: 'color: #ddd; background: #333; font-size: 20px; padding: 20px',
          ButtonSectionCSS: 'background: #333',
          ButtonCSS: 'font-size: 14px;',
          TextCSS: 'color: #ddd; font-size: 16px; background: #333;',
          WrapperCSS: 'background: #333;'
      }
   },
   Dispatch: {  // Optional default dispatch object.
      Title: 'Default title',
      Message: 'Default message'
   },
   // optional predefined custom default buttons
   Buttons     : [
      new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
      new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
   ]
})
```
* ConfirmBoxCoreConfig: [IConfirmBoxCoreConfig](#/documentation/Interface:%20IConfirmBoxCoreConfig)
* Dispatch: [IDispatch](#/documentation/Interface:%20IDispatch)
* Buttons: [IButton](#/documentation/Interface:%20IButton)
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
