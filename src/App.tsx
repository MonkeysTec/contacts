import React, { useEffect, useState } from 'react';
import ContactList from './Contacts/ContactList';
import ContactForm from './Contacts/ContactForm';
import ContactService from './Contacts/ContactService';
import { Contact } from './Contacts/Contact';
import { useContactProvider } from './Hooks/ContactContext';
import { Autocomplete, Box, TextField } from '@mui/material';

const contactService = new ContactService();

const App: React.FC = () => {

  const { contacts, setContacts } = useContactProvider();
  const [selectedContact, setSelectedContact] = useState<Contact>();

  useEffect(() => {
    async function fetchContacts() {
      const allContacts = await contactService.getAllContacts();
      setContacts(allContacts);
    }
    fetchContacts();
  }, [setContacts]);

  const [orderBy, setOrderBy] = React.useState<keyof Contact>(Object.keys(contacts[0])[0] as keyof Contact);
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');

  const initialFormValues: Contact = {
    id: 0,
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
  
  const handleDeleteContact = async (id: number) => {
    await contactService.deleteContact(id);
    setContacts(await contactService.getAllContacts());
  };

  const handleSortRequest = (orderBy: keyof Contact) => {
    setOrderBy(orderBy);
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Box sx={{ paddingTop: 2, paddingX: 4 }}>
      <h1>Contatos</h1>
      <Autocomplete
        disablePortal
        id="combo-box"
        options={contacts.map((contact: Contact) => contact.name)}
        sx={{ width: '100%', marginBottom: 4 }}
        renderInput={
          (params) => 
            <TextField 
              {...params} 
              label="Pesquise um contato" 
            />
          }
      />
      <h3>Adicionar contato</h3>
      <ContactForm onSubmit={handleAddContact} initialValues={initialFormValues} />
      {contacts && 
        <ContactList
          contacts={contacts}
          onUpdateContact={handleUpdateContact}
          onDeleteContact={handleDeleteContact}
          onSort={handleSortRequest}
          orderBy={orderBy}
          order={order}
        />
      }
    </Box>
  );
};

export default App;