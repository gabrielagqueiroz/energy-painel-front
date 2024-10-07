import { Button, Descriptions, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useTenantsContext } from "../../services/tenants/tenantsContext";


const TenantDetails = () => {
  const {
    reset
  } = useForm();
  const { isModalOpen, setIsModalOpen, tenants, uuid, detailsMode } = useTenantsContext();


  const tenant = tenants.find((tenant) => tenant.uuid === uuid);

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="fixed flex right-0 py-5 mr-11">
      <Modal
        title={
          <div className="text-center text-lg text-[#002346] font-semibold py-4">
            Detalhes do Locatário
          </div>
        }
        open={isModalOpen && detailsMode}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Fechar
          </Button>,
        ]}
        width={600}
      >
        <Descriptions layout="vertical">
          <Descriptions.Item label="Nome">{tenant?.name}</Descriptions.Item>
          <Descriptions.Item label="CPF">{tenant?.document}</Descriptions.Item>
          <Descriptions.Item label="Telefone">{tenant?.phone}</Descriptions.Item>
          <Descriptions.Item label="CEP">{tenant?.address.zipcode}</Descriptions.Item>
          <Descriptions.Item label="Rua">{tenant?.address.street}</Descriptions.Item>
          <Descriptions.Item label="Numero">{tenant?.address.number}</Descriptions.Item>
          <Descriptions.Item label="Complemento">{tenant?.address.complement}</Descriptions.Item>
          <Descriptions.Item label="Cidade">{tenant?.address.city}</Descriptions.Item>
          <Descriptions.Item label="Estado">{tenant?.address.state}</Descriptions.Item>
          <Descriptions.Item label="Pais">{tenant?.address.country}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default TenantDetails;