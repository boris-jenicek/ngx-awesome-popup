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
    dialogCoreConfig: {
       width          : '500px',
       // minWidth       : '300px',  // example
       // maxWidth       : '700px',  // example
       height         : '500px',
       // minHeight      : '100vh',  // example
       // maxHeight      : '100px',  // example
       buttonPosition: 'right', // optional ' center', 'left', 'right'
       layoutType: DialogLayoutDisplay.INFO, // SUCCESS | INFO | NONE | DANGER | WARNING
       // loaderComponent: // Any angular component class name can be included as a loader.
       hideScrollbar  : true,
       escapeKeyClose : true,
       // FullScreen : true,
       buttonPosition : 'right',
       layoutType: DialogLayoutDisplay.INFO,
       // LoaderComponent: // Any Angular component class name can be included as a loader.
       displayLoader: false // This will override LoaderComponent.
       animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
       animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
       customStyles: {
         buttonSectionCSS: 'background: #333',
         buttonCSS: 'font-size: 30px;',
         wrapperCSS: 'background: #333;'
       }
   },
   // optional predefined custom default buttons
    buttons: [
       new ButtonMaker('Ok', 'ok', ButtonLayoutDisplay.PRIMARY),
       new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
    ],
})
```
* dialogCoreConfig.layoutType: [DialogLayoutDisplay](#/documentation/Enum:%20DialogLayoutDisplay)
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
