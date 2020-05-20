import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeoCodes, GeoMarker } from '@memberhivex/core';

@Component({
  selector: 'mh-dialog-map',
  templateUrl: './map.dialog.html',
  styleUrls: ['./map.dialog.scss']
})
export class MapDialogComponent implements OnInit {
  initMarker: GeoMarker;
  markers: GeoMarker[] = [];
  zoom: number = 16;
  initMarkerToMap: boolean = false;

  constructor(public dialogRef: MatDialogRef<MapDialogComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {
    if (this.dialogData.markers) {
      this.markers = this.dialogData.markers;
      this.initMarker = this.dialogData.initMarker;
      this.initMarkerToMap = this.dialogData.initMarkerToMap;
      if (this.initMarkerToMap) {
        this.markers.push(this.initMarker);
      }
    }
  }
}
