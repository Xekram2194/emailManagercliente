import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const WorkerSelect = ({ workers, handleAssign }) => (
  <Select defaultValue="Seleccionar trabajador" style={{ width: 200 }} onChange={handleAssign}>
    {workers.map((worker) => (
      <Option key={worker} value={worker}>
        {worker}
      </Option>
    ))}
  </Select>
);

export default WorkerSelect;
