# Class: DialogConfigModule

This is the module that ignites dynamic dialog modal, its purpose is to load any angular component in
dialog window. Dynamic component means that user can evoke any Angular component in the popup just from typescript. Component view
is dynamically created with the library engine and there is no need to call any selector in HTML to create component view.

It is crucial for user to add this module in angular.app imports.
Below is the example with (optional) default user configuration, that is what will be in setup if there is no
local config when popup is evoked, that means it can be overridden directly when popup is called.
That mean it's predefined config, so it doesn't need to be configured each time when dialog is evoked.
For implementation look: [IDialogUserConfig](#/documentation/Interface:%20IDialogUserConfig).

Example:
```typescript
// app.module imports:
DialogConfigModule.forRoot({
    DialogCoreConfig: {
       Width          : '500px',
       // MinWidth       : '300px',  // example
       // MaxWidth       : '700px',  // example
       Height         : '500px',
       // MinHeight      : '100vh',  // example
       // MaxHeight      : '100px',  // example
       ButtonPosition: 'right', // optional ' center', 'left', 'right'
       LayoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
       LoaderComponent: // Any angular component class name can be included as a loader.
       HideScrollbar  : true,
       EscapeKeyClose : true,
       // FullScreen : true,
       ButtonPosition : 'right',
       LayoutType: DialogLayoutDisplay.INFO,
       // LoaderComponent: // Any Angular component class name can be included as a loader.
       DisplayLoader: false // This will override LoaderComponent.
       AnimationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
       AnimationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
   },
   // optional predefined custom default buttons
    Buttons: [
       new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
       new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
    ],
})
```
* DialogCoreConfig.LayoutType: [DialogLayoutDisplay](#/documentation/Enum:%20DialogLayoutDisplay)
* ButtonLayoutDisplay: [ButtonLayoutDisplay](#/documentation/Enum:%20ButtonLayoutDisplay)
* ButtonMaker: [ButtonMaker](#/documentation/Class:%20ButtonMaker)

## Constructors

### constructor

\+ **new DialogConfigModule**(): [*DialogConfigModule*](#/documentation/Class:%20DialogConfigModule)

**Returns:** [*DialogConfigModule*](#/documentation/Class:%20DialogConfigModule)

## Methods

### forRoot

▸ `Static`**forRoot**(`dialogConfig?`: [*IDialogUserConfig*](#/documentation/Interface:%20IDialogUserConfig)): *ModuleWithProviders*<[*DialogConfigModule*](#/documentation/Class:%20DialogConfigModule)\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `dialogConfig?` | [*IDialogUserConfig*](#/documentation/Interface:%20IDialogUserConfig) |

**Returns:** *ModuleWithProviders*<[*DialogConfigModule*](#/documentation/Class:%20DialogConfigModule)\>
