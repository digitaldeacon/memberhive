import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { GeoCodes, GeoMarker } from 'mh-core';

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

    constructor(
        public dialogRef: MdDialogRef<MapDialogComponent>,
        @Inject(MD_DIALOG_DATA) public dialogData: any) { }

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
