# Interface: IDialogCoreConfig

Optional user configuration.

Example:
```typescript
// Dialog core config object example.
const dialogCoreConfig = {
    DialogCoreConfig: {
       Width          : '500px',
       // MinWidth       : '300px',
       // MaxWidth       : '700px',
       Height         : '500px',
       // MinHeight      : '100vh',
       // MaxHeight      : '100px',
       HideScrollbar  : true,
       EscapeKeyClose : true,
       // FullScreen : true,
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

### AnimationIn

• `Optional` **AnimationIn**: [*AppearanceAnimation*](#/documentation/Enum:%20AppearanceAnimation)

___

### AnimationOut

• `Optional` **AnimationOut**: [*DisappearanceAnimation*](#/documentation/Enum:%20DisappearanceAnimation)

___

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

Inherited from: ISizes.FullScreen

___

### Height

• `Optional` **Height**: *string*

Inherited from: ISizes.Height

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

Inherited from: ISizes.MaxHeight

___

### MaxWidth

• `Optional` **MaxWidth**: *string*

Inherited from: ISizes.MaxWidth

___

### MinHeight

• `Optional` **MinHeight**: *string*

Inherited from: ISizes.MinHeight

___

### MinWidth

• `Optional` **MinWidth**: *string*

Inherited from: ISizes.MinWidth

___

### Width

• `Optional` **Width**: *string*

Inherited from: ISizes.Width
