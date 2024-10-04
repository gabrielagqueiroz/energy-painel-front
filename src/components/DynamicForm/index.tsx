import React, { useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useTenantsContext } from "../../services/tenants/tenantsContext";
import { DataTenants } from "../../services/tenants/types";

interface DynamicFormProps {
  uuid: string | undefined,
  setUuid: any
  EditMode: boolean,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

const DynamicForm = ({
  uuid,
  setUuid,
  EditMode,
  setEditMode
} : DynamicFormProps) => {
  
  const {
    control,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const {
    cepChange,
    createTenant,
    updateTenant,
    isModalOpen,
    setIsModalOpen,
    tenants,
  } = useTenantsContext();


  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditMode(false);
    setUuid(undefined);
    reset();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setUuid(undefined);
    reset();
  };

  const onSubmit = (data: any) => {
    try {
      const tenantData: DataTenants = {
        ...data,
        uuid: uuid,
        active: true,
        logo: null,
        address: {
          street: data.street,
          number: data.number,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
          country: "Brasil",
        },
      };

      if (EditMode && uuid) {
        updateTenant(tenantData);
        console.log("dados do locatario editado:", tenantData);
        message.success("Locatário atualizado!");
        setEditMode(false); //AQUI
        handleCancel();
        reset();
      } else {
        createTenant(tenantData);
        console.log("locatario criado:", tenantData);
        message.success("Locatário cadastrado!");
        handleCancel();
        reset();
      }
    } catch (error) {
      message.error("Não foi possível cadastrar Locatário");
      throw new Error("Falha ao criar locatário");
    }
  };

  useEffect(() => {
    if (EditMode && uuid) {
      setEditMode(true);
      console.log("UUID recebido:", uuid);
      console.log("Dados do tenants recebidos:", tenants);
      const tenant = tenants.find((tenant) => tenant.uuid === uuid);
      if (tenant) {
        const { name, email, document, phone, address } = tenant;
        console.log("Preenchendo o formulário com os dados:", tenant);
        setValue("name", name);
        setValue("email", email);
        setValue("document", document);
        setValue("phone", phone);
        setValue("street", address.street);
        setValue("number", address.number);
        setValue("neighborhood", address.neighborhood);
        setValue("city", address.city);
        setValue("state", address.state);
        setValue("zipcode", address.zipcode);
      } else {
        console.log("Dados insuficientes para preencher o formulário.");
        reset();
        setEditMode(false);
      }
    }
  }, [uuid, EditMode]);

  return (
    <div className="fixed flex right-0 py-5 mr-11">
      <Button onClick={handleOpenModal} size="middle" type="primary">
        Cadastrar
        <PlusOutlined />
      </Button>
      <Modal
        title={
          <div
            className="text-center text-lg text-[#002346] font-semibold py-4"
          >
            {EditMode ? "Editar Locatário" : "Cadastrar Locatário"}
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="send" type="primary" onClick={handleSubmit(onSubmit)}>
            Enviar
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          className="max-w-600"
        >
          <Form.Item
            label="Nome"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message?.toString()}
          >
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Nome é obrigatório",
                minLength: {
                  value: 5,
                  message: "Nome deve ter pelo menos 5 letras",
                },
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Digite o nome do Locatário" />
              )}
            />
          </Form.Item>
          <Form.Item
            label="CPF"
            validateStatus={errors.document ? "error" : ""}
            help={errors.document?.message?.toString()}
          >
            <Controller
              name="document"
              control={control}
              rules={{
                required: "CPF é obrigatório",
                minLength: { value: 11, message: "O CPF deve ter 11 dígitos" },
                maxLength: { value: 11, message: "O CPF deve ter 11 dígitos" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "CPF deve conter apenas dígitos",
                },
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Digite o CPF" />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message?.toString()}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "E-mail é obrigatório",
                pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Digite o email do Locatário" />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Telefone"
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone?.message?.toString()}
          >
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Telefone é obrigatório",
                minLength: {
                  value: 11,
                  message: "O Telefone deve ter 11 dígitos",
                },
                maxLength: {
                  value: 11,
                  message: "O Telefone deve ter 11 dígitos",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o telefone do Locatário"
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="CEP"
            validateStatus={errors.zipcode ? "error" : ""}
            help={errors.zipcode?.message?.toString()}
          >
            <Controller
              name="zipcode"
              control={control}
              rules={{
                required: "CEP é obrigatório",
                minLength: { value: 8, message: "O CEP deve ter 8 dígitos" },
                maxLength: { value: 8, message: "O CEP deve ter 8 dígitos" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "CEP deve conter apenas dígitos",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o CEP"
                  onBlur={(e) => {
                    const cep = e.target.value.replace(/\D/g, "");
                    cepChange(cep, setValue, setFocus);
                  }}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Rua"
            validateStatus={errors.street ? "error" : ""}
            help={errors.street?.message?.toString()}
          >
            <Controller
              name="street"
              control={control}
              rules={{
                required: "Rua é obrigatório",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o nome da Rua"
                  value={watch("street")}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Numero"
            validateStatus={errors.number ? "error" : ""}
            help={errors.number?.message?.toString()}
          >
            <Controller
              name="number"
              control={control}
              rules={{
                required: "Número é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Número deve conter apenas dígitos",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o Numero"
                  value={watch("number")}
                />
              )}
            />
          </Form.Item>
          {/* <Form.Item
            label="Complemento"
            validateStatus={errors.complement ? "error" : ""}
            help={errors.complement?.message?.toString()}
          >
            <Controller
              name="complement"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o completo"
                  value={watch("complement")}
                />
              )}
            />
          </Form.Item> */}
          <Form.Item
            label="Bairro"
            validateStatus={errors.neighborhood ? "error" : ""}
            help={errors.neighborhood?.message?.toString()}
          >
            <Controller
              name="neighborhood"
              control={control}
              rules={{
                required: "Bairro é obrigatório",
                pattern: {
                  value: /^[\u00C0-\u017F\u00FFa-zA-Z\s]+$/,
                  message: "Bairro deve ter apenas letras",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o nome do Bairro"
                  value={watch("neighborhood")}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Cidade"
            validateStatus={errors.city ? "error" : ""}
            help={errors.city?.message?.toString()}
          >
            <Controller
              name="city"
              control={control}
              rules={{
                required: "Cidade é obrigatório",
                pattern: {
                  value: /^[\u00C0-\u017F\u00FFa-zA-Z\s]+$/,
                  message: "Cidade deve ter apenas letras",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o nome da Cidade"
                  value={watch("city")}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Estado"
            validateStatus={errors.state ? "error" : ""}
            help={errors.state?.message?.toString()}
          >
            <Controller
              name="state"
              control={control}
              rules={{
                required: "Estado é obrigatório",
                pattern: {
                  value: /^[\u00C0-\u017F\u00FFa-zA-Z\s]+$/,
                  message: "Estado deve ter apenas letras",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Digite o nome do Estado"
                  value={watch("state")}
                />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DynamicForm;
