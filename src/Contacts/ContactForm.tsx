import React from 'react';
import { Contact } from './Contact';
import { useContactProvider } from '../Hooks/ContactContext';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface ContactFormProps {
  initialValues: Contact;
  onSubmit: (contact: Contact) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialValues, onSubmit }) => {
  const { name, setName, primaryPhone, setPrimaryPhone, mobilePhone, setMobilePhone, workPhone, setWorkPhone } = useContactProvider();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContact: Contact = {
      id: `${Date.now()}`,
      name,
      primaryPhone,
      mobilePhone,
      workPhone,
    };
    onSubmit(newContact);
    setName('');
    setPrimaryPhone('');
    setMobilePhone('');
    setWorkPhone('');
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={name} id="outlined-basic" label="Nome" variant="outlined" onChange={e => setName(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={primaryPhone} id="outlined-basic" label="Telefone Principal" variant="outlined" onChange={e => setPrimaryPhone(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={mobilePhone} id="outlined-basic" label="Telefone Celular" variant="outlined" onChange={e => setMobilePhone(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={workPhone} id="outlined-basic" label="Telefone de trabalho" variant="outlined" onChange={e => setWorkPhone(e.target.value)} />
        </Box>
        <Button color="success" type="submit" variant="outlined">Salvar Contato</Button>
      </form>
    </Box>
  );
};

export default ContactForm;