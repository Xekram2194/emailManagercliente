import React from 'react';
import { Table, Button, Select } from 'antd';

const { Option } = Select;

const EmailTable = ({ emails, handleEditClick, handleAssign, handleStatusChange, workers, setSelectedWorker }) => {
  const columns = [
    { title: 'From', dataIndex: 'from', key: 'from', width:'20%' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' , width:'20%' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          defaultValue={record.status || 'Pendiente'}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Option value="Pendiente">Pendiente</Option>
          <Option value="Observado">Observado</Option>
          <Option value="Atendido">Atendido</Option>
          <Option value="Urgente">Urgente</Option>
          <Option value="Conocimiento">Conocimiento</Option>
        </Select>
      ),
    },
    {
      title: 'Asignar a',
      key: 'assign',
      render: (text, record) => (
        <div>
          <Select
            defaultValue={record.assignedTo || 'Seleccionar'}
            style={{ width: 150, marginRight: 10 }}
            onChange={(value) => setSelectedWorker((prev) => ({ ...prev, [record.id]: value }))}
          >
            {workers.map((worker) => (
              <Option key={worker} value={worker}>
                {worker}
              </Option>
            ))}
          </Select>

          <Button type="primary" onClick={() => handleAssign(record.id)}>
            Asignar
          </Button>
        </div>
      ),
    },
    {
      title: 'Asignado a',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (text) => <span>{text || 'No asignado'}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => handleEditClick(record)}>
          Editar
        </Button>
      ),
    },
  ];

  return <Table dataSource={emails} columns={columns} rowKey="id" pagination={false} />;
};

export default EmailTable;
