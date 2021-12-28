# Interface: IButton

Interface for custom button.

Example:
```typescript
// Custom button object.
const button = {
       ID         : 'confirm_btn',
       label:     : 'Confirm'
       layoutType : ButtonLayoutDisplay.SUCCESS
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

### label

• **label**: *string*

___

### layoutType

• **layoutType**: [*ButtonLayoutDisplay*](#/documentation/Enum:%20ButtonLayoutDisplay)
