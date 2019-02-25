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

    getItems() {
        return this.firestore.collection('todos').get().then((snapshot) => {
            let output = [];
            snapshot.docs.forEach(doc => {
                output.push(doc.data());
            });
            return output;
        });
    }

    deleteItem(event) {
        return this.firestore.collection('todos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if (doc.data().id == event.target.parentElement.id) {
                    this.firestore.collection('todos').doc(doc.id).delete();
                }
            });
        });
    }

    toggleItem(itemId, is_checkedStatus) {
        return this.firestore.collection('todos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if (doc.data().id == itemId) {
                    this.firestore.collection('todos').doc(doc.id).update({
                        is_checked: is_checkedStatus
                    });
                }
            });
        });
    }

    editListItem(itemId, is_editableStatus) {
        return this.firestore.collection('todos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if (doc.data().id == itemId) {
                    this.firestore.collection('todos').doc(doc.id).update({
                        is_editable: is_editableStatus
                    });
                }
            });
        });
    }

    editedListItem(itemId, updatedText) {
        return this.firestore.collection('todos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if (doc.data().id == itemId) {
                    this.firestore.collection('todos').doc(doc.id).update({
                        text: updatedText,
                        is_editable: false
                    });
                }
            });
        });
    }

    checkAllItems(is_checkedStatus) {
        return this.firestore.collection('todos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                this.firestore.collection('todos').doc(doc.id).update({
                    is_checked: is_checkedStatus
                });
            });
        });
    }

    uncheckAllItems(is_checkedStatus) {
        return this.firestore.collection('todos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                this.firestore.collection('todos').doc(doc.id).update({
                    is_checked: is_checkedStatus
                });
            });
        });
    }

    clearCompletedItems(event, completedItems) {
        return this.firestore.collection('todos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log('here', doc.data().is_checked);
                if (doc.data().is_checked == true) {
                    this.firestore.collection('todos').doc(doc.id).delete();
                }
            });
        });
    }

}