let newTodo, demoTodo;

let todoContainer = document.querySelector('.tasks-wrapper');

let newBtn = document.querySelector('.new-task');
let addBtn = document.querySelector('.add-task-btn');
let cancelBtn = document.querySelector('.cancel');

newBtn.addEventListener('click', hidePage);

// Create TODO
addBtn.addEventListener('click', () => {
    newTodo = document.querySelector('textarea').value;
    createTodo();
});

document.querySelector('textarea').addEventListener('keypress', (key) => {
    newTodo = document.querySelector('textarea').value;
    if(key.which === 13) {
        createTodo();
    }
});

// Delete Todo
todoContainer.addEventListener('click', (e) => {
    const item = e.target;

    if(item.classList[2] == 'delete') {
        item.parentElement.remove();
    }
})

cancelBtn.addEventListener('click', hidePage);

function hidePage() {
    document.querySelector('.add-task').classList.toggle('hidden');
    if (document.querySelector('.add-task').classList[0] != 'hidden') {
        document.querySelector('textarea').focus();
    }
    document.querySelector('textarea').value = '';
};

function createTodo() {
    demoTodo = document.createElement('LI');
    demoTodo.innerHTML = "<input type='checkbox'> <p class='todo'>" + newTodo + "</p><i class='far fa-trash-alt delete'></i>"
    todoContainer.appendChild(demoTodo);
    hidePage();
};