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
    app.post('/items', function(req, res) {
        readFile(function(data) { 
            const newItemId = Object.keys(data).length + 1
            data[newItemId] = req.body
            writeFile(JSON.stringify(data, null, 2), function() { res.status(200).send('new item added') })
         }, true)
    })

    // Read
    app.get('/items', function(req, res) {
        readFile(function(data) { res.send(data) }, true)
    })

    // Update
    app.put('/items/:id', function(req, res) {
        readFile(function(data) {
            const itemId = req.params['id']
            data[itemId] = req.body
            writeFile(JSON.stringify(data, null, 2), function() { res.status(200).send("item id:${itemId} updated")})
        })
    })
    // Delete
    app.delete('/items/:id', function(req, res) {
        readFile(function(data) {
            const itemId = req.params['id']
            delete data[itemId]
            writeFile(JSON.stringify(data, null, 2), function() { res.status(200).send("item id:${itemId} removed")})
        })
    })
}

module.exports = itemsRoutes;