import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/bookmarks/feature/bookmarks.component').then(
        (c) => c.BookmarksComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./features/bookmark/feature/bookmark.component').then(
        (c) => c.BookmarkFormComponent
      ),
  },
];
