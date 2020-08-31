const handleHomeProductos = (req, res, db) => {
    db.select().table('productos')
    .then(response => {
        response.sort(function(a, b) {
            return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
           
        });
        res.json(response)
    })
.catch(err => res.status(500).json('problema con la base de datos + ' + err))
}

module.exports = {
     handleHomeProductos
}