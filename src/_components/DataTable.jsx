import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const StyledTable = styled.table`
  width: 100%;
  background: var(--component-background);
  border-radius: var(--default-radi);
  box-shadow: var(--default-box-shadow);
  overflow: hidden;
  border-collapse: collapse;
  border-spacing: 0;

  thead {
    background: var(--colorPrimaryDark);
    color: #fff;
  }

  th,
  td {
    text-align: left;
    padding: 1rem;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: var(--body);
  }

  tbody {
      tr:not(:last-child) {
          border-bottom: 1px solid #ccc;
      }
  }
`;

const Cell = ({ content, header }) =>
    header ? <th>{content}</th> : <td>{content}</td>;

const theadMarkUp = cols => (
    <tr>
        {cols.map((col, index) => (
            <Cell key={"Header " + index} content={col.title} header={true} />
        ))}
    </tr>
);

const tbodyMarkUp = (data, cols) =>
    data.map((item, index) => (
        <tr key={index}>
            {cols.map((col, index) => (
                <Cell key={"Data " + index} content={col.render(item)} />
            ))}
        </tr>
    ));

const DataTable = ({ data, cols }) => (
    <StyledTable>
        <thead>{theadMarkUp(cols)}</thead>
        <tbody>{tbodyMarkUp(data, cols)}</tbody>
    </StyledTable>
);

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    cols: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            render: PropTypes.func.isRequired
        })
    ).isRequired,
}

export default DataTable;
