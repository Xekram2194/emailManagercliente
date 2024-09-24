import React, { useEffect, useState } from 'react';
import EmailTable from './emailTable';
import { getEmailsForWorker } from '../services/emailService';
import { Typography } from 'antd';

const { Title } = Typography;

const WorkerView = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const workerName = localStorage.getItem('username'); // Obtener el nombre del trabajador desde el localStorage
                const data = await getEmailsForWorker(workerName);
                setEmails(data);
            } catch (error) {
                console.error("Error fetching emails for worker", error);
            }
        };
        fetchEmails();
    }, []);

    return (
        <div>
            <Title level={2}>Correos Asignados</Title>
            <EmailTable emails={emails} />
        </div>
    );
};

export default WorkerView;
