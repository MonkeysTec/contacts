import React, { useEffect, useState } from 'react';
import ContactList from './Contacts/ContactList';
import ContactForm from './Contacts/ContactForm';
import ContactService from './Contacts/ContactService';
import { Contact } from './Contacts/Contact';
import { useContactProvider } from './Hooks/ContactContext';
import { Autocomplete, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const contactService = new ContactService();

const App: React.FC = () => {

  const { contacts, setContacts } = useContactProvider();
  const [selectedContact, setSelectedContact] = useState<Contact>();

  const { id, setId, name, setName, primaryPhone, setPrimaryPhone, mobilePhone, setMobilePhone, workPhone, setWorkPhone } = useContactProvider();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchContacts() {
      const allContacts = await contactService.getAllContacts();
      setContacts(allContacts);
    }
    fetchContacts();
  }, [setContacts]);

  const initialFormValues: Contact = {
    id: "",
    name: "",
    primaryPhone: "",
    workPhone: "",
    mobilePhone: "",
  };

  const handleAddContact = async (contact: Contact) => {
    await contactService.addContact(contact);
    setContacts(await contactService.getAllContacts());
  };

  const handleUpdateContact = async (contact: Contact) => {
    await contactService.updateContact(contact);
    setContacts(await contactService.getAllContacts());
  };

  const handleDeleteContact = async (id: string) => {
    await contactService.deleteContact(id);
    setContacts(await contactService.getAllContacts());
  };

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

  function setSelectedValue(newValue: string | null) {
    throw new Error('Function not implemented.');
  }

  return (
    <Box sx={{ paddingTop: 2, paddingX: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Contatos</h1>
        <Button type="submit" color="secondary" sx={{ height: 50, marginTop: 2 }} variant="outlined">Importar contatos</Button>
      </Box>
      <Autocomplete
        disablePortal
        id="combo-box"
        options={contacts.map((contact: Contact) => contact.name)}
        sx={{ width: '100%', marginBottom: 4 }}
        onChange={(event, newValue) => {
          setSelectedValue(newValue);
        }}
        renderInput={
          (params) =>
            <TextField
              {...params}
              label="Pesquise um contato"
            />
        }
      />
      {selectedContact &&
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
                <TableRow key={selectedContact.id}>
                  <TableCell>{selectedContact.name}</TableCell>
                  <TableCell>{selectedContact.primaryPhone}</TableCell>
                  <TableCell>{selectedContact.mobilePhone}</TableCell>
                  <TableCell>{selectedContact.workPhone}</TableCell>
                  <TableCell>
                    <EditNoteOutlinedIcon onClick={() => openModal(selectedContact)} />
                    <DeleteOutlinedIcon onClick={() => handleDeleteContact(selectedContact.id)} />
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
      <h3>Adicionar contato</h3>
      <ContactForm onSubmit={handleAddContact} initialValues={initialFormValues} />
      {contacts &&
        <ContactList
          contacts={contacts}
          onUpdateContact={handleUpdateContact}
          onDeleteContact={handleDeleteContact}
        />
      }
    </Box>
  );
};

export default App;