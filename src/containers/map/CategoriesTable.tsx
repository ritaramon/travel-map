import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import DeleteButton from "../../components/buttons/DeleteButton";
import ColorPicker from "../../components/others/ColorPicker";
import { Category } from "../../globalTypes";
import { AppState } from "../../state/reducers";
import * as actions from "../../state/actions";
import styled from "styled-components";

const CategoriesTable: React.FC = () => {
  const dispatch = useDispatch();
  const categories: Category[] = useSelector(
    (state: AppState) => state.categoriesData.categories
  );

  console.log(categories);
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
          id: category.id,
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
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any, index: number) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, index: number) => (
                <th key={index} {...column.getHeaderProps()}>
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
                    <td key={index} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

const Styles = styled.div`
  table {
    border-spacing: 0 16px;
    border-collapse: separate;
    width: 100%;
    tr {
      padding: 16px 0;
     border-radius: 25px
      }
    }
    th {
      text-transform: uppercase;
      font-weight: normal;
      letter-spacing: 2px;
    }
    th,
    td {
      padding: 8px;
      text-align: center;
    }
    td {
      background-color: #fff;
      font-weight: bold;
    }
  }
`;
export default CategoriesTable;
