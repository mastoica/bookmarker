import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BookmarksActions } from './bookmarks.actions';
import { BookmarksService } from '../../data/bookmarks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class BookmarksEffects {
  bookmarksService = inject(BookmarksService);
  actions$ = inject(Actions);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);

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
          map(() => {
            this._snackBar.open('Bookmark added', undefined, {
              duration: 3000,
            });
            return BookmarksActions.addBookmarkSuccess({ bookmark });
          }),
          catchError((error) =>
            of(BookmarksActions.addBookmarkFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.updateBookmark),
      switchMap(({ id, bookmark }) => {
        return this.bookmarksService.updateBookmark({ id, ...bookmark }).pipe(
          map(() => {
            this._snackBar.open('Bookmark updated', undefined, {
              duration: 3000,
            });
            return BookmarksActions.updateBookmarkSuccess({
              bookmark: { id, ...bookmark },
            });
          }),
          catchError((error) =>
            of(BookmarksActions.updateBookmarkFailure({ error: error.message }))
          )
        );
      })
    )
  );

  redirectAfterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          BookmarksActions.addBookmarkSuccess,
          BookmarksActions.updateBookmarkSuccess
        ),
        map(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  deleteBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarksActions.deleteBookmark),
      switchMap(({ id }) =>
        this.bookmarksService.deleteBookmark(id).pipe(
          map(() => {
            this._snackBar.open('Bookmark deleted', undefined, {
              duration: 3000,
            });
            return BookmarksActions.deleteBookmarkSuccess({ id });
          }),
          catchError((error) =>
            of(BookmarksActions.deleteBookmarkFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
