const { v4: uuidv4 } = require('uuid');
const path = require('path');

const uploadFile = (files, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const cutFile = file.name.split('.');
        const fileExtension = cutFile[cutFile.length - 1];
   
        // Validate file extension
        if(!allowedExtensions.includes(fileExtension)) {
            return reject(`Invalid file extension. The allowed extensions are ${ allowedExtensions.join(', ') }`);
        }

        const tempFileName = uuidv4() + '.' + fileExtension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempFileName);
      
        file.mv(uploadPath, (error) => {
          if (error) {
            reject('The file could not be uploaded' + error);
          }
          resolve(tempFileName);
        });

    });

}

module.exports = {
    uploadFile
}