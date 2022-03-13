# Interface: IGlobalUserConfig

Each property of the colorList represent a string which represent a color in hex or rgb/rgba format.
For available color types(properties) check [IColorTypes](#/documentation/Interface-IColorTypes) interface.
Every color is optional, and it will reflect on dialog or button color types and its color contrast or variance.
 * ```typescript
// colorList object example.
const colorList = {
        colorList: {
           primary  : '#ff9e00',
           secondary: '#989ea5',
           info     : '#2f8ee5',
           success  : '#3caea3',
           warning  : '#ffc107',
           danger   : '#e46464',
           light    : '#fbfbfb',
           dark     : '#343a40',
           customOne  : '#34fa40',
           customTwo  : '#343f40',
          }
       }
```

## Properties

### colorList

• `Optional` **colorList**: [`IColorTypes`](#/documentation/Interface-IColorTypes)
