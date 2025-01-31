import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BookmarksActions } from './bookmarks.actions';
import { BookmarksService } from '../../data/bookmarks.service';

@Injectable()
export class BookmarksEffects {
  bookmarksService = inject(BookmarksService);
  actions$ = inject(Actions);

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.loadBookmarks),
      switchMap(() =>
        this.bookmarksService.getBookmarks().pipe(
          map((bookmarks) =>
            BookmarksActions.loadBookmarksSuccess({ bookmarks })
          ),
          catchError((error) =>
            of(BookmarksActions.loadBookmarksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.addBookmark),
      switchMap(({ bookmark }) =>
        this.bookmarksService.addBookmark(bookmark).pipe(
          map(() => BookmarksActions.addBookmarkSuccess({ bookmark })),
          catchError((error) =>
            of(BookmarksActions.addBookmarkFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
