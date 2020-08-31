const handleBuscarProducto = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('productos').where({
        id: id
    }).then(post => {
        if(post.length){
            res.json(post[0])
        }else{
            res.status(400).json('!encontrado')
        }
    })
    .catch(err => res.status(400).json('error buscando producto' + err))

}

module.exports = {
    handleBuscarProducto
}