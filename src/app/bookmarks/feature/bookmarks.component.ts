import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGroupedBookmarks } from '../../store/bookmarks/bookmarks.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookmarksActions } from '../../store/bookmarks/bookmarks.actions';
import { CommonModule, KeyValue } from '@angular/common';
import { Bookmark } from '../../store/bookmarks/bookmarks.state';
import { BookmarkComponent } from '../ui/bookmark/bookmark.component';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  imports: [CommonModule, BookmarkComponent],
})
export class BookmarksComponent implements OnInit {
  store = inject(Store);

  groupedBookmarks$ = this.store.select(selectGroupedBookmarks);
  $groupedBookmarks = toSignal(this.groupedBookmarks$);

  ngOnInit() {
    this.store.dispatch(BookmarksActions.loadBookmarks());
  }

  sortBykey(a: KeyValue<string, Bookmark[]>, b: KeyValue<string, Bookmark[]>) {
    if (a.key === 'Today') {
      return -1;
    }
    return 0;
  }
}
