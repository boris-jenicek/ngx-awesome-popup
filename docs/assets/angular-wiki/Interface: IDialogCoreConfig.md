# Interface: IDialogCoreConfig

Optional user configuration.

Example:
```typescript
// Dialog core config object example.
const dialogCoreConfig = {
    DialogCoreConfig: {
       Width         : '500px',
       Height        : '500px',
       ButtonPosition: 'right',
       LayoutType: DialogLayoutDisplay.INFO,
       // LoaderComponent: // Any Angular component class name can be included as a loader.
       DisplayLoader: false // This will override LoaderComponent.
    }
 }
```

## Properties

### ButtonPosition

• `Optional` **ButtonPosition**: [*VerticalPosition*](#/documentation/Home#verticalposition)

___

### DisplayLoader

• `Optional` **DisplayLoader**: *boolean*

___

### Height

• `Optional` **Height**: *string*

Fixed popup height

___

### LayoutType

• `Optional` **LayoutType**: [*DialogLayoutDisplay*](#/documentation/Enum:%20DialogLayoutDisplay)

___

### LoaderComponent

• `Optional` **LoaderComponent**: *Type*<any\>

___

### Width

• `Optional` **Width**: *string*

Fixed popup width
