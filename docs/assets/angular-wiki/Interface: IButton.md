# Interface: IButton

Interface for custom button.

Example:
```typescript
// Custom button object.
const button = {
       ID         : 'confirm_btn',
       Label:     : 'Confirm'
       LayoutType : ButtonLayoutDisplay.SUCCESS
 }
// Or instantiated with ButtonMaker class
const button2 = new ButtonMaker('Confirm', 'confirm_btn', ButtonLayoutDisplay.SUCCESS)
```
* ButtonLayoutDisplay: [ButtonLayoutDisplay](#/documentation/Enum:%20ButtonLayoutDisplay)

## Implemented by

* [*ButtonMaker*](#/documentation/Class:%20ButtonMaker)

## Properties

### ID

• `Optional` **ID**: *string*

___

### Label

• **Label**: *string*

___

### LayoutType

• **LayoutType**: [*ButtonLayoutDisplay*](#/documentation/Enum:%20ButtonLayoutDisplay)
