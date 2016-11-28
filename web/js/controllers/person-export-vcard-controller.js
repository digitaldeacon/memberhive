import {saveAs} from "../../../scripts/FileSaver.min";

export function PersonExportVCardController(
  Person,
  q
) {"ngInject";
  this.query = {};

  this.getAllVCard = () => {
    q.all(this.query).then((resolved) => {
      Person.exportVCard({filter: resolved}).$promise.then(
        (data) => {
          let files = [];
          let file = 0;
          data.vcard.forEach((vcard) => {
            if(files.length <= file) {
              files.push("");
            }
            files[file] += vcard;
            if(files[file].length * 2 > 5*1024*1024) {
              file += 1;
            }
          });

          for(let i = 0; i < files.length; i++) {
            let blob = new Blob([files[i]], { type: 'text/vcard' });
            saveAs(blob, "export"+i+".vcard");
          }
        }
      );
    });
  };
}
