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

## Constructors

### constructor

• **new ToastEvokeService**()

## Methods

### customFive

▸ **customFive**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

___

### customFour

▸ **customFour**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

___

### customOne

▸ **customOne**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

___

### customThree

▸ **customThree**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

___

### customTwo

▸ **customTwo**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

___

### danger

▸ **danger**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

___

### info

▸ **info**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

___

### success

▸ **success**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

___

### warning

▸ **warning**(`title`, `message`, `confirmLabel?`, `declineLabel?`): `Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel?` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IToastNotificationPublicResponse`](#/documentation/interface-IToastNotificationPublicResponse)\>
