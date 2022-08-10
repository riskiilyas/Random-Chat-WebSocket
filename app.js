// const express = require('express');
const WebSocket = require('ws');

const port = 6969;
const wss = new WebSocket.Server({ port: port })

const clients = []

wss.on('connection', function connection(ws, request, client) {
    // console.log(request)
    // console.log('........................................')
    // console.log(client)
    var username = 'Undefined'

    try {
        const indexUser = request.rawHeaders.indexOf('username')
        username = request.rawHeaders[indexUser+1]
        clients.push({
            ws: ws,
            username: username
        })
    } catch (e) {

    }

    console.log(username + ' Joined...')
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(username + ' Joined...');
        }
    })

    ws.on('message', function incoming(data) {
        const indexClient = clients.indexOf(ws)

        console.log(username + ': ' + data.toString())

        if(data.toString() === 'REQ_ONLINE_USERS') {
            ws.send(JSON.stringify({
                total: clients.length,
                online_users:
            }))
            return
        }

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    username: username,
                    message: data.toString()
                }));
            }
        })
    })

    ws.on('close', function(reasonCode, description) {
        const indexClient = clients.indexOf(ws)

        console.log('a Client ' + connection.remoteAddress + ' disconnected.\n' + clients.length + ' remaining');
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(username + ' Left the Chat...');
            }
        })

        if(indexClient !== -1) {
            clients.splice(indexClient, 1)
        }
    });
})

// server.listen(port, function() {
//     console.log(`Server is listening on ${port}!`)
// })