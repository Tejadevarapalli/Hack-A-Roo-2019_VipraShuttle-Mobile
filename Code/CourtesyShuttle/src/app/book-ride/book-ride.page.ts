import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.page.html',
  styleUrls: ['./book-ride.page.scss'],
})
export class BookRidePage implements OnInit, AfterViewInit {
  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
  @ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;
  @ViewChild('autoCompleteDestination', {static: false}) inputDestinationElement: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionForm: FormGroup;
  destinationPlace;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };

  constructor(private fb: FormBuilder, private geolocation: Geolocation) {
    this.createDirectionForm();
  }

  ngOnInit() {
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.destinationPlace);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;
    });
    const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    // this.directionsDisplay.setMap(map);
    // const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
    //   zoom: 7,
    //   center: {lat: 41.85, lng: -87.65}
    // });
    this.directionsDisplay.setMap(map);
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    const autocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.nativeElement as HTMLInputElement);
    autocomplete.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();
    });

    const autocompleteDestination = new google.maps.places.Autocomplete(this.inputDestinationElement.nativeElement as HTMLInputElement);
    autocompleteDestination.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocompleteDestination.getPlace();
    });

  }

  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route({
      origin: formValues.source,
      destination: formValues.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
