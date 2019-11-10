import {AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {LoginService} from '../service/login.service';
declare var google;
@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit, AfterViewInit {
  @ViewChild('mapElement', {static: false}) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionForm: FormGroup;
  map: any;
  id;
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  updateLocation: any;
  options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };

  constructor(private fb: FormBuilder, private geolocation: Geolocation, private loginService: LoginService) {
    this.createDirectionForm();
  }

  ngOnInit() {
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      destination: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lon = resp.coords.longitude;
      this.map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: this.currentLocation.lat, lng: this.currentLocation.lon },
        zoom: 18
      });
      const infoWindow = new google.maps.InfoWindow();
      const pos = {
        lat: this.currentLocation.lat,
        lng: this.currentLocation.lon
      };
      this.map.setCenter(pos);
      const icon = {
        url: 'assets/icon/icons8-car-50.png', // image url
        scaledSize: new google.maps.Size(20, 20), // scaled size
      };
      const marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'Hello World!',
        icon: icon
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    // this.addMarker(this.map);

    console.log(this.currentLocation.lat, this.currentLocation.lat);
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     console.log(data.coords.latitude, data.coords.longitude);
     this.updateLocation = {
       driverEmail: localStorage.getItem('emailID'),
       currLat: data.coords.latitude,
       currLon: data.coords.longitude
     }
     this.loginService.updateDriversLocation(this.updateLocation).subscribe(res => {
       console.log(res);
     }, err => {
       console.log(err);
     });
    });
    // this.id = navigator.geolocation.watchPosition(this.success, this.error, this.options);
    // console.log(this.id);
  }

  success(pos) {
    const crd = pos.coords;
  }

  error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }



  calculateAndDisplayRoute(formValues) {
    const that = this;
    this.directionsService.route({
      origin: this.currentLocation,
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

  addMarker(map: any) {
    const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachf';

    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat: this.currentLocation.lat, lng: this.currentLocation.lng},
      icon: image
    });

    const content = '<h4>Information!</h4>';

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    const infoWindow = new google.maps.InfoWindow({content});

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
