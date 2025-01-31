import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Bookmark } from './bookmarks.state';

export const BookmarksActions = createActionGroup({
  source: 'Bookmarks',
  events: {
    'Load Bookmarks': emptyProps(),
    'Load Bookmarks Success': props<{ bookmarks: Bookmark[] }>(),
    'Load Bookmarks Failure': props<{ error: string }>(),
    'Add Bookmark': props<{ bookmark: Bookmark }>(),
    'Add Bookmark Success': props<{ bookmark: Bookmark }>(),
    'Add Bookmark Failure': props<{ error: string }>(),
    'Set Query': props<{ query: string }>(),
    'Clear Query': emptyProps(),
  },
});
