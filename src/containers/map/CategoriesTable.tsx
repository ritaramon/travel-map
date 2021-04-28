import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import DeleteButton from "../../components/buttons/DeleteButton";
import ColorPicker from "../../components/others/ColorPicker";
import { Category } from "../../types";
import { actions } from "../../state/actions";
import styled from "styled-components";
import { AppState } from "../../state/reducers";

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
          col2: (
            <ColorPicker
              key={category.id}
              disableSelect
              defaultColor={category.color}
            />
          ),
          col3: (
            <DeleteButton
              onClick={() =>
                category.id
                  ? dispatch(
                      actions.categories.deleteCategoryRequest(category.id)
                    )
                  : null
              }
            />
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

  if (rows.length === 0)
    return <div>You don&apos;t have any categories at the moment.</div>;
  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(
            (
              headerGroup: {
                getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                headers: any[];
              },
              index: number
            ) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index: number) => (
                  <th key={index} {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            )
          )}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (
              row: {
                getRowProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                cells: any[];
              },
              index: number
            ) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell, index: number) => {
                    return (
                      <td key={index} {...cell.getCircleProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Styles>
  );
};

const Styles = styled.div`
  table {
    table-layout: fixed;
    border-spacing: 0;
    width: 100%;
    tbody tr:hover {
      background-color: #dfe2e2;
    }

    tr {
      padding: 16px 0;
      border-radius: 25px
      background-color: #fffff;
    }
    
    th {

      font-weight: normal;
      letter-spacing: 2px;
      
    }
    th,
    td {
      padding: 8px;
      text-align: center;
     
    }
    td {
     border-top: 1px solid #dfe2e2;
    }
    
  }
`;

export default CategoriesTable;
