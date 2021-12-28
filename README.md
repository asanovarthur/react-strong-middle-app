Below you can see an instruction on how to launch this application on your computer:

#1. Create a Firebase project

Go to https://console.firebase.google.com/, choose "Add project", type down any project name you like and proceed.

#2. Add Firebase to this application

Once your Firebase project is created, click on "Web" icon on the project's dashboard. Once again, choose any name to register the application within Firebase system and copy the value of *firebaseConfig*. You will need them later.

#3. Activate Firebase Authentication

On Firebase website's sidebar click "Authentication" and press "Get started". Then in "Sign-in method" tab choose Google, enable it and fill the "Project support email" field.

#4. Activate Firestore Database

On Firebase website's sidebar click "Firestore Database" and press "Create Database". In a modal window choose "Test mode" and proceed with default database location.

#5. Set up environment variables

In your local project's root foolder create a file named ".env". Use the *firebaseConfig* value copied on step 2 to fiil in the missing fields. It should look like this:

SASS_PATH=node_modules;src/assets/scss
REACT_APP_FIREBASE_API_KEY=*your_firebase_api_key*
REACT_APP_FIREBASE_AUTH_DOMAIN=*your_firebase_auth_domain*
REACT_APP_FIREBASE_PROJECT_ID=*your_firebase_project_id*
REACT_APP_FIREBASE_STORAGE_BUCKET=*your_firebase_storage_bucket*
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=*your_firebase_messaging_sender_id*
REACT_APP_FIREBASE_APP_ID=*your_firebase_app_id*

#6. Install dependencies

In command line, head to your project's root folder and execute *yarn* command.