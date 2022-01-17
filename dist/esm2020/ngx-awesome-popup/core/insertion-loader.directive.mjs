import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
export class InsertionLoaderDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionLoaderDirective.ɵfac = function InsertionLoaderDirective_Factory(t) { return new (t || InsertionLoaderDirective)(i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
InsertionLoaderDirective.ɵdir = i0.ɵɵdefineDirective({ type: InsertionLoaderDirective, selectors: [["", "appInsertionLoader", ""]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InsertionLoaderDirective, [{
        type: Directive,
        args: [{
                selector: '[appInsertionLoader]'
            }]
    }], function () { return [{ type: i0.ViewContainerRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0aW9uLWxvYWRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2luc2VydGlvbi1sb2FkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sZUFBZSxDQUFDOztBQUs1RCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DLFlBQW1CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQzs7Z0dBRDlDLHdCQUF3Qjs2REFBeEIsd0JBQXdCO3VGQUF4Qix3QkFBd0I7Y0FIcEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7YUFDakMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FwcEluc2VydGlvbkxvYWRlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEluc2VydGlvbkxvYWRlckRpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxufVxuIl19