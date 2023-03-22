import { activateCheckButton, activateDeleteButton } from "./controlTask.js";
const todoList = document.querySelector('.todo-container .content .task-list ul');
const appearButton = document.querySelector(".todo-container .content .header .fa-plus");
const addContainer = document.querySelector(".add-container");
const addTaskButton = document.querySelector(".add-task");
// Show add form
if (appearButton && addContainer) {
    appearButton.addEventListener('click', (e) => {
        addContainer.classList.remove('hidden');
    });
    // Hide add form
    addContainer.childNodes[1].childNodes[1].childNodes[3].addEventListener('click', (e) => {
        addContainer.classList.add('hidden');
    });
}
if (addTaskButton) {
    addTaskButton.addEventListener('click', (e) => {
        let titleParent = e.currentTarget.parentNode.childNodes[3].childNodes[1];
        let infoParent = e.currentTarget.parentNode.childNodes[3].childNodes[3];
        let title = titleParent.value;
        let info = infoParent.value;
        if (title !== '') {
            let newTask = document.createElement('li');
            // New Task name
            let newTaskName = document.createElement('h4');
            newTaskName.textContent = title;
            newTask.appendChild(newTaskName);
            // New Task Info
            let newTaskInfo = document.createElement('div');
            if (info) {
                newTaskInfo.className += 'hidden-info';
                newTaskInfo.textContent = info;
                newTask.appendChild(newTaskInfo);
            }
            // New Task Button
            let newTaskButton = document.createElement('div');
            let newCheckButton = document.createElement('i');
            let newDelButton = document.createElement('i');
            // AddingButtons
            newCheckButton.classList.add('fa-solid', 'fa-check', 'check-btn');
            newDelButton.classList.add('fa-solid', 'fa-xmark', 'del-btn');
            newTaskButton.appendChild(newCheckButton);
            newTaskButton.appendChild(newDelButton);
            // Adding Button to Task
            newTaskButton.className += 'buttons';
            newTask.appendChild(newTaskButton);
            if (newTask.childNodes.length == 2) {
                activateCheckButton(newTask.childNodes[1].childNodes[0]);
                activateDeleteButton(newTask.childNodes[1].childNodes[1]);
            }
            else if (newTask.childNodes.length == 3) {
                activateCheckButton(newTask.childNodes[2].childNodes[0]);
                activateDeleteButton(newTask.childNodes[2].childNodes[1]);
            }
            // Appending new Task to the To Do list
            if (todoList) {
                todoList.appendChild(newTask);
                titleParent.value = '';
                infoParent.value = '';
            }
        }
        else {
            alert('Cannot create task with an empty Title');
        }
    });
}
