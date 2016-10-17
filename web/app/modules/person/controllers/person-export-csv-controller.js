import {saveAs} from "../../../scripts/FileSaver.min";

export function PersonExportCSVController(
  Person,
  q
) {"ngInject";
  this.query = {};

  this.getAllCSV = () => {
    q.all(this.query).then((resolved) => {
      Person.exportCSV({filter: resolved}).$promise.then(
        (data) => {
          var file = new Blob([data.csv], { type: 'text/csv' });
          saveAs(file, "export.csv");
        }
      );
    });
  };
}
