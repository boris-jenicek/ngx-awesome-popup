# Class: DialogConfigModule

This is the module that ignites dynamic dialog modal, its purpose is to load any angular component in
dialog window. Dynamic component means that user can evoke any Angular component in the popup just from typescript. Component view
is dynamically created with the library engine and there is no need to call any selector in HTML to create component view.

It is crucial for user to add this module in angular.app imports.
Below is the example with (optional) default user configuration, that is what will be in setup if there is no
local config when popup is evoked, that means it can be overridden directly when popup is called.
For implementation look: [IDialogUserConfig](#/documentation/Interface:%20IDialogUserConfig).

Example:
```typescript
// app.module imports:
DialogConfigModule.forRoot({
    DialogCoreConfig: {
       Width        : '500px',
       ButtonPosition: 'right',
       LayoutType: DialogLayoutDisplay.INFO,
       LoaderComponent: // Any angular component class name can be included as a loader.
    },
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
