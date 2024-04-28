const express = require('express');
const router = express.Router();
const db = require('../firebaseInit');

router.post('/', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;

    const docRef = await db.collection('categories').add({
      title,
      description,
      imageUrl,
    });

    res.status(201).json({ id: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json.send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('categories').get();
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json.send(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const { id } = req.params;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    await db.collection('categories').doc(id).update(updateData);

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.collection('categories').doc(id).delete();

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json.send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await db.collection('categories').doc(id).get();

    if (!doc.exists) {
      res.status(404).json({ message: 'Category not found' });
    }

    const categoryData = doc.data();

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json.send(err);
  }
});

module.exports = router;
