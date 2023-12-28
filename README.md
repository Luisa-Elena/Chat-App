# Chat application

### Contents of this file
- Description
- Installation
- Usage
- Documentation

## Description
- This project allows users to connect to chatrooms and they can have live conversations via text messages.
- I made this project by following this youtube playlist about working with websockets: https://www.youtube.com/watch?v=J8xReLuBNPY&list=PL0Zuz27SZ-6NOkbTDxKi7grs_oxJhLu07&ab_channel=DaveGray

## Installation

Here are the steps you need to follow to clone this repository: 

1. Install Git:
If you don't have Git installed, download and install it from https://git-scm.com/.

2. Navigate to the directory where you want to clone the repository. In your terminal, type: 

```sh
cd path/to/your/directory
```
or you can directly open the built-in terminal from VSCode.

3. Clone the reporitory, using: 
```sh
git clone "https://github.com/Luisa-Elena/Chat-App.git"
```

4. Install the dependencies: 
```sh
cd server
npm install
```

5. In order to run the project, navigate in the server folder and type:
```sh
npm run dev
```

6. Then, open the index.html file with the Live Server extension in VSCode, or type localhost:3500 in the search bar of your browser.

## Usage
- A user must enter its username and the chatroom name of the room he wants to enter and chat with people.

## Documentation
#### Client side
- User Interactions:
    - Handles sending messages and entering rooms when users submit forms.
    - Emits 'message' and 'enterRoom' events to the server.
- Socket.IO Connection:
    - Establishes a connection with the server using Socket.IO.
    - Listens for 'message' and 'activity' events from the server.
    - Emits 'activity', events when users type messages.
    - Emits 'enterRoom' event when a user enters a room
- UI Updates:
    - Dynamically updates the UI based on received messages and user activities.
    - Utilizes different message styles for the sender, receiver, and system messages.
#### Server side
- Server Setup:
    - Creates an Express app and an HTTP server.
    - Configures Socket.IO with CORS settings for client-server communication.
- Socket.IO Connection Handling:
    - Listens for 'connection' events and initializes communication with clients.
    - Handles 'enterRoom', 'message', 'disconnect', and 'activity' events from clients.
    - Manages user information, room changes, and disconnections.
