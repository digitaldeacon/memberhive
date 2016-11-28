export function EventTemplatesController(
  EventTemplate
) {"ngInject";
  this.templates = EventTemplate.find();
}
