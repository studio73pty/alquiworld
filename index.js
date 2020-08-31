const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const mysql = require('mysql');
//const fs = require('fs');
require('dotenv').config();
const knex = require('knex');
//const bcrypt = require('bcrypt-nodejs');

// Llamando a Uploads y Cloudinary
const upload = require('./controllers/ImageUploader/multer');
const cloudinary = require('./controllers/ImageUploader/Cloudinary');


//Llamando a los controladores
const homeProductos = require('./controllers/productos/HomeProductos');
const buscarProductoId = require('./controllers/productos/BuscarProductoId.js');
const modificarProducto = require('./controllers/productos/ModificarProducto');
const eliminarProducto = require('./controllers/productos/EliminarProducto');


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

//Agregar producto
app.use('/agregar-producto', upload.array('image'), async(req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Alquiworld');
    let safeUrl = '';
    const insert = (str, index, value) => {
      safeUrl = str.substr(0, index) + value + str.substr(index);
  }
  
    const { 
      nombre, 
      descripcion
        } = req.body;
  
  
    if (req.method === 'POST') {
        const urls = [];
        const files = req.files;
  
        for(const file of files) {
            const { path } = file;
  
            const newPath = await uploader(path);
  
            urls.push(newPath);
  
            fs.unlinkSync(path);
        
            };
  
            const unsafeUrl = urls[0].url;
            insert(unsafeUrl, 4, 's');
  
               db('posts').insert({
                nombre, 
                descripcion,   
                imagen: safeUrl   
             }).then(res.status(200).json('producto agregado'))
               // id: urls[0].id
          } else {
        res.status(405).json({
            err: "No se pudo subir la imagen"
        })
    }
  })
  


//Modificar producto
app.patch('/modificar-producto/:id', (req, res) => { modificarProducto.handleModificarProducto(req, res, db)});

//Eliminar producto
app.delete('/eliminar-producto/:id', (req, res) => { eliminarProducto.handleEliminarProducto(req, res, db)});




const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`I'm alive here ${port}`))