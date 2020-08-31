const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const mysql = require('mysql');
//const fs = require('fs');
require('dotenv').config();
const knex = require('knex');
//const bcrypt = require('bcrypt-nodejs');


//Llamando a los controladores
const homeProductos = require('./controllers/productos/HomeProductos');
const buscarProductoId = require('./controllers/productos/BuscarProductoId');


const db = knex({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      port: 3306,
      database: process.env.DATABASE
    }
  });


  
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {res.json('alquiworld vivo!')});


//----------------- Inicio de endpoints

//-------- Endpoints Productos

//Buscar todos productos
app.get('/home-productos', (req, res) => { homeProductos.handleHomeProductos(req, res, db)});

//Buscar producto por ID
app.get('/buscar-producto/:id', (req, res) => { buscarProductoId.handleBuscarProducto(req, res, db)});





const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`I'm alive here ${port}`))