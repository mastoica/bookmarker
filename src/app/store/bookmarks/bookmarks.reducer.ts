import { createReducer, on } from '@ngrx/store';
import { BookmarksActions } from './bookmarks.actions';
import { initialBookmarksState } from './bookmarks.state';

export const bookmarksReducer = createReducer(
  initialBookmarksState,
  on(BookmarksActions.loadBookmarks, (state) => ({ ...state, loading: true })),
  on(BookmarksActions.loadBookmarksSuccess, (state, { bookmarks }) => ({
    ...state,
    bookmarks,
    loading: false,
    error: null,
  })),
  on(BookmarksActions.loadBookmarksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BookmarksActions.addBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: [...state.bookmarks, bookmark],
  })),
  on(BookmarksActions.setQuery, (state, { query }) => ({
    ...state,
    query,
  })),
  on(BookmarksActions.clearQuery, (state) => ({
    ...state,
    query: '',
  }))
);
