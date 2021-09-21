function createCrypter (lib, mylib) {
  'use strict';
  var q = lib.q;

  function Crypter(prophash) {
    mylib.Base.call(this, prophash);
  }
  lib.inherit(Crypter, mylib.Base);
  Crypter.prototype.check = function (credentials) {
    var _crdn = credentials;
    var ret = this.fetchByCredentials(credentials)
    .then(
      this.match.bind(this, _crdn)
    );
    _crdn = null;
    return ret;
  };
  Crypter.prototype.match = function (credentials, dbhash) {
    if (!credentials) return false;
    if (!dbuserhash) return false;
    return 
      credentials.username===this.userNameValueOf(dbuserhash)
      &&
      credentials.password===this.passwordValueOf(dbuserhash)
      ;
  };
  Crypter.prototype.encrypt = function (datahash) {
    return this.translatedHash(datahash);
  };
  Crypter.prototype.publicHash = function (datahash) {
    return datahash;
  };
  Crypter.prototype.dbChannelName = function () {
    return 'user';
  };

  mylib.Crypter = Crypter;
}

module.exports = createCrypter;
