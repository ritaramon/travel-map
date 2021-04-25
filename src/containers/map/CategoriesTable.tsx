import { LeafletEvent } from "leaflet";
import React from "react";
import { Circle } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import DeleteButton from "../../components/buttons/DeleteButton";
import ColorPicker from "../../components/others/ColorPicker";
import { Category, CellData } from "../../globalTypes";
import { setSelectedCircleId } from "../../state/actions";
import { AppState } from "../../state/reducers";

// interface Props {
//   element: CellData;
//   isSelected: boolean;
// }

const CategoriesTable: React.FC = () => {
  const categories: Category[] = useSelector(
    (state: AppState) => state.categoriesData.categories
  );

  const data = React.useMemo(
    () =>
      categories.map((x) => {
        return {
          col1: x.name,
          col2: <ColorPicker disableSelect defaultColor={x.color} />,
          col3: <DeleteButton>delete</DeleteButton>,
        };
      }),
    [categories]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Category",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Color",
        accessor: "col2",
      },
      {
        Header: "",
        accessor: "col3",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup: any, index: any) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, index: any) => (
              <th
                key={index}
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any, index: any) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell: any, index: any) => {
                return (
                  <td
                    key={index}
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
