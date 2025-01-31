export interface Bookmark {
  id: string;
  url: string;
  title: string;
  timestamp: string;
}

export interface BookmarksState {
  bookmarks: Bookmark[];
  query: string;
  loading: boolean;
  error: string | null;
}

export const initialBookmarksState: BookmarksState = {
  bookmarks: [],
  query: '',
  loading: false,
  error: null,
};
