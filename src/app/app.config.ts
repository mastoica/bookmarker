import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { bookmarksReducer } from './store/bookmarks/bookmarks.reducer';
import { BookmarksEffects } from './store/bookmarks/bookmarks.effects';
import { provideHttpClient } from '@angular/common/http';
import { DataService } from './data/data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(DataService, {
        dataEncapsulation: false,
      })
    ),
    provideAnimationsAsync(),
    provideStore({ bookmarks: bookmarksReducer }),
    provideEffects(BookmarksEffects),
  ],
};
