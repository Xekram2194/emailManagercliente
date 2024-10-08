import React, { useEffect, useState } from 'react';
import { Typography, Row, Col } from 'antd';
import EmailTable from './emailTable'; // Asegúrate de que la ruta de importación sea correcta
import EmailModal from './emailModal';
import FilterSelect from './filterSelect';
import { getEmails, assignEmail } from '../services/emailService'; // Servicio para obtener los correos
import LogoutButton from './LogoutButton';

const { Title } = Typography;

const AdminView = () => {
  const [emails, setEmails] = useState([]);
  const [filter, setFilter] = useState('no leidos');
  const [updatedEmails, setUpdatedEmails] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [newResponse, setNewResponse] = useState('');
  const [responses, setResponses] = useState([]);
  const workers = ["Trabajador 1", "Trabajador 2", "Trabajador 3"];

  // Obtener el nombre del usuario desde el localStorage
  const username = localStorage.getItem('role') === 'admin' ? 'Administrador' : 'Trabajador';

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const emailsData = await getEmails();
        setEmails(emailsData);
        setUpdatedEmails(emailsData);
      } catch (error) {
        console.error("Error fetching emails", error);
      }
    };
    fetchEmails();
  }, []);

  const handleFilterChange = (value) => setFilter(value);

  const handleAssign = async (emailId) => {
    const workerName = selectedWorker[emailId];
    if (!workerName) return alert("Selecciona un trabajador antes de asignar");

    try {
      await assignEmail(emailId, workerName); // Asegúrate de que esto envíe la asignación al backend
      setUpdatedEmails(prevEmails =>
        prevEmails.map(email =>
          email.id === emailId ? { ...email, assignedTo: workerName } : email
        )
      );
    } catch (error) {
      console.error("Error assigning email", error);
    }
  };

  const handleStatusChange = (id, value) => {
    setUpdatedEmails(prevEmails =>
      prevEmails.map(email => (email.id === id ? { ...email, status: value } : email))
    );
  };

  const handleEditClick = (email) => {
    setCurrentEmail(email);
    setNewResponse('');
    setResponses(email.responses || []);
    setIsModalOpen(true);
  };

  const handleAddResponse = () => {
    if (!newResponse) return;
    setResponses([...responses, newResponse]);
    setNewResponse('');
  };

  const handleSaveResponses = () => {
    setUpdatedEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === currentEmail.id ? { ...email, responses } : email
      )
    );
    setIsModalOpen(false);
  };

  const filteredEmails = updatedEmails.filter(email =>
    filter === 'leidos' ? email.isRead : !email.isRead
  );

  return (
    <div style={{ padding: '5px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={1} style={{ textTransform: 'uppercase', textAlign: 'left' }}>Gestor de Correos</Title>
        </Col>
        <Col>
          <span style={{ marginRight: '10px' }}>{username}</span>
          <LogoutButton />
        </Col>
      </Row>
      <FilterSelect filter={filter} handleFilterChange={handleFilterChange} />
      <EmailTable
        emails={filteredEmails}
        handleEditClick={handleEditClick}
        handleAssign={handleAssign}
        handleStatusChange={handleStatusChange}
        workers={workers}
        setSelectedWorker={setSelectedWorker}
      />
      <EmailModal
        isModalOpen={isModalOpen}
        currentEmail={currentEmail}
        responses={responses}
        newResponse={newResponse}
        setNewResponse={setNewResponse}
        handleAddResponse={handleAddResponse}
        handleSaveResponses={handleSaveResponses}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default AdminView;
