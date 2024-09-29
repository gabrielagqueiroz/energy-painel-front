import React, { useRef, useState } from "react";
import type { InputRef, TableColumnsType, TableColumnType, TableProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Layout, Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { DataTenants } from "../../services/tenants/types";
import { useTenants } from "../../services/tenants/useTenants";

const { Content } = Layout;

type OnChange = NonNullable<TableProps<DataTenants>["onChange"]>;
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const Tenants: React.FC = () => {
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const { tenants, loading, error, fetchTenants } = useTenants();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const handleChange: OnChange = (sorter) => {
    setSortedInfo(sorter as Sorts);
  };
  const uniqueStates = [...new Set(tenants.map((item) => item.address.state))];
  const filters = uniqueStates
    .map((state) => ({ text: state, value: state }))
    .sort((a, b) => a.text.localeCompare(b.text));


  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: string,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnType<DataTenants> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div className="p-5" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={"Pesquisar"}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          className="mb-2 block"
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
      <SearchOutlined className={`text-${filtered ? '[#1677ff]' : 'inherit'}`} />
    ),
    onFilter: (value, record) =>
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "CPF",
      dataIndex: "document",
      key: "document",
      width: "15%",
      ...getColumnSearchProps('document'),
    },
    {
      title: "CEP",
      dataIndex: ["address", "zipcode"],
      key: "zipcode",
      width: "15%", 
      ...getColumnSearchProps('zipcode'),
    },
    {
      title: "Rua",
      dataIndex: ["address", "street"],
      key: "street",
      width: "20%",
      ...getColumnSearchProps('street'),
      sorter: (a, b) => a.address.street.length - b.address.street.length,
      sortDirections: ['descend', 'ascend'],
      ellipsis: true,
    },
    {
      title: "Bairro",
      dataIndex: ["address", "neighborhood"],
      key: "neighborhood",
      width: "15%",
      ...getColumnSearchProps('neighborhood'),
      sorter: (a, b) => a.address.neighborhood.length - b.address.neighborhood.length,
      sortOrder: sortedInfo.columnKey === "neighborhood" ? sortedInfo.order : null,
      ellipsis: true,
      
    },
    {
      title: "Cidade",
      dataIndex: ["address", "city"],
      key: "city",
      width: "15%",
      ...getColumnSearchProps('city'),
      sorter: (a, b) => a.address.city.localeCompare(b.address.city),
      sortOrder: sortedInfo.columnKey === "city" ? sortedInfo.order : null,
      ellipsis: true,
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
  ];

  return (
    <Layout>
      <Content className="p-8 min-h-[400px]">
        <Table<DataTenants>
          columns={columns}
          dataSource={tenants}
          onChange={handleChange}
        />
      </Content>
    </Layout>
  );
};

export default Tenants;
