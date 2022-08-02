let todoContainer = document.querySelector('.tasks-wrapper');

let newBtn = document.querySelector('.new-task');
let addBtn = document.querySelector('.add-task-btn');
let cancelBtn = document.querySelector('.cancel');
let completeAllBtn = document.querySelector('.complete-all');

newBtn.addEventListener('click', () => {
    hidePage();
    document.querySelector('.background').setAttribute('class', 'background blur');
    newBtn.setAttribute('class', 'new-task btn blur');
    completeAllBtn.setAttribute('class', 'complete-all btn blur');
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

    for (let i = 0, len = savedTasks.length; i < len; i++) {
        var check = document.getElementsByName("completed")[i];
        check.checked = "checked";
        updateTaskInStorage(taskTitles[i].innerHTML, true);
    }
});

// Create TODO
addBtn.addEventListener('click', () => {
    newTodo = document.querySelector('textarea').value;
    saveTaskToStorage(newTodo);
    createTodo(newTodo);
    hidePage();
    document.querySelector('.background').setAttribute('class', 'background unblur');
    newBtn.setAttribute('class', 'new-task btn unblur');
    completeAllBtn.setAttribute('class', 'complete-all btn unblur');
});

document.querySelector('textarea').addEventListener('keypress', (key) => {
    newTodo = document.querySelector('textarea').value;
    if (key.which === 13) {
        saveTaskToStorage(newTodo);
        createTodo(newTodo);
        hidePage();
    }
});

// Delete Todo
todoContainer.addEventListener('click', (e) => {
    const item = e.target;

    if (item.classList[2] == 'delete') {
        item.parentElement.remove();
        const taskTitle = item.parentElement.children[1].innerHTML;
        deleteTaskFromStorage(taskTitle);
    }
});

cancelBtn.addEventListener('click', () => {
    document.querySelector('.background').setAttribute('class', 'background unblur');
    newBtn.setAttribute('class', 'new-task btn unblur');
    completeAllBtn.setAttribute('class', 'complete-all btn unblur');
    hidePage();
});

function hidePage() {
    document.querySelector('.add-task').classList.toggle('hidden');
    if (document.querySelector('.add-task').classList[0] != 'hidden') {
        document.querySelector('textarea').focus();
    }
    document.querySelector('textarea').value = '';
};

function createTodo(newTodo) {
    const isChecked = newTodo.isChecked ? 'checked' : '';
    const taskTitle = newTodo.title || newTodo;
    const demoTodo = document.createElement('LI');
    const createdElement = `<input type='checkbox' ${isChecked} name='completed' onchange='updateTaskInStorage("${taskTitle}")'> <p class='todo'>${taskTitle}</p><i class='far fa-trash-alt delete'></i>`;
    demoTodo.innerHTML = createdElement;
    todoContainer.appendChild(demoTodo);
};

function saveTaskToStorage(addedTask) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTask = {
        id: Date.now(),
        title: addedTask,
        isChecked: false
    };
    savedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function deleteTaskFromStorage(removedTask) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const newTaskList = savedTasks.filter(taskItem => {
        return taskItem.title !== removedTask;
    });
    localStorage.setItem('tasks', JSON.stringify(newTaskList));
}

function updateTaskInStorage(completedTask, isCompleted) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const taskIndex = savedTasks.findIndex(taskItem => {
        return taskItem.title === completedTask;
    });
    savedTasks[taskIndex].isChecked = isCompleted || !savedTasks[taskIndex].isChecked;
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}
