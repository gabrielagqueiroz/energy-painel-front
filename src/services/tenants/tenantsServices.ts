import { api } from "../../api";
import { TenantResponse, DataTenants } from "./types";

export const tenantService = {
  getTenants: async (): Promise<TenantResponse> => {
    try {
      const response = await api.get("/tenants");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar locatario:", error);
      throw new Error("Falha ao buscar locatario");
    }
  },

  postTenant: async (tenantData: DataTenants): Promise<DataTenants> => {
    try {
      const response = await api.post("/tenants/store", tenantData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar locatário:", error);
      throw new Error("Falha ao criar locatário");
    }
  },

  updateTenant: async (tenantData: DataTenants): Promise<DataTenants> => {
    try {
      const response = await api.put(`tenants/${tenantData.uuid}/update`, tenantData);
      return response.data;
    } catch (error) {
      console.error("Erro ao editar locatário:", error);
      throw new Error("Falha ao editar locatário");
    }
  },

  deleteTenant: async (uuid: string): Promise<void> => {
    try {
      const response = await api.delete(`tenants/${uuid}/destroy`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar locatário:", error);
      throw new Error("Falha ao excluir locatário");
    }
  },
};
