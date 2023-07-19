const axios = require('axios');

async function adminMiddleware(req, res, next) {
  try {
    const response = await axios.get('http://localhost:3000/getUserInfoFromToken', {
      headers: {
        Authorization: req.headers.authorization 
      }
    });

    const { role } = response.data;

    if (role !== 'admin') {
      return res.status(403).json({ message: "Accès interdit" });
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du rôle', error);
    res.status(500).json({ message: 'Erreur lors de la vérification du rôle' });
  }
}
