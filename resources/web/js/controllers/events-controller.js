export function EventsController(
  Event,
  EventService,
  resolveEvents,
  resolveTemplates,
  resolveNextEvents,
  EventStatusOptions,
  $state
) {"ngInject";
  this.events = resolveEvents;
  this.templates = resolveTemplates;
  this.nextEvents = resolveNextEvents;
  this.statusOptions = EventStatusOptions;

  this.findEventsForDay = (date) => {
    var ret = [];
    this.events.forEach((event) => {
      if(event.date && this.isSameDay(new Date(event.date), date)) {
        ret.push(event);
      }
    });
    return ret;
  };
  this.isSameDay = (date, otherDate) => {
    return date.toDateString() === otherDate.toDateString();
  };

  this.dayClick = (date) => {
    $state.go('event.create', {date: date});
  };


  this.setDayContent = (date) => {
    var events = this.findEventsForDay(date);
    var ret = "";
    events.forEach((event) => {
      ret += "<a href='"+$state.href("event.edit", { eventId: event.id })+"'>";
      ret += "<span class='event-calender-item'>" + event.name + "</span>";
      ret += "</a>";
    });
    return ret;
  };

  this.countStatus = EventService.countStatus;
}
