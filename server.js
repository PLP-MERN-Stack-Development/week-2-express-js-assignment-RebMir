const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const { errorHandler } = require('./utils/errors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/products', productsRoutes);

// Hello World Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});