export function AddressService(gettextCatalog) {"ngInject";

  return {

    /**
     * A dictionary with translations of the address types.
     */
    addressTypes: {
      'home': gettextCatalog.getString('Home Address'),
      'work': gettextCatalog.getString('Work Address'),
      'postal': gettextCatalog.getString('Postal Address')
    }

  };
}
