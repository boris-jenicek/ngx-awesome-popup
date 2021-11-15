# Class: ResetGlobalConfig

```typescript
// Instantiate config object as example below to change global settings on-fly it takes IGlobalUserConfig
as the argument.
new ResetGlobalConfig({
    ColorList: {
           Primary  : '#ff9e00', // optional shade of the overlay color
           Secondary: '#989ea5', // optional
           Info     : '#2f8ee5', // optional
           Success  : '#3caea3', // optional
           Warning  : '#ffc107', // optional
           Danger   : '#e46464', // optional
           Light    : '#fbfbfb', // optional
           Dark     : '#343a40'  // optional
          }
})
```

## Constructors

### constructor

\+ **new ResetGlobalConfig**(`globalConfig?`: [*IGlobalUserConfig*](#/documentation/Interface:%20IGlobalUserConfig)): [*ResetGlobalConfig*](#/documentation/Class:%20ResetGlobalConfig)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `globalConfig?` | [*IGlobalUserConfig*](#/documentation/Interface:%20IGlobalUserConfig) |

**Returns:** [*ResetGlobalConfig*](#/documentation/Class:%20ResetGlobalConfig)
