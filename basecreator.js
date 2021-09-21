function createDbResolverManipulatorBase (lib, mylib) {
  'use strict';

  function DbResolverManipulatorBase (prophash) {
    this.namecolumn = prophash.namecolumn || 'username';
    this.passwordcolumn = prophash.passwordcolumn || 'password';
    this.dbSink = null;
  }
  DbResolverManipulatorBase.prototype.destroy = function () {
    if (this.dbSink) {
      this.dbSink.destroy();
    }
    this.dbSink = null;
    this.passwordcolumn = null;
    this.namecolumn = null;
  };
  DbResolverManipulatorBase.prototype.subConnectToDbSink = function (dbsink) {
    var dbchannel = this.dbChannelName();
    if (!dbchannel) {
      return q(null);
    }
    return dbsink.subConnect('.', {name: dbchannel, role: dbchannel}).then(
      this.onDbSink.bind(this)
    );
  };
  DbResolverManipulatorBase.prototype.onDbSink = function (sink) {
    this.dbSink = sink;
    return sink;
  };
  DbResolverManipulatorBase.prototype.dbChannelName = function () {
    return null; //don't subconnect to DB
  };

//fetching methods
  DbResolverManipulatorBase.prototype.fetchByCredentials = function (credentials) {
    return (new mylib.fetchingjobs.FetcherByCredentials(
      this.namecolumn,
      this.passwordcolumn,
      credentials,
      this.dbSink
    ))
    .go();
  };

//translating methods
  DbResolverManipulatorBase.prototype.userNameValueOf = function (obj) {
    return obj ? obj[this.namecolumn] : void 0;
  };
  DbResolverManipulatorBase.prototype.passwordValueOf = function (obj) {
    return obj ? obj[this.passwordcolumn] : void 0;
  };
  DbResolverManipulatorBase.prototype.hashOfDBHash = function (dbhash) {
    if (!dbhash) {
      return null;
    }
    return {
      name: this.userNameValueOf(dbhash),
      role: 'user',
      profile: lib.pickExcept(dbhash, [this.passwordcolumn, 'salt'])
    };
  };
  DbResolverManipulatorBase.prototype.hashFromUsername = function (username) {
    var ret = {};
    ret[this.namecolumn] = username;
    return ret;
  };
  DbResolverManipulatorBase.prototype.hashFromPassword = function (password) {
    var ret = {};
    ret[this.passwordcolumn] = password;
    return ret;
  };
  DbResolverManipulatorBase.prototype.hashFromUsernameAndPassword = function (username, password) {
    var ret = {};
    ret[this.namecolumn] = username;
    ret[this.passwordcolumn] = password;
    return ret;
  };
  DbResolverManipulatorBase.prototype.translatedHash = function (datahash) {
    var obj = lib.pickExcept(datahash, ['username', 'password']);
    obj[this.namecolumn] = datahash.username;
    obj[this.passwordcolumn] = datahash.password;
    return obj;
  };

  mylib.Base = DbResolverManipulatorBase;
}
module.exports = createDbResolverManipulatorBase;
