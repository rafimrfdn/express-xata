import express from 'express';
import path from 'path'; // To resolve file paths
import bodyParser from 'body-parser'; // For parsing request bodies
import userRoutes from './src/routes/userRoutes.js';

const app = express();

const port = process.env.PORT || 3000;

// Use body-parser middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes
app.use('/users', userRoutes);  // Register routes with a base path of '/users'

// Serve static assets from the 'public' directory
app.use(express.static(path.resolve('./src/public')));

// Handle any routes not explicitly defined (e.g., serve index.html for the root path)
app.get('*', (req, res) => {
  res.render('index'); // Replace with your actual index.html file name if it's different
});

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`server run di localhost port ${port}`);
});

//export { app, port, userRoutes };
module.exports = app;
