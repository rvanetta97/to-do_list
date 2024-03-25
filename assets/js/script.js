
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

function generateTaskId() {
    return 'id_' + Math.random().toString(36).substring(2, 8);
}

function createTaskCard(task) {
    var newTaskCard = $("<div></div>");
    newTaskCard.append("<p>" + task.taskinput + "</p>", "<p>" + task.duedate + "</p>");
    $("#to-do").append(newTaskCard);
}

function renderTaskList(taskList) {
    taskList.forEach(task => {
        createTaskCard(task);
    });
}
function handleAddTask() {
    $('#task-form').submit(function (e) {
        e.preventDefault();
        var taskinput = $('#taskinput').val();
        var duedate = $('#duedate').val();
        var taskId = generateTaskId();
        var task = {
            taskId: taskId,
            taskinput: taskinput,
            duedate: duedate
        };
        taskList.push(task);
        createTaskCard(task);
        $('#duedate').val('');
        $('#taskinput').val('');
        localStorage.setItem("tasks", JSON.stringify(taskList));
        var newtask = $("<div></div>");
            newtask.append("<p>" + task-input + "</p>", "<p>" + duedate + "</p>",);
            $("#to-do").append(newtask);
    });
}

function handleDeleteTask() {
    $('.delete-btn').click(function () {
        var taskId = $(this).closest('.task').data('task');
        $(this).closest('.task').remove();
        taskList = taskList.filter(task => task.taskId !== taskId);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    });
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    var draggedElement = ui.draggable;
    var newLocationId = $(this).attr('id');
    var taskId = draggedElement.data('task');
    taskList.forEach(task => {
        if (task.taskId === taskId) {
            task.status = newLocationId;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

$(document).ready(function () {
    window.addEventListener('load', () => {
        $('.datepicker').datepicker({
            dateFormat: 'yy-mm-dd'
        });
        $('#button').on('click', handleAddTask);
        handleDeleteTask();
        $('.task').draggable();
        $('.status-lane').droppable({
            drop: handleDrop
        });
    });
});
