// TODO: Ensure you configured CONNECTION_STRING on the server when deployed
// https://docs.microsoft.com/azure/static-web-apps/application-settings
let connectionString = process.env.CONNECTION_STRING;

// Load mongoose
const mongoose = require('mongoose');

// Create the schema or structure of our object in Mongoose
const taskSchema = new mongoose.Schema({
    title: String, // Add title property of type string
    completed: { // Add completed property
        type: Boolean, // Set type to boolean
        default: false // Set default to false
    },
    userId: String // Id of the user for the task
});

// This model will use our schema and connect to the database
const TaskModel = mongoose.model('task', taskSchema);

module.exports = {
    // Used to connect to the database
    connect: async () => {
        // If connection is already made, return
        if (mongoose.connection.readyState === 1) return;

        // If there is no connection string, an in-memory database will be created
        // This is for development purposes only
        if (!connectionString) {
            // Load the mongodb-memory-server library
            connectionString = await getInMemoryServerUri();
        }

        // Connect to the database
        mongoose.connect(
            connectionString,
            { // boiler plate values
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    },

    getAll: async (userId) => {
        return await TaskModel.find({userId});
    },

    create: async (task) => {
        return await TaskModel.create(task);
    },

    update: async (id, task) => {
        return await TaskModel.updateOne({ _id: id }, task);
    }
}


// Helper functions
async function getInMemoryServerUri() {
    // Load the library
    const { MongoMemoryServer } = require('mongodb-memory-server');

    // Create the in-memory server
    const server = await MongoMemoryServer.create();

    // Return the in-memory connection string
    return server.getUri();
}
