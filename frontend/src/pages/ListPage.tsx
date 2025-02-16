import { FC } from "react";
import { Input, List, Pagination, Select } from "antd";
import { AdComponent, usePaginator } from "../components/list/index";
import { AdTypes } from "../types/ad.types"; // импорт enum типов

export const ListPage: FC = () => {
  const {
    currentData,
    filteredData,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTypeChange,
    selectedType,
  } = usePaginator(5);

  return (
    <div className="container mx-auto w-full px-20 py-5 min-h-screen">
      <div className="flex gap-3.5">
        <Select
          value={selectedType}
          onChange={handleTypeChange}
          allowClear
          placeholder="Выберите тип"
          className="w-52"
        >
          {Object.entries(AdTypes).map(([key, value]) => (
            <Select.Option key={key} value={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
        <Input
          placeholder="Поиск по названию..."
          onChange={(e) => handleSearch(e.target.value)}
          className=""
        />
      </div>
      <List
        dataSource={currentData}
        renderItem={(item) => <AdComponent ad={item} />}
      />

      <Pagination
        current={currentPage}
        total={filteredData.length}
        pageSize={5}
        align="center"
        onChange={handlePageChange}
        responsive
        pageSizeOptions={[3, 5]}
        showSizeChanger={false}
      />
    </div>
  );
};
