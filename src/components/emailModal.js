import React from 'react';
import { Modal, Input, Button } from 'antd';

const { TextArea } = Input;

const EmailModal = ({
  isModalOpen,
  currentEmail,
  responses,
  newResponse,
  setNewResponse,
  handleAddResponse,
  handleSaveResponses,
  setIsModalOpen,
}) => {
  return (
    <Modal
      title="Editar correo"
      visible={isModalOpen}
      onOk={handleSaveResponses}
      onCancel={() => setIsModalOpen(false)}
      okText="Guardar"
      cancelText="Cancelar"
    >
      {currentEmail && (
        <>
          <p>
            <strong>Trabajador asignado:</strong> {currentEmail.assignedTo || 'No asignado'}
          </p>

          <p><strong>Respuestas anteriores:</strong></p>
          {responses.map((res, index) => (
            <div key={index}>
              <p>Respuesta {index + 1}: {res}</p>
            </div>
          ))}

          <TextArea
            rows={4}
            placeholder="Agregar nueva respuesta"
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            style={{ marginBottom: 10 }}
          />

          <Button type="dashed" onClick={handleAddResponse}>
            Agregar respuesta
          </Button>

          {/* Sección de Adjuntos */}
          <p><strong>Adjuntos:</strong></p>
          {currentEmail.attachments && currentEmail.attachments.length > 0 ? (
            <ul>
              {currentEmail.attachments.map((attachment, index) => (
                <li key={index}>
                  <a
                    href={`http://localhost:3001/download/${currentEmail.id}/${attachment.attachmentId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {attachment.filename}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay adjuntos</p>
          )}
        </>
      )}
    </Modal>
  );
};

export default EmailModal;
