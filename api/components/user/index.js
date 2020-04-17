/**
 * Vamos hacer que nuestro controlador no requiera siempre automaticamente que esa sea su base de datos
 * Esto es muy util para la parte de testing, podemos testear nuestro controlador sin consumir la base de datos de produccion
 * Podriamos probar contra un Mock o contra una base de datos de pruebas
 * Vamos a crear nuestro controlador como un contructor al cual le pasamos o le injectamos la base de datos
 * 
 * Este archivo nos va permiter realizar la exportacion de lo que tengamos en el controlador de user
 */
const store = require('../../../store/dummy');

const ctrl = require('./controller');

//Convertir nuestro objeto CTR en una Funcion y le injectamos nuestro Store
module.exports = ctrl(store);