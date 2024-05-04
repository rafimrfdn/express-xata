import express from 'npm:express@4.18.2';
import path from 'npm:path@0.12.7'; // To resolve file paths
import bodyParser from "npm:body-parser@1.20.2";
import userRoutes from './src/routes/userRoutes.js';
import ejs from 'npm:ejs@3.1.10';


import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env = await load();

const app = express();

// const port = Deno.env.PORT || 3001;
const port = env.PORT || 3001;

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

export { app, port, userRoutes };
//module.exports = app;
