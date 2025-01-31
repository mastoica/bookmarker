import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { BookmarksActions } from './store/bookmarks/bookmarks.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'bookmarker';

  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(BookmarksActions.loadBookmarks());
  }
}
