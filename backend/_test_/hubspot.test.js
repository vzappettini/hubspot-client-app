const hubspotService = require('../services/contactService');
const axios = require('axios');
jest.mock('axios');

describe("HubSpot API Service", () => {

  it("debería crear un contacto", async () => {
    const mockResponse = { data: { id: "123" } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await hubspotService.createContact({
      firstname: "Juan",
      lastname: "Pérez",
      email: "juan@test.com",
     // phone: "123456789"
    });

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalled();
  });

  it("debería obtener un contacto por ID", async () => {
    const mockResponse = { data: { id: "123", properties: {} } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await hubspotService.getContactById("123");
    expect(result).toEqual(mockResponse.data);
  });

  it("debería buscar un contacto por email", async () => {
    const mockResponse = { data: { results: [{ properties: { email: "juan@test.com" } }] } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await hubspotService.getContactByEmail("juan@test.com");
    expect(result.properties).toEqual(mockResponse.data.results[0].properties);

  });

  it("debería actualizar un contacto", async () => {
    axios.patch.mockResolvedValue({ data: { id: "123" } });

    const result = await hubspotService.updateContact("123", {
      firstname: "Juan Actualizado"
    });

    expect(result.id).toBe("123");
  });

  it("debería eliminar un contacto", async () => {
    axios.delete.mockResolvedValue({ status: 204 });

    const result = await hubspotService.deleteContact("123");
    expect(result.status).toBe(204);
  });

});
