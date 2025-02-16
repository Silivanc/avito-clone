import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useGetAdsQuery } from "../../api/adsApi";

export const usePaginator = (pageSize: number = 5) => {
  const { data } = useGetAdsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredData = data
    ? data
        .filter(
          (ad) =>
            ad.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedType ? ad.type === selectedType : true),
        )
        .reverse()
    : [];

  const currentData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        setSearchTerm(value);
      } else {
        setSearchTerm("");
      }
    }, 500),
    [],
  );

  const handleTypeChange = (value: string | null) => {
    setSelectedType(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return {
    currentData,
    filteredData,
    currentPage,
    handlePageChange,
    handleSearch,
    handleTypeChange,
    selectedType,
  };
};
