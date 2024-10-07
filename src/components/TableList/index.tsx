import { useRef, useState } from "react";
import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  TableProps,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined
} from "@ant-design/icons";
import { Layout, Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { DataTenants } from "../../services/tenants/types";
import { useTenantsContext } from "../../services/tenants/tenantsContext";
import LoadingError from "../LoadingError";

const { Content } = Layout;

type OnChange = NonNullable<TableProps<DataTenants>["onChange"]>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const TableList = () => {
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const { tenants, loading, error, deleteTenant, setIsModalOpen, setUuid, setEditMode, setDetailsMode } = useTenantsContext();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const searchInput = useRef<InputRef>(null);

  const handleChange: OnChange = (_, __, sorter) => {
    setSortedInfo(sorter as Sorts);
  };

  const uniqueStates = [...new Set(tenants.map((item) => item.address.state))];
  const filters = uniqueStates
    .map((state) => ({ text: state, value: state }))
    .sort((a, b) => a.text.localeCompare(b.text));

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    close();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: string
  ): TableColumnType<DataTenants> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div className="p-5" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={"Pesquisar"}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          className="mb-2 block"
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            className="w-100"
          >
            Pesquisar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            className="w-90"
          >
            Limpar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtro
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        className={`text-${filtered ? "[#1677ff]" : "inherit"}`}
      />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataTenants> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "CPF",
      dataIndex: "document",
      key: "document",
      width: "15%",
      ...getColumnSearchProps("document"),
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Cidade",
      dataIndex: ["address", "city"],
      key: "city",
      width: "15%",
      ...getColumnSearchProps("city"),
    },
    {
      title: "UF",
      dataIndex: ["address", "state"],
      key: "state",
      filters,
      onFilter: (value, record) =>
        record.address.state.startsWith(value as string),
      filterSearch: true,
      width: "10%",
      sorter: (a, b) => a.address.state.localeCompare(b.address.state),
      sortOrder: sortedInfo.columnKey === "state" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      width: "12%",
      align: "center",
      render: (_, record, index) => (
        <Space size="small" key={record.id || index}>
          <Button
            key="edit"
            size="small"
            onClick={() => {
              record.uuid && setUuid(record.uuid);
              setEditMode(true);
              setIsModalOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            key="delete"
            size="small"
            onClick={() => record.uuid && deleteTenant(record.uuid)}
          >
            <DeleteOutlined />
          </Button>
          <Button
            key="details"
            size="small"
            onClick={() => {
              record.uuid && setUuid(record.uuid);
              setEditMode(false);
              setDetailsMode(true);
              setIsModalOpen(true);
            }}
            >
            <MoreOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Content className="p-8 min-h-[400px]">
        <LoadingError loading={loading} error={error}>
          <Table<DataTenants>
            columns={columns}
            dataSource={tenants.map((tenant) => ({
              ...tenant,
              key: tenant.id,
            }))}
            onChange={handleChange}
            scroll={{ x: "max-content" }}
          />
        </LoadingError>
      </Content>
    </Layout>
  );
};

export default TableList;
