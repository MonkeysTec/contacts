import React, { useState } from 'react';
import Modal from 'react-modal';
import { Contact } from './Contact';
import ContactForm from './ContactForm';
import ContactService from './ContactService';
import { useContactProvider } from '../Hooks/ContactContext';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const contactService = new ContactService();

interface ContactListProps {
  contacts: Contact[];
  onUpdateContact: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onUpdateContact,
  onDeleteContact,
}) => {

  const { id, setId, name, setName, primaryPhone, setPrimaryPhone, mobilePhone, setMobilePhone, workPhone, setWorkPhone } = useContactProvider();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (contact: Contact) => {
    setId(contact.id);
    setName(contact.name);
    setPrimaryPhone(contact.primaryPhone);
    setMobilePhone(contact.mobilePhone);
    setWorkPhone(contact.workPhone);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleUpdate = () => {
    contactService.updateContact({ id, name, primaryPhone, mobilePhone, workPhone });
    closeModal();
  };

  return (
    <div>
      <h1>Lista de Contatos</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                  Name
              </TableCell>
              <TableCell>
                  Primary Phone
              </TableCell>
              <TableCell>
                  Mobile Phone
              </TableCell>
              <TableCell>
                  Work Phone
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.primaryPhone}</TableCell>
                <TableCell>{contact.mobilePhone}</TableCell>
                <TableCell>{contact.workPhone}</TableCell>
                <TableCell>
                  <Box >
                    <EditNoteOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => openModal(contact)} />
                    <DeleteOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => onDeleteContact(contact.id)} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div>
          <h2>Atualizar Contato</h2>
          <ContactForm
            initialValues={{ id, name, primaryPhone, mobilePhone, workPhone }}
            onSubmit={handleUpdate}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ContactList;