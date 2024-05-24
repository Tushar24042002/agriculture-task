import React from "react";
import { Table } from "@mantine/core";
import "./TableComponent.css";

const TableComponent = ({ caption, header, data }) => {
  const rows = data.map((rowData, index) => (
    <Table.Tr key={index}>
      {header.map((head, index) => {
        return <Table.Td key={index}>{rowData[head.key]}</Table.Td>;
      })}
    </Table.Tr>
  ));

  return (
    <div>
      <div className="caption">
        <h3> {caption}</h3>
      </div>
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            {header.map((head, index) => {
              return <Table.Th key={index}>{head.name}</Table.Th>;
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
