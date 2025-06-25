var input = document.getElementById('task-input');
var input_list = document.getElementById('tasklist');

window.onload = function () {
    loadTasksFromStorage();
};

function addTask() {
    var taskText = input.value.trim();
    var lasttask = input_list.lastElementChild?.querySelector('span')?.textContent;

    if (taskText === '') {
        return;
    } else if (lasttask === taskText) {
        alert("The task has already been written");
        input.value = "";
    } else {
        var newitem = `
            <li>
                <input type="checkbox" onchange="saveTasksToStorage()">
                <span style="margin-left: 10px;">${taskText}</span>
                <i class="fa-solid fa-trash" onclick="del(this)" style="margin-left: 10px; cursor: pointer;"></i>
                <i class="fa-solid fa-pen-to-square" onclick="edit(this)" style="margin-left: 10px; cursor: pointer;"></i>
            </li>
        `;
        input_list.innerHTML += newitem;
        input.value = '';
        saveTasksToStorage(); 
    }
}

function edit(e) {
    var span = e.parentElement.querySelector('span');
    var updatedText = prompt("Enter updated task", span.textContent);
    if (updatedText !== null && updatedText.trim() !== "") {
        span.textContent = updatedText.trim();
        saveTasksToStorage(); 
    }
}

function del(buttonElement) {
    var li = buttonElement.parentElement;
    var checkbox = li.querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
        li.remove();
        saveTasksToStorage(); 
    } else {
        alert("The task is not complete");
    }
}

function delall() {
    input_list.innerHTML = "";
    localStorage.removeItem('tasks'); 
}

function saveTasksToStorage() {
    var tasks = [];
    var allTasks = document.querySelectorAll('#tasklist li');

    allTasks.forEach(function (li) {
        var text = li.querySelector('span').textContent;
        var checked = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: text, done: checked });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromStorage() {
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    storedTasks.forEach(function (task) {
        var newitem = `
            <li>
                <input type="checkbox" ${task.done ? 'checked' : ''} onchange="saveTasksToStorage()">
                <span style="margin-left: 10px;">${task.text}</span>
                <i class="fa-solid fa-trash" onclick="del(this)" style="margin-left: 10px; cursor: pointer;"></i>
                <i class="fa-solid fa-pen-to-square" onclick="edit(this)" style="margin-left: 10px; cursor: pointer;"></i>
            </li>
        `;
        input_list.innerHTML += newitem;
    });
}
