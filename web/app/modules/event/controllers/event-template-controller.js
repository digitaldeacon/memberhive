export function EventTemplateController(
  EventTemplateService,
  EventTemplateOptions,
  resolveTemplate,
  $state
) {"ngInject";
  this.types = EventTemplateOptions;
  this.template = resolveTemplate;
  
  this.newOption = () => {
    var data = {name: "New Option", type: "text"};
    this.template.data.push(data);
  };
  
  this.save = () => {
    EventTemplateService.save(this.template)
      .then(() => $state.go("event.templates"));
  };
  
  this.deleteOption = (index) => {
    this.template.data.splice(index, 1);
  };
}
