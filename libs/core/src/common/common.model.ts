import { Person } from '../modules/person/person.model';

export interface Message {
  type: MessageType;
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
  uid?: string | number;
  people?: Partial<Person>[];
  avatar?: any;
  link?: string;
}

export interface Address {
  street: string;
  zip: string;
  city: string;
  geocode?: GeoCodes;
}

export interface FilterSet {
  key: string;
  label: string;
}

export interface Filter {
  current?: string;
  filters?: string[];
}

export enum FormStatus {
  EDIT = 'edit',
  CREATE = 'create'
}

export enum MessageType {
  SUCCESS = 'success',
  FAILURE = 'failure',
  DEFAULT = ''
}

export const emptyMessage: Message = {
  type: MessageType.DEFAULT
};
