import { Directive, ViewContainerRef } from '@angular/core';
export class InsertionLoaderDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appInsertionLoader]'
            },] }
];
InsertionLoaderDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0aW9uLWxvYWRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2luc2VydGlvbi1sb2FkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFNMUQsTUFBTSxPQUFPLHdCQUF3QjtJQUVwQyxZQUNRLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQzFDLENBQUM7OztZQVBELFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsc0JBQXNCO2FBQ2hDOzs7WUFMa0IsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuXHRzZWxlY3RvcjogJ1thcHBJbnNlcnRpb25Mb2FkZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmUge1xuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG5cdH1cblxufVxuIl19