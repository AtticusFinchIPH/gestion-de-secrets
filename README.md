# gestion-de-secrets
Web application to create and share secret content.\
User Story and specification can be found: https://www.notion.so/Full-Stack-Outil-de-gestion-de-secrets-a7257b41a2b14d9eb62a489ad5b5ca2d
## Run locally
1. Setup environment variables\
To run this project in your local, you have to provide a .evn file with environment variables:
- GMAIL_USER: email that you will use to send notifications to user
- GMAIL_PASS: password provided to access used email
- GOOGLE_CLIENT_ID: need to login with google account
- GOOGLE_CLIENT_SECRET: need to login with google account\
You can also change other environment variables that listed in config.js file in backend as you like or leave as default.
2. Run application\
Start backend in cmd: `npm start` => Now, your server will start at your localhost in port 5000 as default.\
Start frontend in cmd: `cd frontend npm start` => Your frontend start at localhost in port 3000 as default of create-react-app.
