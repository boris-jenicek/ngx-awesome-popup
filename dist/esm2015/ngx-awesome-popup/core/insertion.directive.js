import { Directive, ViewContainerRef } from '@angular/core';
export class InsertionDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
InsertionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appInsertion]'
            },] }
];
InsertionDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25neC1hd2Vzb21lLXBvcHVwL2NvcmUvaW5zZXJ0aW9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTTFELE1BQU0sT0FBTyxrQkFBa0I7SUFFOUIsWUFDUSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUMxQyxDQUFDOzs7WUFQRCxTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLGdCQUFnQjthQUMxQjs7O1lBTGtCLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdbYXBwSW5zZXJ0aW9uXSdcbn0pXG5leHBvcnQgY2xhc3MgSW5zZXJ0aW9uRGlyZWN0aXZlIHtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuXHR9XG5cbn1cbiJdfQ==