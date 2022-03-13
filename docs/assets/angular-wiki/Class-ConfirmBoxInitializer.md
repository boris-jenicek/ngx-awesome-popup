# Class: ConfirmBoxInitializer

This is the class that needs to be instantiated to set up and ignite a ConfirmBox and create content.
Its purpose is to get confirmation response from end-user. It can be called from any angular
typescript file.

Below is example with (some optional) user configuration,
it will override default configuration from app.module.

Example:
```typescript
// Create the initializer.
const newConfirmBox = new ConfirmBoxInitializer();

// Set desired dispatch: _Title: string, _Message: string.
newConfirmBox.setDispatch('Are you sure?', 'That action will delete user!');

// Set desired configuration.
newConfirmBox.setConfig({
     layoutType: DialogLayoutDisplay.DANGER
  });

// Set button labels.
newConfirmBox.setButtonLabels('YES', 'NO');

// Open a ConfirmBox, and get clicked button-id in response.
newConfirmBox.openConfirmBox$().subscribe(resp => {
  // IConfirmBoxPublicResponse
  console.log('confirmBox response: ', resp);
 });
```
* IConfirmBoxCoreConfig: [IConfirmBoxCoreConfig](#/documentation/Interface-IConfirmBoxCoreConfig)
* layoutType: [DialogLayoutDisplay](#/documentation/Enum-DialogLayoutDisplay)
* IConfirmBoxPublicResponse: [IConfirmBoxPublicResponse](#/documentation/Interface-IConfirmBoxPublicResponse)

## Constructors

### constructor

• **new ConfirmBoxInitializer**()

## Methods

### openConfirmBox$

▸ **openConfirmBox$**(): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/Interface-IConfirmBoxPublicResponse)\>

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/Interface-IConfirmBoxPublicResponse)\>

___

### setButtonLabels

▸ **setButtonLabels**(`_Confirm`, `_Decline?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_Confirm` | `string` |
| `_Decline?` | `string` |

#### Returns

`void`

___

### setButtons

▸ **setButtons**(`_Buttons`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_Buttons` | [`IButton`](#/documentation/Interface-IButton)[] |

#### Returns

`void`

___

### setConfig

▸ **setConfig**(`_ConfirmBoxCoreConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ConfirmBoxCoreConfig` | [`IConfirmBoxCoreConfig`](#/documentation/Interface-IConfirmBoxCoreConfig) |

#### Returns

`void`

___

### setDispatch

▸ **setDispatch**(`_Title`, `_Message?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `_Title` | `string` | `undefined` |
| `_Message` | `string` | `null` |

#### Returns

`void`

___

### setMessage

▸ **setMessage**(`_Message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_Message` | `string` |

#### Returns

`void`

___

### setTitle

▸ **setTitle**(`_Title`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_Title` | `string` |

#### Returns

`void`
