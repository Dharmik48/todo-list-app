let todoContainer = document.querySelector('.tasks-wrapper');

let newBtn = document.querySelector('.new-task');
let addBtn = document.querySelector('.add-task-btn');
let cancelBtn = document.querySelector('.cancel');
let completeAllBtn = document.querySelector('.complete-all');
let section = document.querySelector('.add-task');

section.addEventListener('click',event => event.stopPropagation())

function mainOnclickHandler(){
    if (!document.querySelector('.add-task').getAttribute('class').includes('hidden')) {
        hidePage()
    }
}

newBtn.addEventListener('click', (event) => {
    event.stopPropagation();
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

completeAllBtn.addEventListener('click', (event) => {
    event.stopPropagation();
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
addBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    let input = document.querySelector('textarea').value;
    const newTodoTitle = sanitiseInput(input);
    const newTodoTask = generateTask(newTodoTitle);
       
    if (input == '') {
        setTimeout(function() {document.querySelector('.no-text-warning').setAttribute('style', null);}, 100);
    } else {
        saveTaskToStorage(newTodoTask);
        createTodo(newTodoTask);
        hidePage();
    }
});

document.querySelector('textarea').addEventListener('keypress', (key) => {
    const newTodoTitle = sanitiseInput(document.querySelector('textarea').value);
    const newTodoTask = generateTask(newTodoTitle);
    if (key.which === 13) {
        if (document.querySelector('textarea').value == '') {
            document.querySelector('.no-text-warning').setAttribute('style', null);
            setTimeout(function() {clearTextarea();}, 1);
        } else {
            saveTaskToStorage(newTodoTask);
            createTodo(newTodoTask);
            hidePage();
        }
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
    document.querySelector('.no-text-warning').setAttribute('style', 'display: none;');
    if (document.querySelector('.add-task').classList[0] != 'hidden') {
        document.querySelector('textarea').focus();
    }

    document.querySelector('textarea').value = '';
    document.querySelector('main').setAttribute('class', 'sec unblur');
};

function createTodo(newTodo)  {
    const isChecked = newTodo.isChecked ? 'checked' : '';

    const demoTodo = document.createElement('LI');
    const createdElement = `<input type='checkbox' ${isChecked} name='completed' onchange="updateTaskInStorage(${newTodo.id})"> <p class='todo' id=${newTodo.id}>${newTodo.title}</p><i class='far fa-trash-alt delete'></i>`;

    demoTodo.innerHTML = createdElement;
    todoContainer.appendChild(demoTodo);
};

 function saveTaskToStorage(addedTask)  {
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

function clearTextarea() {
    document.querySelector('textarea').value = '';
}
