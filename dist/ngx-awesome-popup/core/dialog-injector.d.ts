import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';
export declare class DialogInjector implements Injector {
    private ParentInjector;
    private AdditionalTokens;
    constructor(ParentInjector: Injector, AdditionalTokens: WeakMap<any, any>);
    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    get(token: any, notFoundValue?: any): any;
}
