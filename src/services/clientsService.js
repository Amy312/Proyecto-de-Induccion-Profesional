import { organizerAPI } from './organizerInstance';

export const getClients = async () => {
    return await organizerAPI.get("/clients");
  };

  
  export const addClient = async (client) => {
    return await organizerAPI.post("/clients", client);
  };

  
  export const getClientById = async (id) => {
    return await organizerAPI.get(`/clients/${id}`);
  };

