const eliminarProducto = (req, res, db) => {
    const { id } = req.params;
    db('productos').where({id})
    .del()
    .then(res.json('borrado exitoso!'))
}


module.exports = {
    eliminarProducto
}