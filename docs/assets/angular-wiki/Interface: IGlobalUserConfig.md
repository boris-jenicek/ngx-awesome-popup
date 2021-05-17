# Interface: IGlobalUserConfig

Each property of [ColorList](#/documentation/Interface:%20IGlobalUserConfig#colorlist) represent a string which represent a color in hex or rgb/rgba format.
For available color types(properties) check [IColorTypes](#/documentation/Interface:%20IColorTypes) interface.
Every color is optional, and it will reflect on dialog or button color types and its color contrast or variance.
 * ```typescript
// ColorList object example.
const colorList = {
        ColorList: {
           Primary  : '#ff9e00',
           Secondary: '#989ea5',
           Info     : '#2f8ee5',
           Success  : '#3caea3',
           Warning  : '#ffc107',
           Danger   : '#e46464',
           Light    : '#fbfbfb',
           Dark     : '#343a40'
          }
       }
```

## Properties

### ColorList

• `Optional` **ColorList**: [*IColorTypes*](#/documentation/Interface:%20IColorTypes)
