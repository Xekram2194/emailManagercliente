import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const FilterSelect = ({ filter, handleFilterChange }) => (
  <Select defaultValue={filter} style={{ width: 200, marginBottom: '20px' }} onChange={handleFilterChange}>
    <Option value="leidos">Leídos</Option>
    <Option value="no leidos">No leídos</Option>
  </Select>
);

export default FilterSelect;
