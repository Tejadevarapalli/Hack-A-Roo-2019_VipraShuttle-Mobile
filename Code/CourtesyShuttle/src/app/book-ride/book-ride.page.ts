import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LoginService} from '../service/login.service';
declare var google;

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.page.html',
  styleUrls: ['./book-ride.page.scss'],
})
export class BookRidePage implements OnInit, AfterViewInit {
  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
  // @ViewChild('autoCompleteInput', {static: false}) inputNativeElement: any;
  // @ViewChild('autoCompleteDestination', {static: false}) inputDestinationElement: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionForm: FormGroup;
  map: any;
  source;
  destination;
  latitude;
  longitude;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  allDrivers;
  driverCount;

  constructor(private fb: FormBuilder, private geolocation: Geolocation, private loginService: LoginService) {
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
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lon = resp.coords.longitude;
      this.map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: this.currentLocation.lat, lng: this.currentLocation.lon },
        zoom: 12
      });
      const infoWindow = new google.maps.InfoWindow();
      const pos = {
        lat: this.currentLocation.lat,
        lng: this.currentLocation.lon
      };
      const icon = {
        url: 'assets/icon/icons8-car-50.png', // image url
        scaledSize: new google.maps.Size(20, 20), // scaled size
      };
      const marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'Hello World!'
      });
      this.directionsDisplay.setMap(this.map);
      this.loginService.getAllDrivers().subscribe(res => {
        console.log(res);
        this.allDrivers = res;
        for (this.driverCount = 0 ; this.driverCount < this.allDrivers.length; this.driverCount++) {
          // const pos1 = {
          //   lat: this.allDrivers[this.driverCount].currLat,
          //   lng: this.allDrivers[this.driverCount].currLon
          // };
          const icon1 = {
            url: 'assets/icon/icons8-car-50.png', // image url
            scaledSize: new google.maps.Size(20, 20), // scaled size
          };
          const marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(this.allDrivers[this.driverCount].currLat, this.allDrivers[this.driverCount].currLon),
            map: this.map,
            title: 'Hello World!',
            icon: icon1
          });
        }
      }, err => {
        console.log(err);
      });

      console.log(this.allDrivers);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    // this.addMarker(this.map);
      // const infowindow = new google.maps.InfoWindow();
      // const infowindowContent = document.getElementById('infowindow-content');
      // infowindow.setContent(infowindowContent);
    //   const marker = new google.maps.Marker({
    //   map: this.map,
    //   anchorPoint: new google.maps.Point(0, -29)
    // });

      // const infoWindow = new google.maps.InfoWindow();

      // const autocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.nativeElement as HTMLInputElement);
    // autocomplete.addListener('place_changed', () => {
    //   infowindow.close();
    //   marker.setVisible(false);
    //   const place = autocomplete.getPlace();
    // });
    //
    // const autocompleteDestination = new google.maps.places.Autocomplete(this.inputDestinationElement.nativeElement as HTMLInputElement);
    // autocompleteDestination.addListener('place_changed', () => {
    //   infowindow.close();
    //   marker.setVisible(false);
    //   const place = autocompleteDestination.getPlace();
    // });
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
