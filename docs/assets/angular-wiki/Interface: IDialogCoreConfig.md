# Interface: IDialogCoreConfig

Optional user configuration.

Example:
```typescript
// Dialog core config object example.
const dialogCoreConfig = {
    dialogCoreConfig: {
       width          : '500px',
       // minWidth       : '300px',
       // maxWidth       : '700px',
       height         : '500px',
       // minHeight      : '100vh',
       // maxHeight      : '100px',
       hideScrollbar  : true,
       escapeKeyClose : true,
       // fullScreen : true,
       buttonPosition : 'right',
       layoutType: DialogLayoutDisplay.INFO,
       // loaderComponent: // Any Angular component class name can be included as a loader.
       displayLoader: false, // This will override LoaderComponent.
       customStyles: {
          buttonSectionCss: 'background: #333',
          buttonCss: 'font-size: 30px;',
          wrapperCss: 'background: #333;'
        }
    }
 }
```

## Hierarchy

* *ISizes*

  ↳ **IDialogCoreConfig**

## Properties

### animationIn

• `Optional` **animationIn**: [*AppearanceAnimation*](#/documentation/Enum:%20AppearanceAnimation)

___

### animationOut

• `Optional` **animationOut**: [*DisappearanceAnimation*](#/documentation/Enum:%20DisappearanceAnimation)

___

### buttonPosition

• `Optional` **buttonPosition**: [*VerticalPosition*](#/documentation/Home#verticalposition)

___

### customStyles

• `Optional` **customStyles**: IDialogCustomStyles

___

### displayLoader

• `Optional` **displayLoader**: *boolean*

___

### escapeKeyClose

• `Optional` **escapeKeyClose**: *boolean*

___

### fullScreen

• `Optional` **fullScreen**: *boolean*

Inherited from: ISizes.fullScreen

___

### height

• `Optional` **height**: *string*

Inherited from: ISizes.height

___

### hideScrollbar

• `Optional` **hideScrollbar**: *boolean*

___

### layoutType

• `Optional` **layoutType**: [*DialogLayoutDisplay*](#/documentation/Enum:%20DialogLayoutDisplay)

___

### loaderComponent

• `Optional` **loaderComponent**: *Type*<any\>

___

### maxHeight

• `Optional` **maxHeight**: *string*

Inherited from: ISizes.maxHeight

___

### maxWidth

• `Optional` **maxWidth**: *string*

Inherited from: ISizes.maxWidth

___

### minHeight

• `Optional` **minHeight**: *string*

Inherited from: ISizes.minHeight

___

### minWidth

• `Optional` **minWidth**: *string*

Inherited from: ISizes.minWidth

___

### width

• `Optional` **width**: *string*

Inherited from: ISizes.width
