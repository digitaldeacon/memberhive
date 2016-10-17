export function NoteListController(NoteService, resolveNotes) {"ngInject";
  this.notes = resolveNotes;
}
