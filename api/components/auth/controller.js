const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLE = 'auth';
module.exports = (injectableStore) => {
  let store = injectableStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  async function upsert(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 8);
    }

    return store.upsert(TABLE, authData);
  }

  async function login(username, password) {
    const data = await store.query(TABLE, { username: username });

    return bcrypt.compare(password, data.password).then((isEqual) => {
      console.log(isEqual);
      if (isEqual === true) {
        delete data.password;
        return auth.sign(data);
      } else {
        throw new Error('[controllerAuth] Invalid data');
      }
    });
  }

  return {
    upsert,
    login,
  };
};
