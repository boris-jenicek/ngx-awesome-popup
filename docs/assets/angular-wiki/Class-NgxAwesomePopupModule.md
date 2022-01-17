# Class: NgxAwesomePopupModule

This is the main module of the library, it is crucial to be added within angular.app
imports as an example with optional argument, look: [IGlobalUserConfig](#/documentation/interface-IGlobalUserConfig)
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

## Constructors

### constructor

• **new NgxAwesomePopupModule**(`injector`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `injector` | `Injector` |

## Methods

### forRoot

▸ `Static` **forRoot**(`globalConfig?`): `ModuleWithProviders`<[`NgxAwesomePopupModule`](#/documentation/class-NgxAwesomePopupModule)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `globalConfig?` | [`IGlobalUserConfig`](#/documentation/interface-IGlobalUserConfig) |

#### Returns

`ModuleWithProviders`<[`NgxAwesomePopupModule`](#/documentation/class-NgxAwesomePopupModule)\>
