export function q($q) { "ngInject";
  
  this.isPromise = (v) => v && typeof v === 'object' && typeof v.then === 'function';
  
  this.all = (obj) => {
    var func = null;
    if(_.isArray(obj)) 
      func = _.map;
    else if(_.isObject(obj))
      func = _.mapValues;
    else
      return $q.all(obj);
      
    
    var objectOfPromises = func(obj, (value) => {
      if (this.isPromise(value)) {
          return value;
      } else if(_.isArray(value)) {
          return this.all(value);
      } else if(_.isObject(value)) {
          return this.all(value);
      } else {
          return $q.resolve(value);
      }
    });
    return $q.all(objectOfPromises);
  };
  
  return {
    all: this.all
  };
}
