export function QueryBuilderModelService(gettextCatalog) {"ngInject";
  return {
    /**
     * Get the model definition for the query builder
     *
     * @param loopbackResource A model resource like `Person` or `Contact`
     * @returns {Array} Properties formatted for the query builder
     */
    getModel: (loopbackResource) => {
      var qbModel = [];
      for (var property in loopbackResource.model.properties) {
        if (!loopbackResource.model.properties.hasOwnProperty(property))
          continue;
        let prop = loopbackResource.model.properties[property];

        // Add only properties which have the `queryBuilder` section
        if (!prop.hasOwnProperty('queryBuilder'))
          continue;

        let result = prop.queryBuilder;

        // Translate label and possible values
        result.label = gettextCatalog.getString(result.label);
        if (result.hasOwnProperty('values')) {
          for (var key in result.values) {
            if (!result.values.hasOwnProperty(key))
              continue;
            result.values[key] = gettextCatalog.getString(result.values[key]);
          }
        }

        // Mix in property name and type
        result.id = property;
        if (!result.hasOwnProperty('type')) // Use Loopback type unless explicitly specified
          result.type = prop.type;

        if (result.type === 'date') {
          result.validation = {format: 'YYYY/MM/DD'};
          result.plugin = 'datepicker';
          result.plugin_config = { // jshint ignore:line
            format: 'yyyy/mm/dd',
              todayBtn: 'linked',
              todayHighlight: true,
              autoclose: true
          };
        }

        qbModel.push(result);
      }
      return qbModel;
    }
  };
}
