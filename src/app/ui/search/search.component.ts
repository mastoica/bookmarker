import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookmarksActions } from '../../store/bookmarks/bookmarks.actions';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  store = inject(Store);

  searchForm = new FormGroup({
    query: new FormControl<string>(''),
  });

  destroyRef = inject(DestroyRef);
  constructor() {}

  ngOnInit() {
    this.searchForm.controls.query.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.store.dispatch(BookmarksActions.setQuery({ query: query ?? '' }));
      });
  }

  clearQuery() {
    this.store.dispatch(BookmarksActions.clearQuery());
    this.searchForm.controls.query.setValue('');
  }
}
