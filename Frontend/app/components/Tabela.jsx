"use client";

import { Table } from "flowbite-react";

export default function Tabela({ heads, data }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          {heads.map((element, i) => (
            <Table.HeadCell key={i}>{element}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((row, i) => {
            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={i}
              >
                {Object.values(row).map((data, i) => (
                  <Table.Cell key={i}>{data}</Table.Cell>
                ))}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
