function createFetcherByCredentialsJob (execlib, mylib) {
  'use strict';

  var lib = execlib.lib;

  function FetcherByCredentials (usernamecolumnname, passwordcolumnname, credentials, sink, defer) {
    mylib.DbFetchingJob.call(this, usernamecolumnname, passwordcolumnname, sink, defer);
    this.credentials = credentials;
  }
  lib.inherit(FetcherByCredentials, mylib.DbFetchingJob);
  FetcherByCredentials.prototype.destroy = function () {
    this.credentials = null;
    mylib.DbFetchingJob.prototype.destroy.call(this);
  };
  FetcherByCredentials.prototype.createFilter = function () {
    return {
      op: 'eq',
      field: this.usernamecolumnname,
      value: this.credentials.username
    };
  };
  FetcherByCredentials.prototype.isSingleShot = function () {
    return true;
  };

  mylib.FetcherByCredentials = FetcherByCredentials;
}
module.exports = createFetcherByCredentialsJob;
