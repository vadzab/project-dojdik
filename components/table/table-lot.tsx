"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import { Api } from '@/services/api-client';
import { Lot } from "@prisma/client";

export const TableLot = () => {
  const [page, setPage] = React.useState(1); 
  const [pages, setPages] = React.useState(1);
  const [data, setData] = React.useState<Lot[]>([]);

  React.useEffect(() => {
    async function getLots() {
      const data = await Api.lot.getLots({page});
      setData(data.data);
    }
    getLots();
  }, []);

  const rowsPerPage = 10;


  return (
    <Table
      aria-label="Example tableMain with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="id">#</TableColumn>
        <TableColumn key="price">Цена</TableColumn>
        <TableColumn key="count">Качество</TableColumn>
        <TableColumn key="delivery">Доставка</TableColumn>
        <TableColumn key="doc">Документы</TableColumn>
        <TableColumn key="volume">Объем</TableColumn>
        <TableColumn key="packaging">Фасовка</TableColumn>
        <TableColumn key="decency">Порядочность</TableColumn>
      </TableHeader>
      <TableBody
        items={data ?? []}
        loadingContent={<Spinner />}
      >
        {(item: any) => (
          <TableRow key={item?.name!}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
