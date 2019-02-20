import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'isActive'
})
export class IsActivePipe implements PipeTransform {
  /**
   * @param url$ the url observable, should return the current url
   * @param url the url we are to match too, against the given url$
   */
  transform(
    url$: Observable<string>,
    url?: string
  ): Observable<'primary' | ''> {
    return url$.pipe(map(_url => (_url === url ? 'primary' : '')));
  }
}
