/// CLIENT ///
{
	type: "message",
	username: {User you chat with},
	message: {Your message}
}

{
	type: "join",
	username: {Your username},
	message: Nullable
}

{
    type: "online_users",
    username: {Your username},
    message: Nullable
}

/// SERVER ///
{
	type: "join_confirmed",
	username: {Your Username},
	message: "Join Success! we will send you all online players soon..."
}

{
	type: "username_taken"
	username: {your username}
	message: "{Yourname} has already taken..."
}

{
	type: "message",
	username: {User who chats you},
	message: {the message}
}

{
	type: "user_joined"
	username: {User who joined},
	message: "{user} has joined the chat..."
}

{
	type: "user_left"
	username: {User who left},
	message: "{user} has left the chat..."
}

{
	type: "error_message"
	username: {User that you chat},
	message: {The Reason}
}

{
	type: "online_users",
	username: {Your Username},
	message:
	{
	    online_users : [{username : "..."}]
	}
}