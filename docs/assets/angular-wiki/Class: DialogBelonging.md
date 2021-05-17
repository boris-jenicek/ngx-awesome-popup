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
   selector   : 'app-cup',
   templateUrl: './cup.component.html',
   styleUrls  : ['./cup.component.scss']
})
export class CupComponent implements OnInit, OnDestroy {

   subscriptions: Subscription[] = [];

   constructor(private dialogBelonging: DialogBelonging) {
   }

   ngOnInit(): void {
   console.log(this.dialogBelonging);

       this.subscriptions.push(
           this.dialogBelonging.EventsController.onButtonClick$.subscribe((_Button) => {
           if (_Button.ID === 'ok') {
               // Do some logic and close popup.
               this.dialogBelonging.EventsController.close();
           } else if (_Button.ID === 'cancel') {
               // Do some logic and close popup.
               this.dialogBelonging.EventsController.close();
           }
       })
       );

       setTimeout(() => {
           // Close loader after async data is ready.
           this.dialogBelonging.EventsController.closeLoader();
       }, 1000);
   }
}

ngOnDestroy(): void {
// Close all subscriptions.
this.subscriptions.forEach(sub => sub.unsubscribe());
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

### Buttons

• **Buttons**: [*IButton*](#/documentation/Interface:%20IButton)[]= []

Implementation of: DialogInterface.IDialogBelonging.Buttons

Inherited from: DialogSettings.Buttons

___

### CustomData

• **CustomData**: CustomData

Implementation of: DialogInterface.IDialogBelonging.CustomData

___

### DialogCoreConfig

• **DialogCoreConfig**: [*IDialogCoreConfig*](#/documentation/Interface:%20IDialogCoreConfig)

Implementation of: DialogInterface.IDialogBelonging.DialogCoreConfig

Inherited from: DialogSettings.DialogCoreConfig

___

### EventsController

• **EventsController**: [*IDialogEventsController*](#/documentation/Interface:%20IDialogEventsController)

Implementation of: DialogInterface.IDialogBelonging.EventsController
