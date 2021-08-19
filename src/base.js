import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8TBvBEXHuKjOQjZqlbbL9otua3aDUWHA",
  authDomain: "very-hot-burgers-aba46.firebaseapp.com",
  databaseURL: "https://very-hot-burgers-aba46-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base