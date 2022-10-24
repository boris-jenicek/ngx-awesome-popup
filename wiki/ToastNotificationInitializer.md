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
* IToastCoreConfig: [IToastCoreConfig](../wiki/IToastCoreConfig)
* layoutType: [DialogLayoutDisplay](../wiki/DialogLayoutDisplay)
* IToastNotificationPublicResponse: [IToastNotificationPublicResponse](../wiki/IToastNotificationPublicResponse)

## Table of contents

### Constructors

- [constructor](../wiki/ToastNotificationInitializer#constructor)

### Methods

- [openToastNotification$](../wiki/ToastNotificationInitializer#opentoastnotification$)
- [setButtonLabels](../wiki/ToastNotificationInitializer#setbuttonlabels)
- [setButtons](../wiki/ToastNotificationInitializer#setbuttons)
- [setConfig](../wiki/ToastNotificationInitializer#setconfig)
- [setDispatch](../wiki/ToastNotificationInitializer#setdispatch)
- [setMessage](../wiki/ToastNotificationInitializer#setmessage)
- [setTitle](../wiki/ToastNotificationInitializer#settitle)

## Constructors

### constructor

• **new ToastNotificationInitializer**()

## Methods

### openToastNotification$

▸ **openToastNotification$**(): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

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
| `_Buttons` | [`IButton`](../wiki/IButton)[] |

#### Returns

`void`

___

### setConfig

▸ **setConfig**(`_ToastNotificationConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ToastNotificationConfig` | [`IToastCoreConfig`](../wiki/IToastCoreConfig) |

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
