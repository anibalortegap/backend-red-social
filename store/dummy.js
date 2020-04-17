const db = {
    'user': [
        {
            id: '1', name: 'Anibal'
        },
        {
            id: '2', name: 'Carlos'
        },
    ],
};

async function list(table) {
    return db[table];
};

async function get(table, id) {
    let collection = await list(table);
    return collection.filter(item => item.id === id)[0] || null;
};

async function upsert(table, data) { 
    db[table].push(data);
    return data;
};

async function remove(table, id) {
    let collection = await list(table);
    const deleteItem = collection.filter(item => item.id === id)[0] || null;
    console.log(deleteItem);
    
 };


module.exports = {
    list,
    get,
    upsert,
    remove
};