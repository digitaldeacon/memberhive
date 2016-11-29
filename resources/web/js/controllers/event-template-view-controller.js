export function EventTemplateViewController(
  EventTemplate,
  resolveTemplate,
  resolveEvents
) {"ngInject";
  this.template = resolveTemplate;
  this.events = resolveEvents;

}
