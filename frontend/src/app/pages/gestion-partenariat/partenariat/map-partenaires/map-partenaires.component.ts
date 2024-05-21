import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fury-map-partenaires',
  templateUrl: './map-partenaires.component.html',
  styleUrls: ['./map-partenaires.component.scss']
})
export class MapPartenairesComponent implements OnInit {

  lat: number = 15.728964600000001;
  lng: number = -13.002889099999999;

  constructor() { }

  ngOnInit() {}

}
