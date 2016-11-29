export function AvatarService(Avatar, Upload, mhConfig) {"ngInject";

  this.dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mimeString});
  };

  this.save = (id, file, params) => {
    return Upload.upload({
        url: mhConfig.apiUrl+"/Avatars/"+id+"/upload?"+jQuery.param(params),
        file: file,
        fileName: 'avatar.jpg'
      });
  };

  return {
    saveAvatar: (personId, file, params) => {
      return this.save(personId, file, params);
    },

    saveAvatarFromDataURI: (personId, file, params) => {
      return this.save(personId, this.dataURItoBlob(file), params);
    },

    deleteAvatar: (person) => {
      return Avatar.destroyContainer({container: person.id});
    },
    
    getAvatarUrl: (person, size) => {
      if(!person.hasAvatar) return "/app/images/avatar/"+size+".jpg";
      return mhConfig.apiUrl+"/Avatars/"+person.id+"/download/"+size+".jpg";
    }

  };
}
