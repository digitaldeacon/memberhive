export function EventController(
    EventService,
    EventTemplate,
    resolveEvent,
    resolveTemplates,
    resolveTemplate,
    Shout,
    EventStatusOptions,
    $state
) {"ngInject";
  this.item = resolveEvent;
  this.templates = resolveTemplates;
  this.template = resolveTemplate;
  if(!_.isEmpty(resolveTemplate)) {
    this.templateId = resolveTemplate.id;
    this.item.name = resolveTemplate.name;
  } else {
     this.templateId = undefined;
  }
  this.item.options = this.item.options || {};
  this.item.options.status = this.item.options.status || {};
    
  this.updateTemplate = () => {
    this.template = _.find(this.templates, {id: this.templateId});
    if(!this.item.name) {
      this.item.name = this.template.name;
    }
  };
  
  this.statusOptions = EventStatusOptions;
  
  this.selectStatus = (id, index) => {
    this.item.options.status[index] = id;
  };
  
  this.statusColor = (id, index) => {
    let status = this.item.options.status[index] || null;
    if(status === null || status !== id) return "#AEAEAE";
    return this.statusOptions[id].color;
  };
  this.save = () => {
    this.item.templateId = this.templateId;
    EventService.save(this.item)
      .then(
        () => $state.go("event.list"),
        (err) => Shout.vError(err)
      );
  };

}
