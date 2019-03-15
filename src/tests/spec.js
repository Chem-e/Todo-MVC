var todoMVCPageObjects = require('./page_objects');

describe('Todo App', function() {
    it('should have a title', function() {
        todoMVCPageObjects.get();
        expect(TodoMVCPageObjects.getAppTitle()).toEqual('Todo MVC');
    });
});

describe('Todo App', function() {
    it('should add a list element', function() {
        todoMVCPageObjects.get();
        todoMVCPageObjects.sleep();

        todoMVCPageObjects.erase();
        todoMVCPageObjects.sleep();

        let element = todoMVCPageObjects.getElementById('myInput');
        todoMVCPageObjects.sendKey(element, 'test');

        let listItems = todoMVCPageObjects.getAllElements('li');
        todoMVCPageObjects.sleep();
        let lastListItem = todoMVCPageObjects.lastTodoItem(listItems);

        todoMVCPageObjects.sleep();
        expect(TodoMVCPageObjects.getTextOfItem(lastListItem)).toContain('test');
    });
});

describe('Todo App', function() {
    it('should edit li', function() {
        todoMVCPageObjects.get();
        todoMVCPageObjects.sleep();
        todoMVCPageObjects.erase();
        todoMVCPageObjects.sleep();

        let element = todoMVCPageObjects.getElementById('myInput');
        todoMVCPageObjects.sendKey(element, 'test');
        todoMVCPageObjects.sleep();

        let listItems = todoMVCPageObjects.getAllElements('li');
        let lastListItem = todoMVCPageObjects.lastTodoItem(listItems);
        expect(TodoMVCPageObjects.getTextOfItem(lastListItem)).toContain('test');

        TodoMVCPageObjects.doubleClickAction(lastListItem);
        todoMVCPageObjects.sleep();

        let editListItem = todoMVCPageObjects.getElementById('listEditableInput');

        expect(editListItem.isPresent()).toBe(true);

        todoMVCPageObjects.sendKey(editListItem, 'edited');

        expect(TodoMVCPageObjects.getTextOfItem(lastListItem)).toContain('edited');
    });
});

describe('Todo App', function() {
    it('should remove li', function() {
        todoMVCPageObjects.get();
        let element = todoMVCPageObjects.getElementById('myInput');
        todoMVCPageObjects.sendKey(element, 'test');
        todoMVCPageObjects.sleep();
        let listItems = todoMVCPageObjects.getAllElements('li');
        let lastListItem = todoMVCPageObjects.lastTodoItem(listItems);
        expect(TodoMVCPageObjects.getTextOfItem(lastListItem)).toContain('test');
        todoMVCPageObjects.sleep();
        todoMVCPageObjects.erase();
        todoMVCPageObjects.sleep();
        expect(todoMVCPageObjects.checkIfPresent(lastListItem)).toBe(false);
    });
});

describe('Todo App', function() {
    it('should filter list items', function() {
        todoMVCPageObjects.get();
        todoMVCPageObjects.sleep();
        todoMVCPageObjects.erase();
        todoMVCPageObjects.sleep();

        let element = todoMVCPageObjects.getElementById('myInput');
        todoMVCPageObjects.sendKey(element, 'test');
        todoMVCPageObjects.sendKey(element, 'test');
        todoMVCPageObjects.sendKey(element, 'test');

        todoMVCPageObjects.filter();
        let elements = todoMVCPageObjects.getAllElements('.ul li');

        todoMVCPageObjects.getElementById('all').click();
        expect(todoMVCPageObjects.count(elements)).toBe(3);

        todoMVCPageObjects.getElementById('active').click();
        expect(todoMVCPageObjects.count(elements)).toBe(2);

        todoMVCPageObjects.getElementById('completed').click();
        expect(todoMVCPageObjects.count(elements)).toBe(1);
    });
});


describe('Todo App', function() {
    it('should add a tag', function() {
        todoMVCPageObjects.get();
        todoMVCPageObjects.sleep();

        todoMVCPageObjects.erase();
        todoMVCPageObjects.sleep();
        let element = todoMVCPageObjects.getElementById('myInput');
        todoMVCPageObjects.sendKey(element, 'test');
        todoMVCPageObjects.getElementById('tag').click();

        let tagAdded = todoMVCPageObjects.getElementById('tagInput');
        expect(TodoMVCPageObjects.checkIfPresent(tagAdded)).toBe(true);
        todoMVCPageObjects.sendKey(tagAdded, 'tag');

        let tagName = todoMVCPageObjects.getElementById('tagName');
        expect(TodoMVCPageObjects.getTextOfItem(tagName)).toContain('tag');
    });
});


describe('Todo App', function() {
    it('should enable due date input', function() {
        todoMVCPageObjects.get();
        todoMVCPageObjects.sleep();

        todoMVCPageObjects.erase();
        let element = todoMVCPageObjects.getElementById('myInput');
        todoMVCPageObjects.sendKey(element, 'test');
        todoMVCPageObjects.getElementById('dueDateIcon').click();
        let dueDateAdded = todoMVCPageObjects.getElementById('dueDateInput');
        todoMVCPageObjects.sleep();
        expect(TodoMVCPageObjects.checkIfPresent(dueDateAdded)).toBe(true);

        todoMVCPageObjects.sendKey(dueDateAdded, '11/22/2019');
        todoMVCPageObjects.sleep();
        let dueDate = todoMVCPageObjects.getElementById('dueDate');
        expect(TodoMVCPageObjects.getTextOfItem(dueDate)).toContain('2019-11-22');

    });
});


describe('Todo App', function() {
    it('should add a due date', function() {
        todoMVCPageObjects.get();
        // todoMVCPageObjects.sleep();
        todoMVCPageObjects.sleep();
        let dueDateAdded = todoMVCPageObjects.getElementById('dueDateInput');
        todoMVCPageObjects.mouseMoveClick(dueDateAdded, 591, 267);
        todoMVCPageObjects.sleep();
        todoMVCPageObjects.mouseMoveClick(dueDateAdded, 376, 267);
        // todoMVCPageObjects.sleep();
        todoMVCPageObjects.mouseMoveClick(dueDateAdded, 591, 267);
        todoMVCPageObjects.sleep();
        todoMVCPageObjects.mouseMoveClick(dueDateAdded, 476, 267);
        // todoMVCPageObjects.sleep();
        todoMVCPageObjects.mouseMoveClick(dueDateAdded, 591, 267);
        todoMVCPageObjects.sleep();
    });
});