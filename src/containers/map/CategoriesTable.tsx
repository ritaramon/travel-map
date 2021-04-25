import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import DeleteButton from "../../components/buttons/DeleteButton";
import ColorPicker from "../../components/others/ColorPicker";
import { Category } from "../../globalTypes";
import { AppState } from "../../state/reducers";
import * as actions from "../../state/actions";

const CategoriesTable: React.FC = () => {
  const dispatch = useDispatch();
  const categories: Category[] = useSelector(
    (state: AppState) => state.categoriesData.categories
  );

  const data = React.useMemo(
    () =>
      categories.map((category) => {
        return {
          col1: category.name,
          col2: <ColorPicker disableSelect defaultColor={category.color} />,
          col3: (
            <DeleteButton
              onClick={() =>
                category.id
                  ? dispatch(actions.deleteCategoryRequest(category.id))
                  : null
              }
            >
              delete
            </DeleteButton>
          ),
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
        {headerGroups.map((headerGroup: any, index: number) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, index: number) => (
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
        {rows.map((row: any, index: number) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell: any, index: number) => {
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
