# Class: ConfirmBoxEvokeService

Global styles set in app.module.ts will affect the instance. See <a href="https://costlydeveloper.github.io/ngx-awesome-popup/#/documentation/class-ToastEvokeService">Global Config</a> setup.
```typescript
// Inject this service as Dependency Injection in a constructor like example below,
// and evoke the popup simply calling one of its methods.

 constructor(private confirmBoxEvokeService: ConfirmBoxEvokeService) {}

// evoke it anywhere, no need to unsubscribe, it has an auto unsubscribe.
// Type SUCCESS
this.confirmBoxEvokeService.success('I am title!', 'I am a message!', 'Confirm', 'Decline').subscribe(resp => console.log('resp', resp));
// Type INFO
this.confirmBoxEvokeService.info('I am title!', 'I am a message!', 'Confirm', 'Decline').subscribe(resp => console.log('resp', resp));
// Type WARNING
this.confirmBoxEvokeService.warning('I am title!', 'I am a message!', 'Confirm', 'Decline').subscribe(resp => console.log('resp', resp));
// Type ERROR
this.confirmBoxEvokeService.danger('I am title!', 'I am a message!', 'Confirm', 'Decline').subscribe(resp => console.log('resp', resp));
```

## Constructors

### constructor

• **new ConfirmBoxEvokeService**()

## Methods

### customFive

▸ **customFive**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

___

### customFour

▸ **customFour**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

___

### customOne

▸ **customOne**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

___

### customThree

▸ **customThree**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

___

### customTwo

▸ **customTwo**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

___

### danger

▸ **danger**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

___

### info

▸ **info**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

___

### success

▸ **success**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

___

### warning

▸ **warning**(`title`, `message`, `confirmLabel`, `declineLabel?`): `Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `message` | `string` |
| `confirmLabel` | `string` |
| `declineLabel?` | `string` |

#### Returns

`Observable`<[`IConfirmBoxPublicResponse`](#/documentation/interface-IConfirmBoxPublicResponse)\>
