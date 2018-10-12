import { Routes } from '@angular/router';
import { FlightsComponent } from './flights/flights.component';
import { BookingInfoResolver } from './_resolver/booking.info.resolver';
import { ErrorComponent } from './error/error.component';


export const appRoutes: Routes = [
{ path: '', component: FlightsComponent, resolve: { bookingInfo: BookingInfoResolver } },
{
    path: '',
    runGuardsAndResolvers: 'always',
    children: [
        { path: 'error', component: ErrorComponent}

    ]
},

{ path: '**', redirectTo: '', pathMatch: 'full'}
];
