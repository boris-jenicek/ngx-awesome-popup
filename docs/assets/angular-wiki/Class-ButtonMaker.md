# Class: ButtonMaker

**`returns`** It will return custom button object ready to be used in child component layout.

## Implements

- [`IButton`](#/documentation/Interface-IButton)

## Constructors

### constructor

• **new ButtonMaker**(`label`, `ID`, `layoutType?`, `disabled?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `label` | `string` | `undefined` |
| `ID` | `string` | `undefined` |
| `layoutType` | [`ButtonLayoutDisplay`](#/documentation/Enum-ButtonLayoutDisplay) | `ButtonLayoutDisplay.PRIMARY` |
| `disabled` | `boolean` | `false` |

## Properties

### ID

• **ID**: `string`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[ID](#/documentation/Interface-IButton#id)

___

### disabled

• **disabled**: `boolean` = `false`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[disabled](#/documentation/Interface-IButton#disabled)

___

### hidden

• **hidden**: `boolean` = `false`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[hidden](#/documentation/Interface-IButton#hidden)

___

### label

• **label**: `string`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[label](#/documentation/Interface-IButton#label)

___

### layoutType

• **layoutType**: [`ButtonLayoutDisplay`](#/documentation/Enum-ButtonLayoutDisplay) = `ButtonLayoutDisplay.PRIMARY`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[layoutType](#/documentation/Interface-IButton#layouttype)

## Methods

### disable

▸ **disable**(): `void`

#### Returns

`void`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[disable](#/documentation/Interface-IButton#disable)

___

### enable

▸ **enable**(): `void`

#### Returns

`void`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[enable](#/documentation/Interface-IButton#enable)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[hide](#/documentation/Interface-IButton#hide)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Implementation of

[IButton](#/documentation/Interface-IButton).[show](#/documentation/Interface-IButton#show)
