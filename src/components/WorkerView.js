import React, { useEffect, useState } from 'react';
import EmailTable from './emailTable';
import { getWorkerEmails  } from '../services/emailService';
import { Typography, Col, Row } from 'antd';
import LogoutButton from './LogoutButton';

const { Title } = Typography;

const WorkerView = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchWorkerEmails = async () => {
      try {
        const response = await getWorkerEmails(); // Método para obtener correos del trabajador
        setEmails(response);
      } catch (error) {
        console.error("Error fetching worker emails", error);
      }
    };

    fetchWorkerEmails();
  }, []);

  return (
    <div style={{ padding: '5px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={1} style={{ textTransform: 'uppercase', textAlign: 'left' }}>Mis Correos</Title>
        </Col>
        <Col>
          <LogoutButton />
        </Col>
      </Row>
      <EmailTable emails={emails} />
    </div>
  );
};

export default WorkerView;
