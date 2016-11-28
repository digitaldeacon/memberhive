export function EventTemplateService(
  EventTemplate
) {"ngInject";
  
  this.modify = (eventTemplate) => {
    eventTemplate.startTime = new Date(eventTemplate.startTime);
    return eventTemplate;
  };
  
  this.mapModify = (events) => _.map(events, this.modify);
  
  this.all = () => {
    return EventTemplate.find().$promise.then(this.mapModify);
  };

  this.new = () => {
    var event = new EventTemplate();
    return event;
  };

  this.get = (eventTemplateId) => {
    return EventTemplate.findById({id: eventTemplateId}).$promise.then(this.modify);
  };

  this.save = (eventTemplate) => {
    return EventTemplate.upsert({}, eventTemplate).$promise.then(this.modify);
  };

}
