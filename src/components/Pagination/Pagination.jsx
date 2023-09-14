import React from 'react';
import { Pagination, Button } from 'react-bootstrap';

const PaginationItem = ({ total, current, onChangePage }) => {
  let items = [];

  if (current > 1) {
    items.push(
      <Pagination.Prev
        key="prev"
        className="previous"
        onClick={() => onChangePage(current - 1)}
      />
    );
  }

  const startPage = current > 5 ? current - 4 : 1;
  const endPage = startPage + 4 > total ? total : startPage + 4;

  for (let page = startPage; page <= endPage; page++) {
    items.push(
      <Pagination.Item
        key={page}
        data-page={page}
        active={page === current}
        onClick={() => onChangePage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (current < total) {
    items.push(
      <Pagination.Next
        key="next"
        className="next"
        onClick={() =>  onChangePage(current + 1)}
      />
    );
  }

  return <Pagination className="itemperpage-box">{items}</Pagination>;
};

export default PaginationItem;

