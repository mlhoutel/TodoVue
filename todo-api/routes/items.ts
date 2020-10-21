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
            let obj = data //JSON.parse(data)
            obj.items.push(req.body)
            writeFile(JSON.stringify(obj, null, 2), function() { res.status(200).send('new item added') })
         }, true)
    })

    // Read
    app.get('/items', function(req, res) {
        readFile(function(data) { res.send(data) }, true)
    })

    // Update
    app.put('/items/:id', function(req, res) {
        readFile(function(data) {
            let obj = JSON.parse(data)
            const itemId = req.params['id']
            obj.items[itemId] = req.body
            writeFile(JSON.stringify(obj, null, 2), function() { res.status(200).send(`item id:${itemId} updated`)})
        })
    })
    // Delete
    app.delete('/items/:id', function(req, res) {
        readFile(function(data) {
            let object = JSON.parse(data)
            let array = object.items
            const itemId = req.params['id']
            array.splice(itemId, 1)
            writeFile(JSON.stringify(object, null, 2), function() { res.status(200).send(`item id:${itemId} removed`)})
        })
    })
}

module.exports = itemsRoutes;