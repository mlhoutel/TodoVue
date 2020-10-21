const listsRoutes = function(app, fs) {
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
    app.post('/lists/', function(req, res) {
        readFile(function(data) {
            let object = data
            object.lists.push(req.body)
            writeFile(JSON.stringify(object, null, 2), function() { res.status(200).send('new list added') })
         }, true)
    })

    // Read
    app.get('/lists', function(req, res) {
        readFile(function(data) { res.send(data.lists) }, true)
    })

    // Update
    app.put('/lists/:idliste', function(req, res) {
        readFile(function(data) {
            let object = JSON.parse(data)
            const listId = req.params['idliste']
            object.lists[listId] = req.body
            writeFile(JSON.stringify(object, null, 2), function() { res.status(200).send(`list id:${listId} updated`)})
        })
    })
    // Delete
    app.delete('/lists/:idliste', function(req, res) {
        readFile(function(data) {
            let object = JSON.parse(data)
            const listId = req.params['idliste']
            let array = object.lists
            array.splice(listId, 1)
            writeFile(JSON.stringify(object, null, 2), function() { res.status(200).send(`list id:${listId} removed`)})
        })
    })
}

module.exports = listsRoutes;