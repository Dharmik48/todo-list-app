let todoContainer = document.querySelector('.tasks-wrapper');

let newBtn = document.querySelector('.new-task');
let addBtn = document.querySelector('.add-task-btn');
let cancelBtn = document.querySelector('.cancel');
let completeAllBtn = document.querySelector('.complete-all');

newBtn.addEventListener('click', () => {
    hidePage();
    document.querySelector('main').setAttribute('class', 'sec blur');
});
setUpPage();

function setUpPage() {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(item => {
        createTodo(item);
    });
}

// Complete all Todo

completeAllBtn.addEventListener('click', () => {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    let taskTitles = document.querySelectorAll('.todo');

    for (let i = 0; i < savedTasks.length; i++) {
        var check = document.getElementsByName('completed')[i];
        check.checked = "checked";
        const taskTitleId = Number(taskTitles[i].id);
        updateTaskInStorage(taskTitleId, true);
    }
});

// Create TODO
addBtn.addEventListener('click', () => {
    const newTodoTitle = sanitiseInput(document.querySelector('textarea').value);

    const newTodoTask = generateTask(newTodoTitle);

    saveTaskToStorage(newTodoTask);
    createTodo(newTodoTask);
    hidePage();
});

document.querySelector('textarea').addEventListener('keypress', (key) => {
    const newTodoTitle = sanitiseInput(document.querySelector('textarea').value);
    const newTodoTask = generateTask(newTodoTitle);
    if (key.which === 13) {
        saveTaskToStorage(newTodoTask);
        createTodo(newTodoTask);
        hidePage();
    }
});

// Delete Todo
todoContainer.addEventListener('click', (e) => {
    const item = e.target;

    if (item.classList[2] == 'delete') {
        item.parentElement.remove();
        const taskId = Number(item.parentElement.children[1].id);
        deleteTaskFromStorage(taskId);
    }
});

cancelBtn.addEventListener('click', hidePage);

function hidePage() {
    document.querySelector('.add-task').classList.toggle('hidden');

    if (document.querySelector('.add-task').classList[0] != 'hidden') {
        document.querySelector('textarea').focus();
    }

    document.querySelector('textarea').value = '';
    document.querySelector('main').setAttribute('class', 'sec unblur');
};

function createTodo(newTodo) {
    const isChecked = newTodo.isChecked ? 'checked' : '';

    const demoTodo = document.createElement('LI');
    const createdElement = `<input type='checkbox' ${isChecked} name='completed' onchange="updateTaskInStorage(${newTodo.id})"> <p class='todo' id=${newTodo.id}>${newTodo.title}</p><i class='far fa-trash-alt delete'></i>`;

    demoTodo.innerHTML = createdElement;
    todoContainer.appendChild(demoTodo);
};

function saveTaskToStorage(addedTask) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.push(addedTask);

    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function deleteTaskFromStorage(removedTaskId) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));

    const newTaskList = savedTasks.filter(taskItem => {
        return taskItem.id !== removedTaskId;
    });

    localStorage.setItem('tasks', JSON.stringify(newTaskList));
}

function updateTaskInStorage(completedTaskId, isCompleted) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));

    const taskIndex = savedTasks.findIndex(taskItem => {
        return taskItem.id === completedTaskId;
    });

    if (savedTasks[taskIndex]) {
        savedTasks[taskIndex].isChecked = isCompleted || !savedTasks[taskIndex]?.isChecked;
    }
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function sanitiseInput(htmlString) {
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    const string = String(htmlString).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });

    return string.trim();
}

function generateTask(taskTitle) {
    return {
        id: Date.now(),
        title: taskTitle,
        isChecked: false
    };
}
