import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Needed for Touch functionality of Material Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { PendingInterceptorModule } from '../@fury/shared/loading-indicator/pending-interceptor.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { MaterialModule } from '../@fury/shared/material-components.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChartsModule } from 'ng2-charts';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');
@NgModule({
  imports: [
    // Angular Core Module // Don't remove!
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ChartsModule,
    // Fury Core Modules
    AppRoutingModule,
    // Layout Module (Sidenav, Toolbar, Quickpanel, Content)
    LayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    PendingInterceptorModule,
  ],
  declarations: [AppComponent, DialogComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill'
      } as MatFormFieldDefaultOptions
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      } as MatSnackBarConfig
    },
    { 
      provide: JWT_OPTIONS, 
      useValue: JWT_OPTIONS 
    },
    JwtHelperService,
    {provide: LOCALE_ID, useValue: 'fr' }
  ]
})
export class AppModule {
}
enableProdMode();