var fs = require('fs');

module.exports = exports = function copyFile(source, target, onComplete) {
  var didComplete = false;

  var readStream = fs.createReadStream(source);
  readStream.on("error", function(err) {
    done(err);
  });

  var writeStream = fs.createWriteStream(target);
  writeStream.on("error", function(err) {
    done(err);
  });

  writeStream.on("close", function(ex) {
    done();
  });
  readStream.pipe(writeStream);

  function done(err) {
    if (!didComplete) {
      if(onComplete)
        onComplete(err);

      didComplete = true;
    }
  }
};