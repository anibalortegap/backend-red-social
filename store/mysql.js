const mysql = require('mysql');
const config = require('../config');

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.db,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('DB Connected!');
    }
  });

  connection.on('error', (err) => {
    console.error('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${config.mysql.database}.${table}`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${config.mysql.database}.${table} WHERE id='${id}'`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}

function remove(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE * FROM ${config.mysql.database}.${table} WHERE id='${id}'`,
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${config.mysql.database}.${table} SET ?`,
      data,
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${config.mysql.database}.${table} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function query(table, query, join) {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    console.log('key: ', key);
    const val = join[key];
    console.log('val: ', val);
    joinQuery = `JOIN ${config.mysql.database}.${key} ON ${config.mysql.database}.${table}.${val} = ${config.mysql.database}.${key}.id`;
    console.log(joinQuery);
  }

  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${config.mysql.database}.${table} ${joinQuery} WHERE ${config.mysql.database}.${table}.?`,
      query,
      (err, res) => {
        if (err) {
          return reject(err);
        } else {
          resolve(JSON.parse(JSON.stringify(res))[0] || null);
        }
      }
    );
  });
}

async function upsert(table, data) {
  const validate = await get(table, data.id);
  console.log(validate);
  if (validate.length > 0) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
