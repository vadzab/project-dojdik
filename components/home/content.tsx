"use client";

import { useTheme } from "next-themes";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

import { ChartLot } from "@/components/chart/chartLot";
import { TableLot } from "@/components/table/table-lot";

export const Content = () => {
  const { theme } = useTheme();

  return (
    <>
      <Tabs aria-label="Options">
        <Tab key="chart2" title="Божественные данные Таранова">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>Божественные данные Таранова</CardHeader>
              <CardBody>
                <ChartLot darkMode={theme === "dark"} />
              </CardBody>
            </Card>
            <TableLot />
          </div>
        </Tab>
      </Tabs>
    </>
  );
};
