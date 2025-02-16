import { FC, useEffect, useState, useCallback } from "react";
import { Ads } from "../../types/ad.types";
import { List, Pagination } from "antd";
import { AdComponent } from "./AdComponent";
import { debounce } from "lodash";

type PaginatorType = {
    data: Ads;
    pageSize?: number;
};

export const Paginator: FC<PaginatorType> = ({ data, pageSize = 5 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter(ad =>
        ad.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const handleSearch = useCallback(
        debounce((value: string) => {
            if (value.length >= 3) {
                setSearchTerm(value);
            } else {
                setSearchTerm(""); 
            }
        }, 500), []
    );

    return (
        <div className="w-full space-y-4">
            <input placeholder="Поиск по названию..."
                onChange={(e) => handleSearch(e.target.value)}
                className="h-10"/>

            <List
                dataSource={currentData}
                renderItem={(item) => <AdComponent ad={item} />}
            />

            <Pagination
                current={currentPage}
                total={filteredData.length}
                pageSize={pageSize}
                align="center"
                onChange={handlePageChange}
                responsive
                pageSizeOptions={[3, 5]}
                showSizeChanger={false}
            />
        </div>
    );
};
