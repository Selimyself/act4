const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/', async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = new Product({ name, price });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Erreur lors de la création du produit', error);
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du produit' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    product.name = name;
    product.price = price;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    await product.remove();

    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
});

module.exports = router;
