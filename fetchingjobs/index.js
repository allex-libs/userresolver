function createDbFetchingJobsLib (execlib) {
  'use strict';
  var mylib = {};

  require('./basecreator')(execlib, mylib);
  require('./fetchercreator')(execlib, mylib);
  require('./fetcherbycredentialscreator')(execlib, mylib);
  require('./startingwithfetchercreator')(execlib, mylib);
  require('./existsfetchercreator')(execlib, mylib);

  return mylib;
}
module.exports = createDbFetchingJobsLib;
