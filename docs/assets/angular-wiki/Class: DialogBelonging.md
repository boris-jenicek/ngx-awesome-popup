# Class: DialogBelonging<CustomData\>

This is the class that needs to be added as DI in the constructor of a child component that will be
opened dynamically with [DialogInitializer](#/documentation/Class:%20DialogInitializer). It contains various information or
event controllers, and listeners that can be used in a child component. Also, there is custom data
that is sent from component where the [DialogInitializer](#/documentation/Class:%20DialogInitializer) is. User can set specific type of
custom data that child component will receive by including it as generic type.

Example:
```typescript
import {DialogBelonging} from 'ngx-awesome-popup';
@Component({
   selector   : 'app-dynamic',
   templateUrl: './dynamic.component.html',
   styleUrls  : ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, OnDestroy {

   subscriptions: Subscription = new Subscription();

   constructor(@Inject('dialogBelonging') private dialogBelonging: DialogBelonging) {}

   ngOnInit(): void {
   console.log(this.dialogBelonging);

       this.subscriptions.add(
           this.dialogBelonging.eventsController.onButtonClick$.subscribe((_Button) => {
           if (_Button.ID === 'ok') {
               // Do some logic and close popup.
               this.dialogBelonging.eventsController.close();
           } else if (_Button.ID === 'cancel') {
               // Do some logic and close popup.
               this.dialogBelonging.eventsController.close();
           }
       })
       );

       setTimeout(() => {
           // Close loader after async data is ready.
           this.dialogBelonging.eventsController.closeLoader();
       }, 1000);
   }
}

ngOnDestroy(): void {
// Close all subscriptions.
this.subscriptions.unsubscribe();
}
```

## Type parameters

| Name | Default |
| :------ | :------ |
| `CustomData` | *any* |

## Hierarchy

* *DialogSettings*

  ↳ **DialogBelonging**

## Implements

* *IDialogBelonging*

## Constructors

### constructor

\+ **new DialogBelonging**<CustomData\>(): [*DialogBelonging*](#/documentation/Class:%20DialogBelonging)<CustomData\>

#### Type parameters:

| Name | Default |
| :------ | :------ |
| `CustomData` | *any* |

**Returns:** [*DialogBelonging*](#/documentation/Class:%20DialogBelonging)<CustomData\>

Overrides: DialogSettings.constructor

## Properties

### buttons

• **buttons**: [*IButton*](#/documentation/Interface:%20IButton)[]= []

Implementation of: IDialogBelonging.buttons

Inherited from: DialogSettings.buttons

___

### customData

• **customData**: CustomData= null

Implementation of: IDialogBelonging.customData

___

### dialogCoreConfig

• **dialogCoreConfig**: [*IDialogCoreConfig*](#/documentation/Interface:%20IDialogCoreConfig)

Implementation of: IDialogBelonging.dialogCoreConfig

Inherited from: DialogSettings.dialogCoreConfig

___

### eventsController

• **eventsController**: [*IDialogeventsController*](#/documentation/Interface:%20IDialogeventsController)

Implementation of: IDialogBelonging.eventsController
