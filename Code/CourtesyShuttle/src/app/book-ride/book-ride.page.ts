import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LoginService} from '../service/login.service';
import {BookingService} from '../service/booking.service';

declare var google;

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.page.html',
  styleUrls: ['./book-ride.page.scss'],
})
export class BookRidePage implements OnInit, AfterViewInit {
  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  distanceMatrix = new google.maps.DistanceMatrixService();
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
  ETA = '';
  allDrivers;
  driverCount;
  marker: any;
  markerArray = [];

  constructor(private fb: FormBuilder, private geolocation: Geolocation, private loginService: LoginService, private bookingService: BookingService) {
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
      this.marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'Hello World!'
      });
      this.markerArray.push(this.marker);
      this.directionsDisplay.setMap(this.map);
      this.loginService.getAllDrivers().subscribe(res => {
        console.log(res);
        this.allDrivers = res;
        for (this.driverCount = 0 ; this.driverCount < this.allDrivers.length; this.driverCount++) {
          const icon1 = {
            url: 'assets/icon/icons8-car-50.png', // image url
            scaledSize: new google.maps.Size(20, 20), // scaled size
          };
          this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.allDrivers[this.driverCount].currLat, this.allDrivers[this.driverCount].currLon),
            map: this.map,
            title: 'Hello World!',
            icon: icon1
          });
          this.markerArray.push(this.marker);
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
    let shortestDistanceIndex = 0;
    let distance = 0;
    let shortestDistance = 5000;
    for (this.driverCount = 0 ; this.driverCount < this.allDrivers.length; this.driverCount++) {
      this.distanceMatrix.getDistanceMatrix({
        origins: [new google.maps.LatLng(this.allDrivers[this.driverCount].currLat, this.allDrivers[this.driverCount].currLon)],
        destinations: [formValues.source],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => {
        distance = response.rows[0].elements[0].duration.value;
        this.ETA = response.rows[0].elements[0].duration.text;
        if (distance < shortestDistance) {
          shortestDistance = distance;
          shortestDistanceIndex = this.driverCount;
        }
        console.log(response.rows[0].elements[0].duration);
        console.log(status);
      });
    }

    const bookRide = {
      userid: localStorage.getItem('emailID'),
      requesttime: new Date(),
      fromlocation: formValues.source,
      tolocation: formValues.destination,
      driverEmail: this.allDrivers[shortestDistanceIndex].EmailID
    }
    console.log(bookRide);
    // this.bookingService.addBooking(bookRide).subscribe(res => {
    //   console.log(res);
    // }, err => {
    //   console.log(err);
    // });
    const that = this;
    const originDriver = new google.maps.LatLng(this.allDrivers[shortestDistanceIndex].currLat, this.allDrivers[shortestDistanceIndex].currLon)
    this.directionsService.route({
      origin: originDriver,
      destination: formValues.source,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    console.log(this.markerArray);
    for (let i = 0; i < this.markerArray.length; i++ ) {
      this.markerArray[i].setMap(null);
    }

       const icon1 = {
      url: 'assets/icon/icons8-car-50.png', // image url
      scaledSize: new google.maps.Size(20, 20), // scaled size
    };
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.allDrivers[shortestDistanceIndex].currLat, this.allDrivers[shortestDistanceIndex].currLon),
      map: this.map,
      title: 'Hello World!',
      icon: icon1
    });
    this.markerArray.push(this.marker);
    this.marker = new google.maps.Marker({
      position: formValues.source,
      map: this.map,
      title: 'Hello World!'
    });
    this.markerArray.push(this.marker);


  }

}
