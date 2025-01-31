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
  on(BookmarksActions.addBookmarkFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BookmarksActions.updateBookmarkSuccess, (state, { bookmark }) => ({
    ...state,
    bookmarks: state.bookmarks.map((b) =>
      b.id === bookmark.id ? bookmark : b
    ),
  })),
  on(BookmarksActions.updateBookmarkFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BookmarksActions.deleteBookmarkSuccess, (state, { id }) => ({
    ...state,
    bookmarks: state.bookmarks.filter((b) => b.id !== id),
  })),
  on(BookmarksActions.deleteBookmarkFailure, (state, { error }) => ({
    ...state,
    error,
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
