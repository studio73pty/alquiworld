const handleModificarProducto = (req, res, db) =>{
    const { id } = req.params;
     const { 
        nombre,
        descripcion
        } = req.body;

               db('productos').where({ id }).update({     
                nombre,
                descripcion
             }).then(res.status(200).json('producto actualizado'))
          
         
         }
 module.exports = {
    handleModificarProducto
 }