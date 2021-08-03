function createUserResolverLib (execlib) {
  'use strict';

  var lib = execlib.lib,
    mylib = {};

  mylib.fetchingjobs = require('./fetchingjobs')(execlib);

  require('./basecreator')(lib, mylib);
  require('./plaincreator')(lib, mylib);
  require('./cryptercreator')(lib, mylib);

  return mylib;
}
module.exports = createUserResolverLib;
