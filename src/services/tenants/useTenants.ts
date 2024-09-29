import { useState, useEffect  }from "react";
import { tenantService } from "./tenantsServices";
import { DataTenants } from "./types";


export const useTenants = (): { tenants: DataTenants[], loading: boolean, error: Error | null, 
    fetchTenants: () => Promise<void> } => {
    const [tenants, setTenants] = useState<DataTenants[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);


    const fetchTenants = async () => {
        try {
            setLoading(true);
            const response = await tenantService.getTenants();
            console.log("API Response:", response);
            if (response && response.response && response.response.data) {
              setTenants(response.response.data);
              setError(null);
            } else {
              console.error("Invalid API response:", response);
              setError(new Error("Invalid API response"));
            }
          } catch (err) {
            console.error("Error fetching tenants:", err);
            setError(err instanceof Error ? err : new Error('An error occurred'));
          } finally {
            setLoading(false);
          }
        }

    useEffect(() => {
        fetchTenants();
    }, []);


    return {tenants, loading, error, fetchTenants};
};