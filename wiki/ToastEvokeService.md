# Class: ToastEvokeService

Global styles set in app.module.ts will affect the instance. See <a href="https://costlydeveloper.github.io/ngx-awesome-popup/#/documentation/class-ToastEvokeService">Global Config</a> setup.
```typescript
// Inject this service as Dependency Injection in a constructor like example below,
// and evoke the popup simply calling one of its methods.

 constructor(private toastEvokeService: ToastEvokeService) {}

// evoke it anywhere, no need to unsubscribe, it has an auto unsubscribe.
// Type SUCCESS
this.toastEvokeService.success('I am title!', 'I am a message!').subscribe();
// Type INFO
this.toastEvokeService.info('I am title!', 'I am a message!').subscribe();
// Type WARNING
this.toastEvokeService.warning('I am title!', 'I am a message!').subscribe();
// Type ERROR
this.toastEvokeService.danger('I am title!', 'I am a message!').subscribe();
```

## Table of contents

### Constructors

- [constructor](../wiki/ToastEvokeService#constructor)

### Methods

- [customFive](../wiki/ToastEvokeService#customfive)
- [customFour](../wiki/ToastEvokeService#customfour)
- [customOne](../wiki/ToastEvokeService#customone)
- [customThree](../wiki/ToastEvokeService#customthree)
- [customTwo](../wiki/ToastEvokeService#customtwo)
- [danger](../wiki/ToastEvokeService#danger)
- [info](../wiki/ToastEvokeService#info)
- [success](../wiki/ToastEvokeService#success)
- [warning](../wiki/ToastEvokeService#warning)

## Constructors

### constructor

• **new ToastEvokeService**()

## Methods

### customFive

▸ **customFive**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

___

### customFour

▸ **customFour**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

___

### customOne

▸ **customOne**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

___

### customThree

▸ **customThree**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

___

### customTwo

▸ **customTwo**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

___

### danger

▸ **danger**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

___

### info

▸ **info**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

___

### success

▸ **success**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

___

### warning

▸ **warning**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](../wiki/IToastNotificationPublicResponse)\>
