// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    FacebookAuthProvider, 
    deleteUser
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiOM20kTzZb1ja3DCgRB4giAoyivK9csw",
    authDomain: "idream-320719.firebaseapp.com",
    databaseURL: "https://idream-320719-default-rtdb.firebaseio.com",
    projectId: "idream-320719",
    storageBucket: "idream-320719.appspot.com",
    messagingSenderId: "258900551085",
    appId: "1:258900551085:web:11cc339b964233d95f6d24",
    measurementId: "G-LHEX3X3SHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

const createUser = async (email, password) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return { error: false, data: user }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });

    return response;
}

const logIn = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            return { error: false, data: user }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });
    return result;
}

const logInGoogle = async () => {
    
   const result = await signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return {error:false,data:user};
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return {error:true,data:error};
  });

  return result;
}

const logInFacebook = async () => {
    
    const result = await signInWithPopup(auth, providerFacebook)
     .then((result) => {
     // This gives you a Google Access Token. You can use it to access the Google API.
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     // The signed-in user info.
     const user = result.user;
     return {error:false,data:user};
     // ...
   }).catch((error) => {
    console.log(error)
     // Handle Errors here.
     const errorCode = error.code;
     const errorMessage = error.message;
     // The email of the user's account used.
     const email = error.email;
     // The AuthCredential type that was used.
     const credential = GoogleAuthProvider.credentialFromError(error);
     return {error:true,data:error};
   });
 
   return result;
 }

 const currentUser = ()  => {
    const user = auth.currentUser;
    return user;
 }

 const deleteCurrentUser = async () => {
    const user = auth.currentUser;
    const result = await deleteUser(user)
        .then((userCredential) => {
            // Signed in
            //const user = userCredential.user;
            return { error: false, data: userCredential }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });
    return result;
 }

export { createUser, logIn, logInGoogle,logInFacebook,currentUser, deleteCurrentUser}