import Rebase from 're-base'
import firebase from 'firebase/app'
import database from 'firebase/database'

const config = {
    apiKey: "AIzaSyCnyXREaNYjJvBKzD25W_7WaFnIe8x131M",
    authDomain: "foam-4a167.firebaseapp.com",
    databaseURL: "https://foam-4a167.firebaseio.com",
    projectId: "foam-4a167",
    storageBucket: "foam-4a167.appspot.com",
    messagingSenderId: "953454949454"
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database());

export default base
