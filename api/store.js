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
    // log parameter passed from caller, used to log to Azure Functions
    connect: async (log) => {
        log('Connecting to database...');

        // If connection is already made, return
        if (mongoose.connection.readyState === 1) {
            log('Connection already established.');
            return;
        }

        // If connectionString is not configured, attempt to connect to localhost MongoDB
        if (!connectionString) {
            log('CONNECTION_STRING not configured. Attempting to use localhost.');
            connectionString = 'mongodb://localhost';
        }

        try {
            // Connect to the database
            mongoose.connect(
                connectionString,
                { // boiler plate values
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            );
        } catch(ex) {
            // Connection unsuccessful
            // Log error and rethrow
            log(`Connection unsucessful. Error message: ${ex.message}`);
            throw ex;
        }
    },

    getAll: async (userId) => {
        return await TaskModel.find({ userId });
    },

    create: async (task) => {
        return await TaskModel.create(task);
    },

    update: async (id, task) => {
        return await TaskModel.updateOne({ _id: id }, task);
    }
}
