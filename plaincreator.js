function createPlainManipulator (lib, mylib) {
  'use strict';
  var q = lib.q,
    qlib = lib.qlib;

  function PlainManipulator (prophash) {
    mylib.Base.call(this, prophash);
  }
  lib.inherit(PlainManipulator, mylib.Base);
  PlainManipulator.prototype.dbChannelName = function () {
    return 'user';
  };
  PlainManipulator.prototype.createOnDb = function (datahash) {
    return this.dbSink.call('create', datahash);
  };
  PlainManipulator.prototype.updateOnDbByUsername = function (username, datahash, options) {
    return this.dbSink.call('update', {
      op: 'eq',
      field: this.namecolumn,
      value: username
    }, datahash, options);
  };
  PlainManipulator.prototype.updateOnDbByUsernameHash = function (usernamehash, datahash, options) {
    return this.updateOnDbByUsername(this.userNameValueOf(usernamehash), datahash, options);
  };
  PlainManipulator.prototype.fullFetchForOuter = function (credentials) {
    return this.fetchByCredentials(credentials)
      .then(this.hashOfDBHash.bind(this));
  };

  mylib.PlainManipulator = PlainManipulator;
}
module.exports = createPlainManipulator;
