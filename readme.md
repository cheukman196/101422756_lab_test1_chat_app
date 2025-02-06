# Chat App

## Login and Registration (validations)
- usernames must be unique (3-30 length, alphanuermical and  _ allowed only)
- passwords are hashed before stored to MongoDB Atlas
- first names and last names are not required to be unique, but have length limits
- sessions are maintained in localStorage as 'username' after successfully logging in
- Group Chat and Direct Message pages will redirect user to login page if session is not found
## Group Chat
- users can join the group chat server
- users can join a room and chat, afterwards they can leave a room
- Chat bot will notify users in the room who joined and who left
- all chats are sent to people in the room only
- all chats are persisted to MongoDB Atlas via Mongoose

## Direct Message
- users can join the Direct Message server
- users can input which users to sent their direct messages to
- direct messages are sent to users if they are online
- direct messages are saved to MongoDB Atlas via Mongoose