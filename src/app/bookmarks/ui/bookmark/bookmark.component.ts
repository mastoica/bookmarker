import { Component, OnInit, input } from '@angular/core';
import { Bookmark } from '../../../store/bookmarks/bookmarks.state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
  imports: [MatIconModule, MatButtonModule],
})
export class BookmarkComponent implements OnInit {
  bookmark = input.required<Bookmark>();

  ngOnInit() {}
}
