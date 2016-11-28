import {AddressService} from './services/address-service';
import {AddressDirective, AddressEditDirective} from './directives/address-directive';

export var mhAddressModule = angular.module('mh.address',
  [
    'iso-3166-country-codes'
  ]
);
mhAddressModule.factory('AddressService', AddressService);
mhAddressModule.directive('formataddress', AddressDirective);
mhAddressModule.directive('mhAddressEdit', AddressEditDirective);
