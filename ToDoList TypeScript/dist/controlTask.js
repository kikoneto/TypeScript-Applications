const checkBtn = document.querySelectorAll(".check-btn");
const deleteBtn = document.querySelectorAll(".del-btn");
const completedTasks = document.querySelector(".completed-container .content .task-list ul");
// Adding Function to check button
checkBtn.forEach(element => activateCheckButton(element));
// Adding function to the delete button
deleteBtn.forEach(element => activateDeleteButton(element));
export function activateCheckButton(element) {
    element.addEventListener('click', (e) => {
        if (e.currentTarget) {
            let currentNode = e.currentTarget;
            for (let i = 0; i < 2; i++) {
                currentNode = currentNode.parentNode;
            }
            let taskName;
            let taskInfo;
            if (currentNode.childNodes[1].tagName === 'H4') {
                taskName = currentNode.childNodes[1].textContent;
                if (currentNode.childNodes[3].tagName === 'DIV') {
                    taskInfo = currentNode.childNodes[3].textContent;
                }
            }
            else if (currentNode.childNodes[0].tagName === 'H4') {
                taskName = currentNode.childNodes[0].textContent;
                if (currentNode.childNodes[1].tagName === 'DIV') {
                    taskInfo = currentNode.childNodes[1].textContent;
                }
            }
            let newTask = document.createElement('li');
            // New Task name
            let newTaskName = document.createElement('h4');
            newTaskName.textContent = taskName;
            newTask.appendChild(newTaskName);
            // New Task Info
            let newTaskInfo = document.createElement('div');
            if (taskInfo) {
                newTaskInfo.className += 'hidden-info';
                newTaskInfo.textContent = taskInfo;
                newTask.appendChild(newTaskInfo);
            }
            // New Task Button
            let newTaskButton = document.createElement('div');
            let newButton = document.createElement('i');
            // Adding Delete Button
            newButton.classList.add('fa-solid', 'fa-xmark', 'del-btn');
            newButton.addEventListener('click', (e) => {
                let currentNode = e.currentTarget;
                for (let i = 0; i < 2; i++) {
                    currentNode = currentNode.parentNode;
                }
                currentNode.remove();
            });
            newTaskButton.appendChild(newButton);
            // Adding Button to Task
            newTaskButton.className += 'buttons';
            newTask.appendChild(newTaskButton);
            // Adding Task to Completed List
            if (completedTasks) {
                completedTasks.appendChild(newTask);
                currentNode.remove();
            }
        }
    });
}
export function activateDeleteButton(element) {
    element.addEventListener('click', (e) => {
        if (e.currentTarget) {
            let currentNode = e.currentTarget;
            if (currentNode) {
                for (let i = 0; i < 2; i++) {
                    currentNode = currentNode.parentNode;
                }
                currentNode.remove();
            }
        }
    });
}
