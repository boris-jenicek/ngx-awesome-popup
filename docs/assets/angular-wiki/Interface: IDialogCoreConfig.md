# Interface: IDialogCoreConfig

Optional user configuration.

Example:
```typescript
// Dialog core config object example.
const dialogCoreConfig = {
    DialogCoreConfig: {
       Width          : '500px',
       // MinWidth       : '300px',  // v1.1.0
       // MaxWidth       : '700px',  // v1.1.0
       Height         : '500px',
       // MinHeight      : '100vh',  // v1.1.0
       // MaxHeight      : '100px',  // v1.1.0
       HideScrollbar  : true,        // v1.1.0
       EscapeKeyClose : true,        // v1.1.0
       // FullScreen : true,         // v1.1.0
       ButtonPosition : 'right',
       LayoutType: DialogLayoutDisplay.INFO,
       // LoaderComponent: // Any Angular component class name can be included as a loader.
       DisplayLoader: false // This will override LoaderComponent.
    }
 }
```

## Hierarchy

* *ISizes*

  ↳ **IDialogCoreConfig**

## Properties

### ButtonPosition

• `Optional` **ButtonPosition**: [*VerticalPosition*](#/documentation/Home#verticalposition)

___

### DisplayLoader

• `Optional` **DisplayLoader**: *boolean*

___

### EscapeKeyClose

• `Optional` **EscapeKeyClose**: *boolean*

___

### FullScreen

• `Optional` **FullScreen**: *boolean*

Inherited from: GlobalInterface.ISizes.FullScreen

___

### Height

• `Optional` **Height**: *string*

Inherited from: GlobalInterface.ISizes.Height

___

### HideScrollbar

• `Optional` **HideScrollbar**: *boolean*

___

### LayoutType

• `Optional` **LayoutType**: [*DialogLayoutDisplay*](#/documentation/Enum:%20DialogLayoutDisplay)

___

### LoaderComponent

• `Optional` **LoaderComponent**: *Type*<any\>

___

### MaxHeight

• `Optional` **MaxHeight**: *string*

Inherited from: GlobalInterface.ISizes.MaxHeight

___

### MaxWidth

• `Optional` **MaxWidth**: *string*

Inherited from: GlobalInterface.ISizes.MaxWidth

___

### MinHeight

• `Optional` **MinHeight**: *string*

Inherited from: GlobalInterface.ISizes.MinHeight

___

### MinWidth

• `Optional` **MinWidth**: *string*

Inherited from: GlobalInterface.ISizes.MinWidth

___

### Width

• `Optional` **Width**: *string*

Inherited from: GlobalInterface.ISizes.Width
