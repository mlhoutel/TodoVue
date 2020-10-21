const appRouter = function(app, fs, port) {
    // Loaders
    const itemsRoutes = require('./items.ts')
    const listsRoutes = require('./lists.ts')

    // Default
    app.get('/', (req, res) => {
        res.send(`Todo Api is listening on port ${port}</br>
        <ul>
            <li>To access lists : <a href="http://localhost:${port}/lists">http://localhost:${port}/lists</a></li>
            <li>To access items : <a href="http://localhost:${port}/lists/0/items">http://localhost:${port}/lists/{listId}/items</a></li>
        </ul>`);
    })
    // Items
    itemsRoutes(app, fs)
    listsRoutes(app, fs)
}

module.exports = appRouter