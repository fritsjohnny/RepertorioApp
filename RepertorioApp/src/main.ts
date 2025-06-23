import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.component.routes';
import { provideRouter } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './app/custom-route-reuse.strategy';
import { MarkdownModule } from 'ngx-markdown';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MarkdownModule.forRoot()),
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  ],
});
