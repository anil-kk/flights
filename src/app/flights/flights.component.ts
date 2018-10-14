import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightsService } from '../_services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  bookingInfo: any;
  airportNameToIataCodeLookup = new Map<string, string>();

  departureAirportNames = [];
  arrivalAirportNames = [];
  flights = [];

  departureCityName: string;
  departureIataCode: string;

  arrivalCityName: string;
  arrivalIataCode: string;
  startDate: string;
  endDate: string;

  discountCode: string;

  bookingForm  = new FormGroup({
    departureAirportName: new FormControl(''),
    arrivalAirportName: new FormControl(''),
    range: new FormControl()
  });

  constructor(private activatedRoute: ActivatedRoute, private flightsService: FlightsService) { }

  ngOnInit() {

    this.activatedRoute.data.subscribe(data => {
      this.bookingInfo = data['bookingInfo'];

      this.bookingInfo.airports.forEach(airport => {
        this.airportNameToIataCodeLookup.set(airport.name, airport.iataCode);
        this.departureAirportNames.push(airport.name);
      });

    });

    this.bookingForm.get('departureAirportName').valueChanges.subscribe((airportName) => {
      this.flights = [];
      this.departureCityName = airportName;

      this.departureIataCode = this.airportNameToIataCodeLookup.get(airportName);
      const routesAvailable = this.bookingInfo.routes[this.departureIataCode];

      if (routesAvailable) {
        this.arrivalAirportNames = this.bookingInfo.airports
        .filter( airport => {
          return routesAvailable.findIndex( (el) => el === airport.iataCode ) > -1;
        })
        .map( (airport) => airport.name);
      }

    });

    this.bookingForm.get('arrivalAirportName').valueChanges.subscribe( (airportName) => {
      this.flights = [];
      this.arrivalCityName = airportName;
      this.arrivalIataCode = this.airportNameToIataCodeLookup.get(airportName);
    });

//  https://app.kothapalli.info/#!/flights/AGA/CRL/2018-10-17/2018-10-17
//  https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/AMS/to/DUB/2018-10-14/2018-10-31/250/unique/?limit=15&offset-0
    this.bookingForm.get('range').valueChanges.subscribe((dateRange) => {
      this.flights = [];
      this.startDate = this.getDate(dateRange[0]);
      this.endDate = this.getDate(dateRange[1]);
    });
  }

  search() {
    this.flightsService.getFlights(this.departureIataCode, this.arrivalIataCode, this.startDate, this.endDate)
    .subscribe((res) => {
      this.flights = res['flights'];
      const discoutRoute = this.bookingInfo.discounts.routes[this.departureIataCode + this.arrivalIataCode];
      if (discoutRoute) {
        this.discountCode = discoutRoute[0];
      }
    });
  }

  getDate(date) {
    return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + (date.getUTCDate() + 1);
  }
}
