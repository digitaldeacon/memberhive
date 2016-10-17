export function EventTemplateScheduleController(
  EventTemplateService,
  EventTemplateOptions,
  resolveTemplate,
  resolveSchedule
) {"ngInject";
  this.template = resolveTemplate;
  this.schedule = resolveSchedule;
  this.types = EventTemplateOptions;
  this.save = () => {

  };

  this.newItem = () => {
    let newId = parseInt(_.max(Object.keys(this.schedule.data))) + 1;
    let data = {name: "New Schedule Point", type: "text"};
    this.schedule.data[newId] = data;
  };

  this.deleteItem = (id) => {
    delete this.schedule.data[id];
  };
}
