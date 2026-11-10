# MonoFlow
This project is a React Native productivity application (MonoFlow) developed for UECS3253 Wireless Application Development (Group 30).
It features task management, resource sharing, and a focus timer, integrated with Firebase for real-time data synchronization and user authentication.

The application uses a web-based API approach through Firebase SDK. Firebase provides a built-in API through its SDK. Instead of manually writing REST APIs, the app directly communicates with Firebase services using functions like addDoc, setDoc, and onSnapshot. All data such as tasks, resources, and user profiles are sent to and retrieved from the cloud using Firebase Firestore. Firebase Authentication is also used to handle user login securely. Also, real-time updates are achieved using Firestore’s onSnapshot listener.
