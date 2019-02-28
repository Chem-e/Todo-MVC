module.exports = TodoMVCTests = {

    get: function() {
        browser.ignoreSynchronization = true; //disable angular
        browser.get('http://localhost:8080/');
    },

    getAppTitle: function() {
        return browser.getTitle();
    },

    sleep: function() {
        return browser.sleep(5000);
    },

    inputSendKeys: function() {
        return element(by.id('myInput')).sendKeys('value', protractor.Key.ENTER);
    },

    todos: function() {
        return element.all(by.css('.li'));
    },

    lastTodoItem: function() {
        return this.todos().last();
    },

    lastTodoItemIsPresent: function() {
        return this.lastTodoItem().isPresent();
    },

    getTextOfLastTodoItem: function() {
        return this.lastTodoItem().getText();
    },

    doubleclick: function() {
        return browser.actions().doubleClick(this.lastTodoItem()).perform();
    },

    editLi: function() {
        return element(by.id('editableInput'));
    },

    editLiSendKeys: function() {
        return this.editLi().sendKeys('value', protractor.Key.ENTER);;
    },

    crossIcon: function() {
        return element.all(by.id('close'));
    },

    erase: function() {
        let list = this.crossIcon();
        list.then((items) => {
            for (let i = items.length - 1; i >= 0; i--) {
                list.get(i).click();
            };
        });
    },

    filter: function() {
        return element.all(by.css('.li div')).filter(function(elem, index) {
            return element(by.id('icon'));
        }).first().click();
    },

    listItems: function() {
        return element.all(by.css('.ul li'));
    },

    count: function() {
        return this.listItems().count();
    },

    all: function() {
        return element(by.id('all'));
    },

    active: function() {
        return element(by.id('active'));
    },

    completed: function() {
        return element(by.id('completed'));
    }

};