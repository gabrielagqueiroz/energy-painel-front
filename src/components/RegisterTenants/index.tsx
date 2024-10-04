import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useTenants } from "../../services/tenants/useTenants";
import { DataTenants } from "../../services/tenants/types";

const RegisterTenants: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { createTenant, cepChange } = useTenants();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    reset()
  };

  const onSubmit = (data: any) => {
    try{
      const tenantData: DataTenants = {
        name: data.name,
        email: data.email,
        document: data.document,
        phone: data.phone,
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
      createTenant(tenantData);
      handleCancel();
      reset();
      message.success("Locatário cadastrado com sucesso!");
    }catch (error) {
      message.error("Não foi possivel cadastrar Locatário");
      throw new Error("Falha ao criar locatário");
    }
  }

  return (
    <div className="fixed flex right-0 py-5 mr-11">
      <Button
        onClick={showModal}
        size="middle"
        className="bg-[#003c76] text-white h-9"
      >
        Cadastrar
        <PlusOutlined />
      </Button>
      <Modal
        title="Cadastrar Locatário"
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
                pattern: {value: /^[a-zA-Z\s]+$/, message: "Bairro deve ter apenas letras"},
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
                pattern: {value: /^[a-zA-Z\s]+$/, message: "Cidade deve ter apenas letras"},
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
                pattern: {value: /^[a-zA-Z\s]+$/, message: "Estado deve ter apenas letras"},

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

export default RegisterTenants;
