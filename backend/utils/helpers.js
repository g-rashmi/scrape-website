const fs = require('fs');
const path = require('path');

exports.ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
