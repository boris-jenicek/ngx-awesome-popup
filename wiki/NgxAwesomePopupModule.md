# Class: NgxAwesomePopupModule

This is the main module of the library, it is crucial to be added within angular.app
imports as an example with optional argument, look: [IGlobalUserConfig](../wiki/IGlobalUserConfig)
Style your application by adding a color list like in this example.

```typescript
// app.module imports:
NgxAwesomePopupModule.forRoot({
    colorList: {
           primary  : '#ff9e00', // optional
           secondary: '#989ea5', // optional
           info     : '#2f8ee5', // optional
           success  : '#3caea3', // optional
           warning  : '#ffc107', // optional
           danger   : '#e46464', // optional
           light    : '#fbfbfb', // optional
           dark     : '#343a40'  // optional
          }
})
```

## Table of contents

### Constructors

- [constructor](../wiki/NgxAwesomePopupModule#constructor)

### Methods

- [forRoot](../wiki/NgxAwesomePopupModule#forroot)

## Constructors

### constructor

• **new NgxAwesomePopupModule**(`injector`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `injector` | `Injector` |

## Methods

### forRoot

▸ `Static` **forRoot**(`globalConfig?`): `ModuleWithProviders`<[`NgxAwesomePopupModule`](../wiki/NgxAwesomePopupModule)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `globalConfig?` | [`IGlobalUserConfig`](../wiki/IGlobalUserConfig) |

#### Returns

`ModuleWithProviders`<[`NgxAwesomePopupModule`](../wiki/NgxAwesomePopupModule)\>
