import { useState, useEffect } from "react";
import { message } from 'antd';
import { getCep } from "../../api";
import { tenantService } from "./tenantsServices";
import { DataTenants } from "./types";

export const useTenants = (): {
  tenants: DataTenants[];
  loading: boolean;
  error: Error | null;
  fetchTenants: () => Promise<void>;
  cepChange: (cep: string, setValue: any, setFocus: any) => Promise<void>;
  createTenant: (tenantData: any) => Promise<void>;
  deleteTenant: (uuid: string) => Promise<void>;
} => {
  const [tenants, setTenants] = useState<DataTenants[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const response = await tenantService.getTenants();
      setTenants(response.response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar locatario:", error);
      setError(error instanceof Error ? error : new Error("Ocorreu um erro"));
    } finally {
      setLoading(false);
    }
  };

  const cepChange = async (cep: string, setValue: any, setFocus: any) => {
    const response = await getCep(cep);
    const data = response.data; 
    setValue("street", data.logradouro);
    setValue("neighborhood", data.bairro);
    setValue("city", data.localidade);
    setValue("state", data.uf);
    setFocus("number");
  };

  const createTenant = async (tenantData: any) => {
    try {
      setLoading(true);
      console.log(tenantData);
      const response = await tenantService.postTenant(tenantData);
      console.log("Locatário cadastrado", response);
      fetchTenants();
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Ocorreu um erro"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const deleteTenant = async (uuid: string) => {
    try {
      setLoading(true);
      const response = await tenantService.deleteTenant(uuid);
      console.log("Locatário deletado", response);
      message.success("Locatário excluido com sucesso!")
      fetchTenants();
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Ocorreu um erro"));
      message.error("Não foi possivel excluir Locatário")
    } finally {
      setLoading(false);
    }
  };

  return { tenants, loading, error, fetchTenants, createTenant, deleteTenant, cepChange };
};
