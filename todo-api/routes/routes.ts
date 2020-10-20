const appRouter = function(app, fs) {
    // Loaders
    const itemsRoutes = require('./items.ts')

    // Default
    app.get('/', (req, res) => {
        res.send('Todo Api : to get all items use /items');
    })
    // Items
    itemsRoutes(app, fs)
}

module.exports = appRouter