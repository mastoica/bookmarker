import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from '../store/bookmarks/bookmarks.state';
import { DateTime } from 'luxon';
import { uuid } from '../utils/uuid';

@Injectable({ providedIn: 'root' })
export class DataService implements InMemoryDbService {
  createDb() {
    const bookmarks: Bookmark[] = [
      {
        id: uuid(),
        url: 'https://angular.io',
        title: 'Angular',
        timestamp: DateTime.now().toISO(),
      },
      {
        id: uuid(),
        url: 'https://ngrx.io',
        title: 'NgRx',
        timestamp: DateTime.now().minus({ days: 1 }).toISO(),
      },
      {
        id: uuid(),
        url: 'https://www.typescriptlang.org',
        title: 'TypeScript - Javascript that scales',
        timestamp: DateTime.now().minus({ days: 5 }).toISO(),
      },
      {
        id: uuid(),
        url: 'https://www.rxjs.dev',
        title: 'RxJS - A reactive programming library for JavaScript',
        timestamp: DateTime.now().minus({ days: 10 }).toISO(),
      },
    ];
    return { bookmarks };
  }
}
