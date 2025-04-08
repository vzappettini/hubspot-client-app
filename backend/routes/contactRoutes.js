const express = require('express');
const router = express.Router();
const axios = require('axios');

const contactController = require('../controllers/contactController');

// Token de HubSpot desde .env
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

const headers = {
  Authorization: `Bearer ${HUBSPOT_API_KEY}`,
  'Content-Type': 'application/json'
};

router.post('/', contactController.create);
router.get('/', contactController.getAll);
//router.get('/email/:email', contactController.getByEmail);

router.delete('/:id', contactController.remove);

// Buscar por coincidencia parcial de email
router.get('/search', async (req, res) => {
    const query = req.query.q;
  
    if (!query) {
      return res.status(400).json({ message: 'Parámetro de búsqueda requerido' });
    }
  
    try {
      const response = await axios.post(
        'https://api.hubapi.com/crm/v3/objects/contacts/search',
        {
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'CONTAINS_TOKEN',
                  value: query
                }
              ]
            }
          ],
          properties: ['firstname', 'lastname', 'email'],
          limit: 50
        },
        { headers }
      );
  
      res.json(response.data.results);
    } catch (error) {
      console.error('Error al buscar contactos:', error.response?.data || error.message);
      res.status(500).json({ message: 'Error al buscar contactos' });
    }
  });

router.get('/:id', contactController.getById);
router.put('/:id', contactController.update);

  

module.exports = router;



