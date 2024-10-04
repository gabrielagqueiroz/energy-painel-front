import React from 'react';
import { TenantsContext } from './tenantsContext';
import { useTenants } from './useTenants';

interface TenantsProviderProps {
  children: React.ReactNode;
}

const TenantsProvider: React.FC<TenantsProviderProps> = ({ children }) => {
  const providerTenants= useTenants();

  return (
    <TenantsContext.Provider value={providerTenants}>
      {children}
    </TenantsContext.Provider>
  );
};

export default TenantsProvider;