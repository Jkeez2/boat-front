import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { boatResolverResolver } from './boat-resolver.resolver';

describe('boatResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => boatResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
