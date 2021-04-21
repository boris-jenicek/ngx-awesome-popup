import { Directive, ViewContainerRef } from '@angular/core';
export class InsertionLoaderDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionLoaderDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appInsertionLoader]',
            },] }
];
InsertionLoaderDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0aW9uLWxvYWRlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC9jb3JlL2luc2VydGlvbi1sb2FkZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFNMUQsTUFBTSxPQUFPLHdCQUF3QjtJQUVqQyxZQUNXLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQzdDLENBQUM7OztZQVBKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2FBQ25DOzs7WUFMa0IsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2FwcEluc2VydGlvbkxvYWRlcl0nLFxufSlcbmV4cG9ydCBjbGFzcyBJbnNlcnRpb25Mb2FkZXJEaXJlY3RpdmUge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIH1cbiAgICBcbn1cbiJdfQ==