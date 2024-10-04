import { useState, useEffect } from "react";
import { message } from "antd";
import { getCep } from "../../api";
import { tenantService } from "./tenantsServices";
import { DataTenants } from "./types";

export interface TenantsProps {
  tenants: DataTenants[];
  loading: boolean;
  error: Error | null;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  tenantData: DataTenants | null;
  setTenantData: (tenantData: DataTenants | null) => void;
  fetchTenants: () => Promise<void>;
  createTenant: (tenantData: any) => Promise<void>;
  updateTenant: (tenantData: any) => Promise<void>;
  deleteTenant: (uuid: string) => Promise<void>;
  cepChange: (cep: string, setValue: any, setFocus: any) => Promise<void>;
}

export const useTenants = (): TenantsProps => {
  const [tenants, setTenants] = useState<DataTenants[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenantData, setTenantData] = useState<DataTenants | null>(null);

  const cepChange = async (cep: string, setValue: any, setFocus: any) => {
    try{
      const response = await getCep(cep);
      const data = response.data;
      setValue("street", data.logradouro);
      setValue("neighborhood", data.bairro);
      setValue("city", data.localidade);
      setValue("state", data.uf);
      setFocus("number");
    } catch(error) {
      setError(error instanceof Error ? error : new Error("Ocorreu um erro"));
    }
  };

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const response = await tenantService.getTenants();
      setTenants(response.response.data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Ocorreu um erro"));
    } finally {
      setLoading(false);
    }
  };

  const createTenant = async (tenantData: any) => {
    try {
      setLoading(true);
      console.log("Dados do locatário:", tenantData);
      await tenantService.postTenant(tenantData);
      await fetchTenants();
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Ocorreu um erro"));
    } finally {
      setLoading(false);
    }
  };

  const updateTenant = async (tenantData: DataTenants) => {
    try {
      setLoading(true);
      await tenantService.updateTenant(tenantData);
      await fetchTenants();
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Ocorreu um erro"));
      message.error("Não foi possível editar Locatário");
    } finally {
      setLoading(false);
    }
  };


  const deleteTenant = async (uuid: string) => {
    try {
      setLoading(true);
      await tenantService.deleteTenant(uuid);
      message.success("Locatário excluido com sucesso!");
      await fetchTenants();
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Ocorreu um erro"));
      message.error("Não foi possivel excluir Locatário");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return {
    tenants,
    loading,
    error,
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,
    cepChange,
    isModalOpen,
    setIsModalOpen,
    tenantData,
    setTenantData,
  };
};

