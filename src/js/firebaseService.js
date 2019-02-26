import { config } from '../js/firebase.config';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';


firebase.initializeApp(config);

export class Firestore {

    constructor() {
        this.firestore = firebase.firestore();
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

    updateItem(itemId, is_checkedStatus, is_editableStatus) {
        return this.firestore.collection('todos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if (doc.data().id == itemId) {
                    this.firestore.collection('todos').doc(doc.id).update({
                        is_checked: is_checkedStatus,
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
                if (doc.data().is_checked == true) {
                    this.firestore.collection('todos').doc(doc.id).delete();
                }
            });
        });
    }

}