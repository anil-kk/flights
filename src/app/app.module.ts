import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDatepickerModule, TypeaheadModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import {TimeAgoPipe} from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { FlightsService } from './_services/flights.service';
import { FlightsComponent } from './flights/flights.component';
import { BookingInfoResolver } from './_resolver/booking.info.resolver';
import { ErrorComponent } from './error/error.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      TimeAgoPipe,
      FlightsComponent,
      ErrorComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      BsDatepickerModule.forRoot(),
      TypeaheadModule.forRoot()
   ],
   providers: [
      ErrorInterceptorProvider,
      AlertifyService,
      FlightsService,
      BookingInfoResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
