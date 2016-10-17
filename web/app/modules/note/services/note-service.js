export function NoteService(Note) {"ngInject";

  this.all = (filter) => {
    filter = filter || {};
    return Note.find({filter: filter}).$promise;
  };

  this.new = () => {
    return new Note();
  };

  this.get = (noteId) => {
    return Note.findById({id: noteId}).$promise;
  };

  this.save = (note) => {
    return Note.upsert({}, note).$promise;
  };
}
