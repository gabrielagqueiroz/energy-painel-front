import { createContext, useContext} from "react";
import { TenantsProps } from "./useTenants";

const TenantsContext = createContext<TenantsProps | null>(null);

const useTenantsContext = () => {
    const context = useContext(TenantsContext);
    if (!context) {
        throw new Error("useTenantsContext must be used within a TenantsProvider");
    }
    return context;
};

export { TenantsContext, useTenantsContext };