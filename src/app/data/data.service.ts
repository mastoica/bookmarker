import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from '../store/bookmarks/bookmarks.state';

@Injectable({ providedIn: 'root' })
export class DataService implements InMemoryDbService {
  createDb() {
    const bookmarks: Bookmark[] = [
      {
        id: '045c0ef0-7f22-466d-b4db-972e701085c8',
        url: 'https://angular.io',
        title: 'Angular',
        timestamp: '2025-01-31T12:33:25.990+02:00',
      },
      {
        id: '34d3de76-f816-49a8-bcf5-6314892d0976',
        url: 'https://ngrx.io',
        title: 'NgRx',
        timestamp: '2025-01-30T12:33:25.990+02:00',
      },
      {
        id: '952fa0d8-bfe6-4421-9ad7-238457dc7b5c',
        url: 'https://www.typescriptlang.org',
        title: 'TypeScript - Javascript that scales',
        timestamp: '2025-01-26T12:33:25.990+02:00',
      },
      {
        id: 'bcfc9e67-36e3-4fb1-b04d-fe13f219708c',
        url: 'https://www.rxjs.dev',
        title: 'RxJS - A reactive programming library for JavaScript',
        timestamp: '2025-01-21T12:33:25.990+02:00',
      },
    ];

    return { bookmarks };
  }
}
