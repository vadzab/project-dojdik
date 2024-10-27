"use client";

import { useTheme } from "next-themes";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

import { ChartOne } from "@/components/chart/chart-one";
import { ChartTwo } from "@/components/chart/chart-two";

export const Content = () => {
  const { theme } = useTheme();

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="chart1" title="Волшебные данные Таранова">
          <Card>
            <CardHeader>Волшебные данные Таранова</CardHeader>
            <CardBody>
              <ChartOne />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="chart2" title="Божественные данные Таранова">
          <Card>
            <CardHeader>Божественные данные Таранова</CardHeader>
            <CardBody>
              <ChartTwo darkMode={theme === "dark"} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};
