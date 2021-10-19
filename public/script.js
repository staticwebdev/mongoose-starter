// run the code on load
window.onload = pageLoad;

// stores all tasks
const tasks = [];

async function pageLoad() {
    // Get the current user from the server
    const user = await getUser();

    console.log(user);
    // Get the user display on the page
    const userDisplay = document.getElementById('user-display');
    if(user) {
        // User is logged on
        // Display welcome message
        userDisplay.innerText = `Welcome, ${user.userDetails}!`;
        // Show tasks display element
        document.getElementById('tasks-display').classList.remove('hidden');
        // Load tasks from server
        await loadTasks();
    } else {
        // User is not logged in
        // Update user display to allow for login
        userDisplay.innerHTML = '<a href="/.auth/login/github">Please login to see your list of tasks</a>';
    }
}

// Retrieves current user from Azure Static Web Apps
async function getUser() {
    // Retrieve response from /.auth/me
    const response = await fetch('/.auth/me');
    // Convert to JSON
    const payload = await response.json();
    // Retrieve the clientPrincipal (current user)
    const { clientPrincipal } = payload;
    return clientPrincipal;
}

// Calls server to retrieve all tasks
async function loadTasks() {
    try {
        // Uses fetch to call server
        const response = await fetch('/api/tasks');
        // Reads returned JSON, which contains one property called tasks
        const retrievedData = await response.json();
        // Retrieve tasks, which contains an array of all tasks in database
        const retrievedTasks = retrievedData.tasks;
        // Loop through all tasks
        for (let task of retrievedTasks) {
            // Add each task to the array
            tasks.push(task);
        }    
    } catch {
        // If there is an error, display a generic message on the page
        const messageElement = document.createElement('li');
        messageElement.innerHTML = "Could not pull data. Make sure you've <a href='https://docs.microsoft.com/en-us/azure/static-web-apps/add-mongoose?WT.mc_id=academic-45074-chrhar#configure-database-connection-string'>configured the database</a>."
        document.getElementById('task-list').appendChild(messageElement);
    }
    displayTasks();
}

// Displays all tasks on page (called on load)
function displayTasks() {
    // Loop through all tasks in the local array
    for (let task of tasks) {
        // Call helper function to add to UI
        addTaskToDisplay(task);
    }
}

// Helper function to add task to UI
function addTaskToDisplay(task) {
    // Create li element to store task display
    const taskElement = document.createElement('li');

    // create checkbox
    const taskCompleteCheckbox = document.createElement('input');
    taskCompleteCheckbox.type = 'checkbox';
    // Set the ID of the checkbox to the id of the task
    taskCompleteCheckbox.id = task._id;
    // Set the checked property to the completion status of the task
    // (Completed tasks will be checked)
    taskCompleteCheckbox.checked = task.completed;
    // Add event handler to each item for clicking on the checkbox
    // When the checkbox is clicked, we will make a server call to toggle completed
    taskCompleteCheckbox.addEventListener('change', updateTask);
    // Add checkbox to li created earlier
    taskElement.appendChild(taskCompleteCheckbox);
    
    // Create label for the task
    const taskLabel = document.createElement('label');
    // Set the for attribute so the checkbox is toggled when the label is clicked
    taskLabel.setAttribute('for', task._id);
    // Set the text to the title of the task
    taskLabel.innerText = task.title;
    // Set the completed CSS class if the task is completed
    taskLabel.className = task.completed ? 'completed' : '';
    // Add the label to the end of the li element
    taskElement.appendChild(taskLabel);

    // Get the ul element from the page
    const taskListElement = document.getElementById('task-list');
    // Add the new task to the list on the page
    taskListElement.appendChild(taskElement);
}

// Event listener for checkbox change
async function updateTask(e) {
    // Get the ID of the task
    const taskId = e.target.id;

    // Find the task from the array
    const task = tasks.find(t => t._id === taskId);
    // If no task is found (shouldn't happen), just return
    if (!task) return;
    // Toggle completed status
    task.completed = !task.completed;

    // Get the label for the task, which contains the string
    // We find this by using nextSibling
    // It is next to the checkbox, which is in e.target
    const taskLabel = e.target.nextSibling;
    // Set the class for the task based on completed status
    taskLabel.className = task.completed ? 'completed' : '';
    // Call the server to save the changes
    await fetch(
        `/api/tasks/${taskId}`, // URL of the API
        {
            method: 'PUT', // method to modify items
            body: JSON.stringify(task), // put task in body
            headers: {
                'Content-Type': 'application/json' // indicate return type of JSON
            }
        }
    );
}

// Event listener for new tasks being created
document.getElementById('task-register').addEventListener('click', async () => {
    // Retrieve textbox

    const textbox = document.getElementById('task-title');
    // Create task by retrieving text from textbox
    const task = {
        title: textbox.value
    };
    // Call server
    const response = await fetch(
        '/api/tasks', // API location
        {
            method: 'POST', // POST to create new item
            body: JSON.stringify(task), // Add task to body
            headers: {
                'Content-Type': 'application/json' // Set return type to JSON
            }
        }
    );

    // Get the task returned from the server (it will have a new id)
    const loadedTask = await response.json();
    // Add the task to the array for local storage
    tasks.push(loadedTask);
    // Add the new task to the display
    addTaskToDisplay(loadedTask);

    // Clear the textbox
    textbox.value = '';
    // Set focus back on the textbox
    textbox.focus();
});
