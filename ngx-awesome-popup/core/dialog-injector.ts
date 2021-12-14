import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';

export class DialogInjector implements Injector {
  constructor(private ParentInjector: Injector, private AdditionalTokens: WeakMap<any, any>) {}

  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
  get(token: any, notFoundValue?: any): any;
  get(token: any, notFoundValue?: any, flags?: any): any {
    const value = this.AdditionalTokens.get(token);

    if (value) {
      return value;
    }

    return this.ParentInjector.get<any>(token, notFoundValue);
  }
}
