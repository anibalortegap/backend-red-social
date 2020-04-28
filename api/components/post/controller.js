const nanoid = require('nanoid');
const TABLE = 'post';

module.exports = (injectableStore) => {
  let store = injectableStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  function list() {
    return store.list(TABLE);
  }
  function add(data) {
    const post = {
      text: data.text,
      user_id: data.user_id,
    };

    if (data.id) {
      post.id = data.id;
    } else {
      post.id = nanoid.nanoid();
    }
    console.log(post);
    return store.upsert(TABLE, post);
  }

  return {
    list,
    add,
  };
};
