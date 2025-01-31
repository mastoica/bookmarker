import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Bookmark, BookmarksState } from './bookmarks.state';
import { DateTime } from 'luxon';
import Fuse from 'fuse.js';

let fuse: Fuse<Bookmark> | null = null;

export const selectBookmarksState =
  createFeatureSelector<BookmarksState>('bookmarks');

export const selectQuery = createSelector(
  selectBookmarksState,
  (state) => state.query
);

export const selectAllBookmarks = createSelector(
  selectBookmarksState,
  (state) => state.bookmarks
);

export const selectBookmarksByQuery = createSelector(
  selectAllBookmarks,
  selectQuery,
  (bookmarks, query) => {
    if (!fuse) {
      fuse = new Fuse(bookmarks, {
        keys: [
          {
            name: 'title',
            weight: 0.7,
          },
          {
            name: 'url',
            weight: 0.3,
          },
        ],
        threshold: 0.3,
        includeScore: true,
      });
    } else {
      fuse.setCollection(bookmarks);
    }

    return query && query !== ''
      ? fuse.search(query).map((result) => result.item)
      : bookmarks;
  }
);

export const selectGroupedBookmarks = createSelector(
  selectBookmarksByQuery,
  (bookmarks) => {
    return bookmarks.reduce((acc, bookmark) => {
      const diffFromToday = Math.round(
        DateTime.fromISO(bookmark.timestamp).diffNow('days').days
      );

      if (diffFromToday === 0) {
        acc['Today'] = acc['Today'] || [];
        acc['Today'].push(bookmark);
      } else if (diffFromToday === -1) {
        acc['Yesterday'] = acc['Yesterday'] || [];
        acc['Yesterday'].push(bookmark);
      } else {
        acc['Older'] = acc['Older'] || [];
        acc['Older'].push(bookmark);
      }

      return acc;
    }, {} as { [key: string]: Bookmark[] });
  }
);

export const selectBookmarksLoading = createSelector(
  selectBookmarksState,
  (state) => state.loading
);

export const selectBookmarksError = createSelector(
  selectBookmarksState,
  (state) => state.error
);
