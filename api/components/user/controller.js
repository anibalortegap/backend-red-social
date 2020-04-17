const nanoid = require('nanoid');

const TABLE = 'user';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    function list() {
        return store.list(TABLE);
    };

    function get(idUser) {
        return store.get(TABLE, idUser);
    };


    function remove(idUser) {
        return store.remove(TABLE, idUser);
    }

    function add(body) {
        const user = {
            name: body.name
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        return store.upsert(TABLE, user);
    }
    return {
        list,
        get,
        remove,
        add
    };
}
