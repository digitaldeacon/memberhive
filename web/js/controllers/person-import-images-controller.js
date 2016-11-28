export function PersonImportImagesController(
    Person,
    $scope,
    AvatarService
){"ngInject";
  Person.find().$promise.then((data) => this.persons = data);
  this.importStarted = false;
  this.progress = 0;
  this.filesCount = 0;
  this.uploadImportFiles = (files) => {
    if(!files) return;

    this.importStarted = true;
    this.filesCount = files.length;
    this.counter = 0;
    files.forEach((file) => {
      var name = file.name.substr(0, file.name.lastIndexOf('.')).split('_');
      var firstName = name[1];
      var lastName = name[0];
      this.persons.forEach((person) => {
        if(person.firstName === firstName && lastName === person.lastName) {
          AvatarService.saveAvatar(person.id, file).then(() => {
            this.counter++;
            this.updateProgress();
          });
          return;
        }
      });
    });
    //foreach
  };

  this.updateProgress = () => {
    if(this.filesCount === 0 || this.counter === 0) {
      this.progress = 0;
      return;
    }
    this.progress = (this.counter / this.filesCount)*100;
  };

  $scope.$watch('files', () => {
    this.uploadImportFiles($scope.files);
  });


}
