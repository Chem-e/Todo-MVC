module.exports = TodoMVCPageObjects = {

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

    getElementById: function(id) {
        return element(by.id(id));
    },

    sendKey: function(element, value) {
        return element.sendKeys(value, protractor.Key.ENTER)
    },

    getAllElements: function(selector) {
        return element.all(by.css(selector));
    },

    lastTodoItem: function(list) {
        return list.last();
    },

    checkIfPresent: function(item) {
        return item.isPresent();
    },

    getTextOfItem: function(item) {
        return item.getText();
    },

    doubleClickAction: function(listItem) {
        return browser.actions().mouseMove(listItem).mouseMove({ x: 50, y: 0 }).doubleClick().perform();
    },

    erase: function() {
        let list = element.all(by.id('close'));
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

    count: function(elements) {
        return elements.count();
    },

    tag: function() {
        return element(by.id('tag'));
    },

    tagInput: function() {
        return element(by.id('tagInput'));
    },

    tagInputSendKeys: function() {
        return element(by.id('tagInput')).sendKeys('shopping', protractor.Key.ENTER);
    },

    editTag: function() {
        // return element(by.id('editableInput'));
    },

    editTagSendKeys: function() {
        return this.editTag().sendKeys('cleaning', protractor.Key.ENTER);
    },

    tags: function() {
        return element.all(by.css('.li'));
    },
    lastTodoTag: function() {
        return this.tags().last();
    },

    lastTodoTagIsPresent: function() {
        return this.lastTodoTag().isPresent();
    }

};