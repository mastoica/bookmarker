import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./bookmarks/feature/bookmarks.component').then(
        (c) => c.BookmarksComponent
      ),
  },
];
