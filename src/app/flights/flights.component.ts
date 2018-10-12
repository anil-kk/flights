import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  bookingInfo: any;
  airportNames: any;

  bookingForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.bookingForm = new FormGroup({
      departure: new FormControl(),
      arrival: new FormControl(),
      range: new FormControl()
    });

    this.activatedRoute.data.subscribe(data => {
      this.bookingInfo = data['bookingInfo'];
      this.airportNames = this.bookingInfo.airports.map( airport => {
        return  airport.name;
      });
      console.log(this.bookingInfo);
      console.log(this.airportNames);
    });
  }

}
