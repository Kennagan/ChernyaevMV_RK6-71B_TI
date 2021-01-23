const express = require('express');
const app = express();
const {readData, writeData} = require('./utils');

const port = 7154;
const hostname = 'localhost';

let itemracks = [];

//Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Middleware для логгирования запросов
app.use((request, response, next) => {
    console.log(
        new Date().toISOString(),
        request.method,
        request.originalUrl
    );
    next();
});

//Middleware для правильного представления request.body
app.use(express.json());

//---------------Route-------------------

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/itemracks', async (request, response) => {
    itemracks = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.json(itemracks);
});

app.post('/itemracks', async (request, response) => {
    itemracks.push(request.body);

    await writeData(itemracks);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Itemrack '${request.body.itemrackName}' was successfully added`});
});

app.post('/itemracks/:itemrackId/items', async (request, response) => {
    const {newItemName} = request.body;
    const itemrackId = Number(request.params.itemrackId);
    //console.log(itemrackId);

    itemracks[itemrackId].items.push(newItemName);
    await writeData(itemracks);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Item '${newItemName}' was successfully added in itemrack '${itemracks[itemrackId].itemrackName}'`});
});

app.patch('/itemracks/:itemrackId/items/:itemId', async (request, response) => {
    const {newItemName} = request.body;
    const itemrackId = Number(request.params.itemrackId);
    const itemId = Number(request.params.itemId);

    itemracks[itemrackId].items[itemId] = newItemName;
    await writeData(itemracks);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Item '${itemId}' was successfully edited in itemrack '${itemracks[itemrackId].itemrackName}'`});
});

app.delete('/itemracks/:itemrackId/items/:itemId', async (request, response) => {
    const itemrackId = Number(request.params.itemrackId);
    const itemId = Number(request.params.itemId);

    console.log(itemracks);
    const removedItem = itemracks[itemrackId].items[itemId];
    console.log(itemracks[itemrackId].items.itemId);
    console.log(itemId);
    console.log(itemrackId);

    itemracks[itemrackId].items = itemracks[itemrackId].items.filter(
        (item, index) => index !== itemId
    );
    await writeData(itemracks);

    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Item '${removedItem}' was successfully deleted`});
});

app.patch('/itemracks/:itemrackId', async (request, response) => { //Здесь не учитываются по идее куда мы перемещаем
    const {itemId, destItemrackId} = request.body;
    const itemrackId = Number(request.params.itemrackId);

    if(destItemrackId < 0 || destItemrackId >= itemracks.length)
    {
        response.setHeader('Content-Type', 'application/json');
        response.status(403).json({error: `Wrong destination itemrack ID: ${destItemrackId}`});
    }

    const movedItem = itemracks[itemrackId].items[itemId];
    itemracks[itemrackId].items = itemracks[itemrackId].items.filter(
        (item, index) => index !== itemId
    );

    itemracks[destItemrackId].items.push(movedItem);

    await writeData(itemracks);
    
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json({info: `Item '${movedItem}' was successfully moved from itemrack '${itemracks[itemrackId].itemrackName}' to itemrack '${itemracks[destItemrackId].itemrackName}'`});
});

app.listen(port, hostname, (err) => {
    if(err) {
        console.log('Error', err);
    }

    console.log(`server is working on ${hostname}:${port}`);
});