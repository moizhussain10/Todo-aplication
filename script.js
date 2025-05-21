var input = document.getElementById('task-input')
var input_list = document.getElementById('tasklist')

function addTask() {
    var taskText = input.value
    var lasttask = input_list.lastElementChild?.querySelector('span')?.textContent

    if (taskText === '') {
        return;

    } 
    else if(lasttask === taskText){
        alert("The task has already written")
        input.value = ""
    }
    else {
        var newitem = `
            <li>
                <input type="checkbox">
                <span style="margin-left: 10px;">${taskText}</span>
                <i class="fa-solid fa-trash" onclick="del(this)" style="margin-left: 10px; cursor: pointer;"></i>

            </li>
        `;
        input_list.innerHTML += newitem
        input.value = ''
    }
}

function del(buttonElement) {
    var li = buttonElement.parentElement
    var checkbox = li.querySelector('input[type="checkbox"]')
    
    if(checkbox.checked){
        li.remove()
    }else{
        alert("The task is not complete")
    }
}