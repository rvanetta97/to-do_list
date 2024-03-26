let taskList = JSON.parse(localStorage.getItem("taskList"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const buttonEl = document.querySelector('#taskbutton');

function generateTaskId() {
    return 'id_' + nextId++;
    localStorage.setItem("nextId", nextId);
}
submit.addEventListener('click', handleAddTask);
function handleAddTask() {
    var taskinput = $('#taskinput').val();
    var duedate = $('#duedate').val();
    var taskId = generateTaskId();

    var task = {
        taskId: taskId,
        taskinput: taskinput,
        duedate: duedate
    };
    taskList.push(task);
    renderTaskList(taskList);
    createTaskCard(task);

    const taskListJSON = JSON.stringify(taskList);
    localStorage.setItem("taskList", taskListJSON);

    $('#duedate').val('');
    $('#taskinput').val('');
}

function createTaskCard(task) {
    var newTaskCard = $("<div class='task-card'></div>");

    const taskinput = document.createElement('span');
    taskinput.textContent = task.taskinput;
    newTaskCard.append(taskinput);

    const duedate = document.createElement('span');
    duedate.textContent = task.duedate;
    newTaskCard.append(duedate);

    const deletebtn = document.createElement('button');
    deletebtn.textContent = "Delete";
    deletebtn.className = "delete-btn";
    newTaskCard.append(deletebtn);

    $("#todo-cards").append(newTaskCard);

    newTaskCard.draggable({
        revert: "invalid", 
        helper: "clone", 
        opacity: 0.7 
    });
                
}

function renderTaskList(taskList) {
    taskList.forEach(task => {
        createTaskCard(task);
    });
    function handleDeleteTask() {
        $(document).on('click', '.delete-btn', function () {
            var taskId = task.taskId;
            $(this).closest('.task').remove();
            taskList = taskList.filter(task => task.taskId !== taskId);
            localStorage.setItem('taskList', JSON.stringify(taskList));
        });
    }
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    var draggedElement = ui.draggable;
    var newLocationId = $(this).attr('id');
    var taskId = draggedElement.data('task');
    taskList.forEach(task => {
        if (task.taskId == taskId) {
            task.status = newLocationId;
        }
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

$(document).ready(function () {
    window.addEventListener('load', () => {
        $('.datepicker').datepicker({
            dateFormat: 'yy-mm-dd'
        });

        //$('#button').on('click', handleAddTask);
        //handleDeleteTask();

        $('.task-card').draggable({
            revert: "invalid", 
            helper: "clone", 
            opacity: 0.7 
        });

        $('.status-lane').droppable({
            drop: handleDrop
        });
    });
});
