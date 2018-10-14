import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

constructor(private http: HttpClient) { }

getBookingInfo() {
  if (isDevMode) {
    return this.http.get('./../../assets/booking-info.json');
  }
  return this.http.get(environment.apiUrl + 'forms/flight-booking-selector/');
}

getFlights(departureAirportIataCode, arrivalAirportIataCode, startDate, endDate) {
  if (isDevMode) {
    return this.http.get('./../../assets/flights-info.json');
  }
  return this.http.get(environment.apiUrl + `flights/from/${departureAirportIataCode}/to/
  ${arrivalAirportIataCode}/${startDate}/${endDate}/250/unique/?limit=15&offset-0`);
}

}
