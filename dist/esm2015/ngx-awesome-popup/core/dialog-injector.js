export class DialogInjector {
    constructor(ParentInjector, AdditionalTokens) {
        this.ParentInjector = ParentInjector;
        this.AdditionalTokens = AdditionalTokens;
    }
    get(token, notFoundValue, flags) {
        const value = this.AdditionalTokens.get(token);
        if (value) {
            return value;
        }
        return this.ParentInjector.get(token, notFoundValue);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWluamVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvY29yZS9kaWFsb2ctaW5qZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLGNBQWM7SUFDMUIsWUFDUyxjQUF3QixFQUN4QixnQkFBbUM7UUFEbkMsbUJBQWMsR0FBZCxjQUFjLENBQVU7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtJQUU1QyxDQUFDO0lBUUQsR0FBRyxDQUFDLEtBQVUsRUFBRSxhQUFtQixFQUFFLEtBQVc7UUFDL0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvQyxJQUFJLEtBQUssRUFBRTtZQUNWLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFNLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdEZsYWdzLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRGlhbG9nSW5qZWN0b3IgaW1wbGVtZW50cyBJbmplY3RvciB7XG5cdGNvbnN0cnVjdG9yKFxuXHRcdHByaXZhdGUgUGFyZW50SW5qZWN0b3I6IEluamVjdG9yLFxuXHRcdHByaXZhdGUgQWRkaXRpb25hbFRva2VuczogV2Vha01hcDxhbnksIGFueT5cblx0KSB7XG5cdH1cblxuXHRnZXQ8VD4oXG5cdFx0dG9rZW46IFR5cGU8VD4gfCBJbmplY3Rpb25Ub2tlbjxUPixcblx0XHRub3RGb3VuZFZhbHVlPzogVCxcblx0XHRmbGFncz86IEluamVjdEZsYWdzXG5cdCk6IFQ7XG5cdGdldCh0b2tlbjogYW55LCBub3RGb3VuZFZhbHVlPzogYW55KTogYW55O1xuXHRnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSwgZmxhZ3M/OiBhbnkpOiBhbnkge1xuXHRcdGNvbnN0IHZhbHVlID0gdGhpcy5BZGRpdGlvbmFsVG9rZW5zLmdldCh0b2tlbik7XG5cblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5QYXJlbnRJbmplY3Rvci5nZXQ8YW55Pih0b2tlbiwgbm90Rm91bmRWYWx1ZSk7XG5cdH1cbn1cbiJdfQ==