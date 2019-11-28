const Sequelize = require('sequelize')
const conneqtion = require('../utils/database')
var Session = conneqtion.define('Session', {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000)
  });

  function extendDefaultFields(defaults, session) {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: session.userId
    };
  }
module.exports = {
    Session, extendDefaultFields
}
  