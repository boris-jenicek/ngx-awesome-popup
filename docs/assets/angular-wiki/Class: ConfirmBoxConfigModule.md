# Class: ConfirmBoxConfigModule

This is the module that ignites Confirm box dialog, its purpose is to show popup in a
small dialog window in the middle of the screen. User can provide title, message and include buttons.
Confirm box is available in predefined layout types (enums): [DialogLayoutDisplay](#/documentation/Enum:%20DialogLayoutDisplay).

It is crucial for user to add this module in angular.app imports.
Below is the example with (optional) default user configuration, that's what will be used if there is no
local config when popup is evoked, that means it can be overridden directly when popup is evoked.
For implementation look: [IConfirmBoxUserConfig](#/documentation/Interface:%20IConfirmBoxUserConfig).

Example:
```typescript
// app.module imports:
ConfirmBoxConfigModule.forRoot({
   ConfirmBoxCoreConfig: {
      Width: '700px',
      LayoutType: DialogLayoutDisplay.DANGER,
      ButtonPosition: 'center'
   },
   Dispatch: {  // Optional default dispatch object.
      Title: 'Default title',
      Message: 'Default message'
   },
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
