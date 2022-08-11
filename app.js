const express = require('express');
const WebSocket = require('ws');

const port = 6969;
const wss = new WebSocket.Server({ port: port })

const clients = []

wss.on('connection', function connection(ws, request, client) {
    ws.on('message', function incoming(data) {
        console.log(username + ': ' + data.toString())

        try {
            const json = JSON.parse(data)
            if(json.type === 'join') {

            } else if(json.type === 'join') {

            }   
        } catch (e) {
            ws.send()
        }


        if(data.toString() === 'REQ_ONLINE_USERS') {
            ws.send(JSON.stringify({
                total: clients.length,
                // online_users:
            }))
            return
        }

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: "chat",
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
                client.send(JSON.stringify({
                    type: "info-left",
                    username: username,
                    message: username + ' left...'
                }));
            }
        })

        if(indexClient !== -1) {
            clients.splice(indexClient, 1)
        }
    });
})

function sendJoinConfirmed(username) {
    return JSON.stringify({
        type: "join_confirmed",
        username: username,
        message: "Join Success! we will send you all online players soon..."
    })
}

function sendUsernameTaken(username) {
    return JSON.stringify({
        type: "username_taken",
        username: username,
        message: "Username: " + username + " has already taken..."
    })
}

function sendMessage(username, message) {
    return JSON.stringify({
        type: "message",
        username: username,
        message: message
    })
}

function sendUserJoined(username) {
    return JSON.stringify({
        type: "user_joined",
        username: username,
        message: username + " joined the chat..."
    })
}

function sendUserLeft(username) {
    return JSON.stringify({
        type: "user_left",
        username: username,
        message: username + " left the chat..."
    })
}

function sendErrorMessage(username) {
    return JSON.stringify({
        type: "error_message",
        username: username,
        message: "Error sending message, try again later!"
    })
}

function sendOnlineUsers(username) {
    const users = []
    clients.forEach((it) => {
        if(it.username !== username) users.push(it.username)
    })
    return JSON.stringify({
        online_users: users
    })
}

// var username = 'Undefined'
//
// try {
//     const indexUser = request.rawHeaders.indexOf('username')
//     username = request.rawHeaders[indexUser+1]
//     clients.push({
//         ws: ws,
//         username: username
//     })
// } catch (e) {
//
// }
//
// console.log(username + ' Joined...')
// wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({
//             type: "info-join",
//             username: username,
//             message: username + ' joined...'
//         }));
//     }
// })

// server.listen(port, function() {
//     console.log(`Server is listening on ${port}!`)
// })