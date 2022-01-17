# Class: ToastNotificationInitializer

This is the class that needs to be instantiated to set up and ignite a ToastNotification,
its purpose is to show short notification to end-user, or even interact with user.
It can be evoked from any angular typescript file.

Below is the example with (some optional) user configuration,
it will override default configuration from app.module.

Example:
```typescript
// Create the initializer.
const newToastNotification = new ToastNotificationInitializer();

// Set desired Title.
newToastNotification.setTitle('Warning!');

// Set desired Message.
newToastNotification.setMessage('Form is not valid!');

// Set desired configuration.
newToastNotification.setConfig({
     layoutType: DialogLayoutDisplay.WARNING
  });

// Open a ToastNotification.
newConfirmBox.openConfirmBox$().subscribe(resp => {
  console.log('confirmBox response: ', resp);
 });
```
* IToastCoreConfig: [IToastCoreConfig](#/documentation/interface-IToastCoreConfig)
* layoutType: [DialogLayoutDisplay](#/documentation/enum-DialogLayoutDisplay)
* IToastNotificationPublicResponse: [IToastNotificationPublicResponse](#/documentation/interface-IToastNotificationPublicResponse)

## Constructors

### constructor

• **new ToastNotificationInitializer**()

## Methods

### openToastNotification$

▸ **openToastNotification$**(): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

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
| `_Buttons` | [`IButton`](#/documentation/interface-IButton)[] |

#### Returns

`void`

___

### setConfig

▸ **setConfig**(`_ToastNotificationConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ToastNotificationConfig` | [`IToastCoreConfig`](#/documentation/interface-IToastCoreConfig) |

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
