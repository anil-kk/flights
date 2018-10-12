import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { AlertifyService } from '../_services/alertify.service';
import { FlightsService } from '../_services/flights.service';


@Injectable()
export class BookingInfoResolver implements Resolve<any> {

    constructor(private router: Router, private alertify: AlertifyService, private flightsService: FlightsService) {}

    resolve(route: ActivatedRouteSnapshot) {
        // route.params['id']
        return this.flightsService.getBookingInfo()
        .pipe(catchError(error => {
            this.alertify.error('Error getting flight details!');
            this.router.navigate(['/error']);
            return of(null);
        }));
    }
}
