export function formatFacebookUrl() {
   return function(item) {
      return 'https://facebook.com/'+item;
    };
}
export function formatSkypeUrl() {
  return function(item) {
      return 'skype:'+item;
    };
}
export function formatName() {
  return function(person) {
      var ret = person.firstName;
      if (person.middleName)
        ret += ' ' + person.middleName;
      ret += ' ' + person.lastName;
      if (person.nickName)
        ret += ' (' + person.nickName + ')';
      return ret;
    };
}
export function formatFirstName() {
  return function(person) {
      var ret = person.firstName;
      if(person.middleName)
        ret += ' ' + person.middleName;
      if (person.nickName)
        ret += ' (' + person.nickName + ')';
      return ret;
    };
}