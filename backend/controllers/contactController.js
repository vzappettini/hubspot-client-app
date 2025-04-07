const {
    createContact,
    getAllContacts,
    getContactById,
    getContactByEmail,
    updateContact,
    deleteContact
  } = require('../services/contactService');
  
  exports.create = async (req, res) => {
    try {
      const contact = await createContact(req.body);
      res.status(201).json(contact);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getAll = async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getById = async (req, res) => {
    try {
      const contact = await getContactById(req.params.id);
      res.json(contact);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
  
  exports.getByEmail = async (req, res) => {
    try {
      const contact = await getContactByEmail(req.params.email);
      res.json(contact);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
  
  exports.update = async (req, res) => {
    try {
      const updated = await updateContact(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.remove = async (req, res) => {
    try {
      await deleteContact(req.params.id);
      res.json({ message: 'Contacto eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  