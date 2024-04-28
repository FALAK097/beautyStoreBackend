const express = require('express');
const router = express.Router();
const db = require('../firebaseInit');

router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      price,
      weight,
      quantity,
      dimensions,
      sku,
      categoryId,
    } = req.body;

    const docRef = await db.collection('products').add({
      title,
      description,
      imageUrl,
      price,
      weight,
      quantity,
      dimensions,
      sku,
      categoryId,
    });

    res.status(201).json({ id: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      price,
      weight,
      quantity,
      dimensions,
      sku,
      categoryId,
    } = req.body;
    const { id } = req.params;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (price !== undefined) updateData.price = price;
    if (weight !== undefined) updateData.weight = weight;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (dimensions !== undefined) updateData.dimensions = dimensions;
    if (sku !== undefined) updateData.sku = sku;
    if (categoryId !== undefined) updateData.categoryId = categoryId;

    await db.collection('products').doc(id).update(updateData);

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('products').doc(id).delete();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await db.collection('products').doc(id).get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Product not found' });
    }

    const productData = doc.data();

    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
