let firebase = require('firebase/app');
// all 3 are optional and you only need to require them at the start
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');
require('firebase/storage');

let config = {
    apiKey: "AIzaSyAkK601cYbrn0ydUmSVGNmnnBbY39s7sz0",
    authDomain: "todo-mvc-fa23e.firebaseapp.com",
    databaseURL: "https://todo-mvc-fa23e.firebaseio.com",
    projectId: "todo-mvc-fa23e",
    storageBucket: "todo-mvc-fa23e.appspot.com",
    messagingSenderId: "360772376337"
};
firebase.initializeApp(config);

export class Db {

    constructor() {
        this.firestore = firebase.firestore();
        this.firestore.settings({ timestampsInSnapshots: true });
    }

    addItems(item) {
            return this.firestore.collection('todos').add(item);
        }
        // setItems(item) {
        //     var alfa = this.firestore.collection('todos').this.getItems().then().set(item);
        //     console.log('alfa: ', alfa);
        // }
    getItems() {
        return this.firestore.collection('todos').get().then((snapshot) => {
            let output = [];
            snapshot.docs.forEach(doc => {
                // console.log(doc.data());
                // console.log(doc.id);
                output.push(doc.data());
                // console.log('output: ', output);
            });
            return output;
        });
    }

}