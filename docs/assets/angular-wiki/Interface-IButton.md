# Interface: IButton

Interface for custom button.

Example:
```typescript
// Custom button object.
const button = {
       ID         : 'confirm_btn',
       label:     : 'Confirm',
       layoutType : ButtonLayoutDisplay.SUCCESS
 }
// Or instantiated with ButtonMaker class
const button2 = new ButtonMaker('Confirm', 'confirm_btn', ButtonLayoutDisplay.SUCCESS)
```
* ButtonLayoutDisplay: [ButtonLayoutDisplay](#/documentation/Enum-ButtonLayoutDisplay)

## Implemented by

- [`ButtonMaker`](#/documentation/Class-ButtonMaker)

## Properties

### ID

• `Optional` **ID**: `string`

___

### disabled

• **disabled**: `boolean`

___

### hidden

• **hidden**: `boolean`

___

### label

• **label**: `string`

___

### layoutType

• **layoutType**: [`ButtonLayoutDisplay`](#/documentation/Enum-ButtonLayoutDisplay)

## Methods

### disable

▸ **disable**(): `void`

#### Returns

`void`

___

### enable

▸ **enable**(): `void`

#### Returns

`void`

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

___

### show

▸ **show**(): `void`

#### Returns

`void`
