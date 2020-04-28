const nanoid = require('nanoid');

const auth = require('../auth');
const TABLE = 'user';

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }
  function list() {
    return store.list(TABLE);
  }

  function get(idUser) {
    return store.get(TABLE, idUser);
  }

  function remove(idUser) {
    return store.remove(TABLE, idUser);
  }

  async function add(data) {
    const user = {
      name: data.name,
      username: data.username,
    };

    if (data.id) {
      user.id = data.id;
    } else {
      user.id = nanoid.nanoid();
    }

    if (data.username || data.password) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }

    return store.upsert(TABLE, user);
  }

  function follow(from, to) {
    return store.upsert(TABLE + '_follow', {
      user_from: from,
      user_to: to,
    });
  }

  function following(idUser) {
    const join = {};
    join[TABLE] = 'user_to';
    console.log(join);
    const query = { user_from: idUser };
    return store.query(TABLE + '_follow', query, join);
  }
  return {
    list,
    get,
    remove,
    add,
    follow,
    following,
  };
};
