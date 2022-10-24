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
* ButtonLayoutDisplay: [ButtonLayoutDisplay](../wiki/ButtonLayoutDisplay)

## Implemented by

- [`ButtonMaker`](../wiki/ButtonMaker)

## Table of contents

### Properties

- [ID](../wiki/IButton#id)
- [disabled](../wiki/IButton#disabled)
- [hidden](../wiki/IButton#hidden)
- [label](../wiki/IButton#label)
- [layoutType](../wiki/IButton#layouttype)

### Methods

- [disable](../wiki/IButton#disable)
- [enable](../wiki/IButton#enable)
- [hide](../wiki/IButton#hide)
- [show](../wiki/IButton#show)

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

• **layoutType**: [`ButtonLayoutDisplay`](../wiki/ButtonLayoutDisplay)

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
