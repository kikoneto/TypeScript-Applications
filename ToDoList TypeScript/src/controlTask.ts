
const checkBtn = document.querySelectorAll(".check-btn");
const deleteBtn = document.querySelectorAll(".del-btn");
const completedTasks = document.querySelector<HTMLElement>(".completed-container .content .task-list ul");

// Adding Function to check button
checkBtn.forEach(element => activateCheckButton(element as HTMLElement));


// Adding function to the delete button
deleteBtn.forEach(element => activateDeleteButton(element as HTMLElement));

export function activateCheckButton(element: HTMLElement) {
    element.addEventListener('click', (e) => {
        if (e.currentTarget) {
            let currentNode = e.currentTarget as HTMLElement;
            for (let i = 0; i < 2; i++) {
                currentNode = currentNode.parentNode as HTMLElement;
            }

            let taskName;
            let taskInfo;

            if ((<HTMLElement>currentNode.childNodes[1]).tagName === 'H4') {
                taskName = currentNode.childNodes[1].textContent;

                if ((<HTMLElement>currentNode.childNodes[3]).tagName === 'DIV') {
                    taskInfo = currentNode.childNodes[3].textContent;
                }

            } else if ((<HTMLElement>currentNode.childNodes[0]).tagName === 'H4') {
                taskName = currentNode.childNodes[0].textContent;

                if ((<HTMLElement>currentNode.childNodes[1]).tagName === 'DIV') {
                    taskInfo = currentNode.childNodes[1].textContent;
                }
            }

            let newTask: HTMLElement = document.createElement('li');
            // New Task name

            let newTaskName: HTMLElement = document.createElement('h4');
            newTaskName.textContent = taskName as string | '';
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
            newButton.classList.add('fa-solid', 'fa-xmark', 'del-btn',);

            newButton.addEventListener('click', (e) => {
                let currentNode = e.currentTarget as HTMLElement;
                for (let i = 0; i < 2; i++) {
                    currentNode = currentNode.parentNode as HTMLElement;
                }
                currentNode.remove();
            })

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
    })
}

export function activateDeleteButton(element: HTMLElement) {
    element.addEventListener('click', (e) => {
        if (e.currentTarget) {
            let currentNode = e.currentTarget as HTMLElement;

            if (currentNode) {
                for (let i = 0; i < 2; i++) {
                    currentNode = currentNode.parentNode as HTMLElement;
                }
                currentNode.remove();
            }
        }
    })
}


