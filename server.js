const express = require('express');
const cors = require('cors');

const categoriesRoutes = require('./routes/categoriesRoutes');
const productsRoutes = require('./routes/productsRoutes');
const { handleError, handleNotFound } = require('./errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/categories', categoriesRoutes);
app.use('/products', productsRoutes);

app.use(handleNotFound);
app.use(handleError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
