import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
  ],
});
