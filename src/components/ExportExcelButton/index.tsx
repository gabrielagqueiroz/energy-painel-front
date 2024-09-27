import { Button } from 'antd';
import exportFromJSON from 'export-from-json';

interface ExportExcelButtonProps {
  dataSource: any;
  fields: any;
  fileName: string;
}

const ExportExcelButton = ({ dataSource, fields, fileName }: ExportExcelButtonProps) => {
  const data = dataSource;
  const exportType =  exportFromJSON.types.csv;

  const onExport = () => {
    exportFromJSON({ data, fileName, fields, exportType });
  };

  return (
    <Button type="primary" onClick={onExport}>
      Export to Excel
    </Button>
  );
};

export default ExportExcelButton;
