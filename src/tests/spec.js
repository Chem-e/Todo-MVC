var todoMVCTests = require('./page_objects');

describe('Todo App', function() {
    it('should have a title', function() {
        todoMVCTests.get();

        expect(TodoMVCTests.getAppTitle()).toEqual('Todo MVC');
    });
});

describe('Todo App', function() {
    it('should add a list element', function() {
        todoMVCTests.get();
        todoMVCTests.inputSendKeys();
        todoMVCTests.sleep();
        expect(TodoMVCTests.getTextOfLastTodoItem()).toContain('value');
    });
});

describe('Todo App', function() {
    it('should edit li', function() {
        todoMVCTests.get();
        todoMVCTests.inputSendKeys();
        expect(TodoMVCTests.getTextOfLastTodoItem()).toContain('value');
        TodoMVCTests.doubleclick();
        todoMVCTests.sleep();
        expect(todoMVCTests.editLi().isPresent()).toBe(true);
        todoMVCTests.editLiSendKeys();
        todoMVCTests.sleep();
        expect(todoMVCTests.lastTodoItemIsPresent()).toBe(true);
    });
});

describe('Todo App', function() {
    it('should remove li', function() {
        todoMVCTests.get();
        todoMVCTests.inputSendKeys();
        expect(TodoMVCTests.getTextOfLastTodoItem()).toContain('value');
        todoMVCTests.sleep();
        todoMVCTests.crossIcon().click();
        todoMVCTests.sleep();
        expect(todoMVCTests.lastTodoItemIsPresent()).toBe(false);
    });
});

describe('Todo App', function() {
    it('should filter list items', function() {
        todoMVCTests.get();
        todoMVCTests.inputSendKeys();
        todoMVCTests.inputSendKeys();
        todoMVCTests.inputSendKeys();
        expect(TodoMVCTests.getTextOfLastTodoItem()).toContain('value');

        todoMVCTests.filter();
        todoMVCTests.listItems();

        todoMVCTests.sleep();
        todoMVCTests.all().click();
        expect(todoMVCTests.count()).toBe(3);

        todoMVCTests.sleep();
        todoMVCTests.active().click();
        expect(todoMVCTests.count()).toBe(2);

        todoMVCTests.sleep();
        todoMVCTests.completed().click();
        expect(todoMVCTests.count()).toBe(1);

        todoMVCTests.sleep();
    });
});