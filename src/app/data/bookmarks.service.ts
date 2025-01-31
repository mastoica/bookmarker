import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookmark } from '../store/bookmarks/bookmarks.state';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private apiUrl = 'api/bookmarks';

  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.apiUrl);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.apiUrl, bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bookmark.id}`, bookmark);
  }

  deleteBookmark(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
