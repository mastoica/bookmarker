import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllBookmarks } from '../../../store/bookmarks/bookmarks.selectors';
import { CommonModule } from '@angular/common';
import { urlValidator } from '../utils/url.validator';
import { BookmarksActions } from '../../../store/bookmarks/bookmarks.actions';
import { uuid } from '../../../shared/utils/uuid';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkFormComponent {
  store = inject(Store);

  $id = input<string>('', { alias: 'id' });
  $bookmarks = toSignal(this.store.select(selectAllBookmarks), {
    initialValue: [],
  });
  $bookmark = computed(() =>
    this.$bookmarks().find((bookmark) => bookmark.id === this.$id())
  );

  constructor() {
    effect(() => {
      if (this.$bookmark()) {
        this.bookmarkFormGroup.patchValue({
          title: this.$bookmark()?.title,
          url: this.$bookmark()?.url,
        });
      }
    });
  }

  bookmarkFormGroup = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    url: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, urlValidator()],
    }),
  });

  createBookmark() {
    this.store.dispatch(
      BookmarksActions.addBookmark({
        bookmark: {
          id: uuid(),
          title: this.bookmarkFormGroup.controls.title.value,
          url: this.bookmarkFormGroup.controls.url.value,
          timestamp: DateTime.now().toISO(),
        },
      })
    );
  }

  updateBookmark() {
    this.store.dispatch(
      BookmarksActions.updateBookmark({
        id: this.$id(),
        bookmark: {
          title: this.bookmarkFormGroup.controls.title.value,
          url: this.bookmarkFormGroup.controls.url.value,
          timestamp: DateTime.now().toISO(),
        },
      })
    );
  }
}
