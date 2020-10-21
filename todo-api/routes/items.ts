const itemsRoutes = function(app, fs) {
    const dataPath = './data/items.json'

    const readFile = function(callback, returnJson = false, filePath = dataPath, encoding = 'utf8') {
        fs.readFile(filePath, encoding, function(err, data) {
            if (err) { throw err }
            callback(returnJson ? JSON.parse(data) : data)
        })
    }

    const writeFile = function(fileData, callback, filePath = dataPath, encoding = 'utf8') {
        fs.writeFile(filePath, fileData, encoding, function(err) {
            if (err) { throw err }
            callback()
        })
    }

    // Create
    app.post('/lists/:idliste/items', function(req, res) {
        readFile(function(data) {
            let object = data
            const listId = req.params['idliste']
            object.lists[listId].items.push(req.body)
            writeFile(JSON.stringify(object, null, 2), function() { res.status(200).send('new item added') })
         }, true)
    })

    // Read
    app.get('/lists/:idliste/items', function(req, res) {
        const listId = req.params['idliste']
        readFile(function(data) { res.send(data.lists[listId].items) }, true)
    })

    // Update
    app.put('/lists/:idliste/items/:id', function(req, res) {
        readFile(function(data) {
            let object = JSON.parse(data)
            const itemId = req.params['id']
            const listId = req.params['idliste']
            object.lists[listId].items[itemId] = req.body
            writeFile(JSON.stringify(object, null, 2), function() { res.status(200).send(`item id:${itemId} updated`)})
        })
    })
    // Delete
    app.delete('/lists/:idliste/items/:id', function(req, res) {
        readFile(function(data) {
            let object = JSON.parse(data)
            const itemId = req.params['id']
            const listId = req.params['idliste']
            let array = object.lists[listId].items
            array.splice(itemId, 1)
            writeFile(JSON.stringify(object, null, 2), function() { res.status(200).send(`item id:${itemId} removed`)})
        })
    })
}

module.exports = itemsRoutes;