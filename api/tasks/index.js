
const store = require('../store.js');

// Export our function
module.exports = async function (context, req) {
    // Get the current user
    const userId = getUserId(req);

    // If no current user, return 401
    if(!userId) {
        context.res.status = 401;
        return;
    }

    // setup our default content type (we always return JSON)
    context.res = {
        header: {
            "Content-Type": "application/json"
        }
    }

    // Connect to the database
    await store.connect();

    // Read the method and determine the requested action
    switch (req.method) {
        // If get, return all tasks
        case 'GET':
            await getTasks(context, userId);
            break;
        // If post, create new task
        case 'POST':
            await createTask(context, userId);
            break;
        // If put, update task
        case 'PUT':
            await updateTask(context, userId);
            break;
    }
};

// Get current user
function getUserId(req) {
    // Retrieve client info from request header
    const header = req.headers['x-ms-client-principal'];
    // The header is encoded in Base64, so we need to convert it
    const encoded = Buffer.from(header, 'base64');
    // Convert from Base64 to ascii
    const decoded = encoded.toString('ascii');
    // Convert to a JSON object and return the userId
    return JSON.parse(decoded).userId;
}

// Return all tasks
async function getTasks(context, userId) {
    // load all tasks from database filtered by userId
    const tasks = await store.getAll(userId);
    // return all tasks
    context.res.body = { tasks: tasks };
}

// Create new task
async function createTask(context, userId) {
    // Read the uploaded task
    const newTask = context.req.body;
    // Add the userId
    newTask.userId = userId;
    // Save to database
    const task = await store.create(newTask);
    // Set the HTTP status to created
    context.res.status = 201;
    // return new object
    context.res.body = task;
}

// Update an existing function
async function updateTask(context, userId) {
    // Grab the id from the URL (stored in bindingData)
    const id = context.bindingData.id;
    // Get the task from the body
    const task = context.req.body;
    // Add the userId
    task.userId = userId;
    // Update the item in the database
    const result = await store.update(id, task);
    // Check to ensure an item was modified
    if (result.nModified === 1) {
        // Updated an item, status 204 (empty update)
        context.res.status = 204;
    } else {
        // Item not found, status 404
        context.res.status = 404;
    }
}
