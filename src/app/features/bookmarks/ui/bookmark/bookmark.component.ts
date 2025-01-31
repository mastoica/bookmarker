import { Component, OnInit, inject, input } from '@angular/core';
import { Bookmark } from '../../../../store/bookmarks/bookmarks.state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookmarksActions } from '../../../../store/bookmarks/bookmarks.actions';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../../shared/ui/confirmation-dialog/confirmation-dialog.component';
import { take } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
  imports: [MatIconModule, MatButtonModule, RouterModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkComponent {
  bookmark = input.required<Bookmark>();
  store = inject(Store);
  dialog = inject(MatDialog);

  delete(id?: string) {
    if (id) {
      this.dialog
        .open(ConfirmationDialogComponent, {
          data: {
            title: 'Delete bookmark',
            message: 'Are you sure you want to delete this bookmark?',
          },
        })
        .afterClosed()
        .pipe(take(1))
        .subscribe((confirmed) => {
          if (confirmed) {
            this.store.dispatch(BookmarksActions.deleteBookmark({ id }));
          }
        });
    }
  }
}
