import React, { useState } from 'react';
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
  const { name, setName, primaryPhone, edit, setPrimaryPhone, mobilePhone, setMobilePhone, workPhone, setWorkPhone, idEdit, setIdEdit } = useContactProvider();
  const [primaryPhoneError, setPrimaryPhoneError] = useState('');
  const [mobilePhoneError, setMobilePhoneError] = useState('');
  const [workPhoneError, setWorkPhoneError] = useState('');

  const handlePrimaryPhoneChange = (value: string) => {
    setPrimaryPhone(value);

    // Verificar se o número de caracteres é maior ou igual a 11
    if (value.length >= 11) {
      setPrimaryPhoneError('');
    } else {
      setPrimaryPhoneError(`O número de telefone principal deve ter pelo menos 11 caracteres.`);
    }
  };

  const handleMobilePhoneChange = (value: string) => {
    setMobilePhone(value);

    // Verificar se o número de caracteres é maior ou igual a 11
    if (value.length >= 11) {
      setMobilePhoneError('');
    } else {
      setMobilePhoneError(`O número de telefone celular deve ter pelo menos 11 caracteres.`);
    }
  };

  const handleWorkPhoneChange = (value: string) => {
    setWorkPhone(value);

    // Verificar se o número de caracteres é maior ou igual a 11
    if (value.length >= 11) {
      setWorkPhoneError('');
    } else {
      setWorkPhoneError(`O número de telefone de trabalho deve ter pelo menos 11 caracteres.`);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Verificar se todos os campos de telefone contêm pelo menos 11 caracteres
    if (primaryPhone.length < 11 || mobilePhone.length < 11 || workPhone.length < 11) {
      // Se algum campo não estiver válido, exibir erro e interromper submissão
      if (primaryPhone.length < 11) {
        setPrimaryPhoneError(`O número de telefone principal deve ter pelo menos 11 caracteres.`);
      }
      if (mobilePhone.length < 11) {
        setMobilePhoneError(`O número de telefone celular deve ter pelo menos 11 caracteres.`);
      }
      if (workPhone.length < 11) {
        setWorkPhoneError(`O número de telefone de trabalho deve ter pelo menos 11 caracteres.`);
      }
      return;
    }

    // Se todos os campos estiverem válidos, continue com a submissão
    const newContact: Contact = {
      id: edit ? idEdit : `${Date.now()}`,
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
    setIdEdit('');
  };

  return (
    <Box>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={name} id="outlined-basic" label="Nome" variant="outlined" onChange={e => setName(e.target.value)} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={primaryPhone} id="outlined-basic" label="Telefone Principal" variant="outlined" onChange={e => handlePrimaryPhoneChange(e.target.value)} error={!!primaryPhoneError} helperText={primaryPhoneError} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={mobilePhone} id="outlined-basic" label="Telefone Celular" variant="outlined" onChange={e => handleMobilePhoneChange(e.target.value)} error={!!mobilePhoneError} helperText={mobilePhoneError} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField value={workPhone} id="outlined-basic" label="Telefone de trabalho" variant="outlined" onChange={e => handleWorkPhoneChange(e.target.value)} error={!!workPhoneError} helperText={workPhoneError} />
        </Box>
        {edit ? (
          <Button sx={{height:58}} color="success" type="submit" variant="outlined">Editar contato</Button>
        ) : (
          <Button  sx={{height:58}} color="success" type="submit" variant="outlined">Salvar contato</Button>
        )}
      </form>
    </Box>
  );
};

export default ContactForm;
