import {api} from '../../api';
import { TenantResponse, DataTenants } from './types';

export const tenantService = {
    getTenants: async (): Promise<TenantResponse> => {
      try {
        const token = localStorage.getItem('user');
        if (!token) {
          console.error("No token found in local storage");
          throw new Error("No token found");
        } 
        const user = JSON.parse(token);
        const response = await api.get("/tenants", {
          headers: {
              Authorization: `Bearer ${user.token}`
          }
        });
        console.log("API response:", response.data)
        return response.data;
      } catch (error) {
        console.error("Error fetching tenants:", error);
        throw new Error("Failed to fetch tenants");
      }
    },

      
    createTenant: async (tenantData: DataTenants): Promise<DataTenants> => {
        try {
          const response = await api.post("/tenants", tenantData);
          return response.data;
        } catch (error) {
          throw new Error("Failed to create tenant");
        }
    },
      
};