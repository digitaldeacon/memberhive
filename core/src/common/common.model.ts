export interface Message {
    type: string;
    text?: string;
}

export interface GeoCodes {
    lat?: number;
    lng?: number;
}

export interface GeoMarker {
    latlng: GeoCodes;
    title?: string;
    label?: string;
    icon?: string;
    info?: GeoMarkerInfo;
}

export interface GeoMarkerInfo {
    title: string;
    address?: Address;
    avatar?: any;
    link?: string;
}

export interface Address {
    street: string;
    zip: string;
    city: string;
    geocode?: GeoCodes;
}

export enum FormStatus {
    EDIT = 'edit',
    CREATE = 'create'
}

export enum MessageType {
    SUCCESS = 'success',
    FAILURE = 'failure'
}
