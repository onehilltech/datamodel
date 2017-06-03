'use strict';

const mongodb = require ('mongodb')
  , mime      = require ('mime-types')
  , fs        = require ('fs')
  , path      = require ('path')
  ;

function gridfs (file, db, bucketName) {
  return function __dabGridFS (callback) {
    const bucket = new mongodb.GridFSBucket (db, {bucketName: bucketName });
    const contentType = mime.lookup (file);
    const opts = {contentType: contentType};
    const name = path.basename (file);

    var uploadStream  = bucket.openUploadStream (name, opts);

    fs.createReadStream (file)
      .pipe (uploadStream)
      .once ('error', function (err) {
        return callback (err);
      })
      .once ('finish', function () {
        return callback (null, uploadStream.id);
      });
  };
}

module.exports = gridfs;