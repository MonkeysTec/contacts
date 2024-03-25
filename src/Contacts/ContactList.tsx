import React, { useState } from 'react';
import Modal from 'react-modal';
import { Contact } from './Contact';
import ContactForm from './ContactForm';
import ContactService from './ContactService';
import { useContactProvider } from '../Hooks/ContactContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

const contactService = new ContactService();

interface ContactListProps {
  contacts: Contact[];
  onUpdateContact: (contact: Contact) => void;
  onDeleteContact: (id: number) => void;
  onSort: (orderBy: keyof Contact) => void;
  orderBy?: keyof Contact;
  order: 'asc' | 'desc';
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onUpdateContact,
  onDeleteContact,
  onSort,
  orderBy,
  order,
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

  const handleSortRequest = (property: keyof Contact) => {
    onSort(property);
  };

  const createSortHandler = (property: keyof Contact) => (event: React.MouseEvent<unknown>) => {
    handleSortRequest(property);
  };

  return (
    <div>
      <h1>Lista de Contatos</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={createSortHandler('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'primaryPhone'}
                  direction={orderBy === 'primaryPhone' ? order : 'asc'}
                  onClick={createSortHandler('primaryPhone')}
                >
                  Primary Phone
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'mobilePhone'}
                  direction={orderBy === 'mobilePhone' ? order : 'asc'}
                  onClick={createSortHandler('mobilePhone')}
                >
                  Mobile Phone
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'workPhone'}
                  direction={orderBy === 'workPhone' ? order : 'asc'}
                  onClick={createSortHandler('workPhone')}
                >
                  Work Phone
                </TableSortLabel>
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
                  <button onClick={() => openModal(contact)}>Atualizar</button>
                  <button onClick={() => onDeleteContact(contact.id)}>Excluir</button>
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