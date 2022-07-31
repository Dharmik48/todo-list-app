let todoContainer = document.querySelector('.tasks-wrapper');

let newBtn = document.querySelector('.new-task');
let addBtn = document.querySelector('.add-task-btn');
let cancelBtn = document.querySelector('.cancel');

newBtn.addEventListener('click', hidePage);
setUpPage();

function setUpPage() {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(item => {
        createTodo(item);
    });
}

// Create TODO
addBtn.addEventListener('click', () => {
    newTodo = document.querySelector('textarea').value;
    saveTaskToStorage(newTodo);
    createTodo(newTodo);
    hidePage();
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

cancelBtn.addEventListener('click', hidePage);

function hidePage() {
    document.querySelector('.add-task').classList.toggle('hidden');
    if (document.querySelector('.add-task').classList[0] != 'hidden') {
        document.querySelector('textarea').focus();
    }
    document.querySelector('textarea').value = '';
};

function createTodo(newTodo) {
    const demoTodo = document.createElement('LI');
    demoTodo.innerHTML = "<input type='checkbox'> <p class='todo'>" + newTodo + "</p><i class='far fa-trash-alt delete'></i>";
    todoContainer.appendChild(demoTodo);
};

function saveTaskToStorage(addedTask) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(addedTask);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function deleteTaskFromStorage(removedTask) {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const newTaskList = savedTasks.filter(taskItem => {
        return taskItem !== removedTask;
    });
    localStorage.setItem('tasks', JSON.stringify(newTaskList));
}
