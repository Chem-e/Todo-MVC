describe('Todo App', function() {
    it('should have a title', function() {
        browser.ignoreSynchronization = true; //disable angular
        browser.get('http://localhost:8080/');

        expect(browser.getTitle()).toEqual('Basic application with Webpack');
    });
});

describe('Todo App', function() {
    it('should add a list element', function() {
        browser.ignoreSynchronization = true; //disable angular
        browser.get('http://localhost:8080/');

        element(by.id('myInput')).sendKeys('value', protractor.Key.ENTER);
        browser.sleep(2000);
        let todos = element.all(by.css('.li'));
        expect(todos.last().getText()).toContain('value');
    });
});

describe('Todo App', function() {
    it('should edit li', function() {
        browser.ignoreSynchronization = true; //disable angular
        browser.get('http://localhost:8080/');

        element(by.id('myInput')).sendKeys('value', protractor.Key.ENTER);
        let todo = element.all(by.css('.li'));
        let lastTodo = todo.last();
        expect(lastTodo.getText()).toContain('value');
        browser.actions().doubleClick(lastTodo).perform();
        browser.sleep(2000);
        expect(element(by.css('.editableInput')).isPresent()).toBe(true);
        element(by.css('.editableInput')).sendKeys('value', protractor.Key.ENTER);
        browser.sleep(2000);
        expect(lastTodo.isPresent()).toBe(true);
    });
});

describe('Todo App', function() {
    it('should remove li', function() {
        browser.ignoreSynchronization = true; //disable angular
        browser.get('http://localhost:8080/');

        element(by.id('myInput')).sendKeys('value', protractor.Key.ENTER);
        let todo = element.all(by.css('.li'));
        let lastTodo = todo.last();
        expect(lastTodo.getText()).toContain('value');
        let crossIcon = element(by.id('close'));
        browser.sleep(2000);
        crossIcon.click();
        browser.sleep(2000);
        expect(lastTodo.isPresent()).toBe(false);
    });
});

describe('Todo App', function() {
    it('should filter list items', function() {
        browser.ignoreSynchronization = true; //disable angular
        browser.get('http://localhost:8080/');

        element(by.id('myInput')).sendKeys('value', protractor.Key.ENTER);
        element(by.id('myInput')).sendKeys('value2', protractor.Key.ENTER);
        element(by.id('myInput')).sendKeys('value3', protractor.Key.ENTER);
        let todo = element.all(by.css('.li'));
        expect(todo.getText()).toContain('value');

        let checked = element.all(by.css('.li div')).filter(function(elem, index) {
            return element(by.id('icon'));
        }).first().click();
        let list = element.all(by.css('.ul li'));

        browser.sleep(2000);
        element(by.id('all')).click();
        expect(list.count()).toBe(3);

        browser.sleep(2000);
        element(by.id('active')).click();
        expect(list.count()).toBe(2);

        browser.sleep(2000);
        element(by.id('completed')).click();
        expect(list.count()).toBe(1);

        browser.sleep(2000);
    });
});