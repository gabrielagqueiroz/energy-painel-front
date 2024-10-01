export type DataTenants = {
    id: number;
    uuid: string;
    name: string;
    email: string;
    document: string;
    phone: string;
    logo: string | null;
    active: number;
    address: {
      id: number;
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
      zipcode: string;
    };
};


export type TenantResponse = {
  status: boolean;
  response: {
      current_page: number;
      data: DataTenants[];
  };
};