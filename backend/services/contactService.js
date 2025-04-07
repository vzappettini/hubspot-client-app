//Axios para hablar con HubSpot
const axios = require('axios');
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const BASE_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';

const headers = {
  Authorization: `Bearer ${HUBSPOT_API_KEY}`,
  'Content-Type': 'application/json'
};

exports.createContact = async (data) => {
  const response = await axios.post(BASE_URL, {
    properties: data
  }, { headers });
  return response.data;
};

exports.getAllContacts = async () => {
  const response = await axios.get(`${BASE_URL}?limit=100`, { headers });
  return response.data.results;
};

exports.getContactById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`, { headers });
  return response.data;
};

exports.getContactByEmail = async (email) => {
  const response = await axios.post(
    'https://api.hubapi.com/crm/v3/objects/contacts/search',
    {
      filterGroups: [
        {
          filters: [
            {
              propertyName: 'email',
              operator: 'EQ',
              value: email
            }
          ]
        }
      ]
    },
    { headers }
  );

  return response.data.results[0]; // Devuelve el primer resultado
};


exports.updateContact = async (id, data) => {
  const response = await axios.patch(`${BASE_URL}/${id}`, {
    properties: data
  }, { headers });
  return response.data;
};

exports.deleteContact = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return { status: response.status };
};


