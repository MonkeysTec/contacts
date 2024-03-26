import React, { createContext, useContext, useState } from "react";
import { Contact } from "../Contacts/Contact";

export type ContactContextType = {
  id: string;
  name: string;
  primaryPhone: string;
  mobilePhone: string;
  workPhone: string;
  setId: (newState: string) => void;
  setName: (newState: string) => void;
  setPrimaryPhone: (newState: string) => void;
  setMobilePhone: (newState: string) => void;
  setWorkPhone: (newState: string) => void;
    edit:boolean,
    setEdit:(newState:boolean)=>void;
    idEdit:string,
    setIdEdit:(newState:string)=>void;
  contacts: Contact[];
  setContacts: (newState: Contact[]) => void;
};

export const ContactContext = createContext<ContactContextType | null>(null);

export const ContactProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [primaryPhone, setPrimaryPhone] = useState<string>("");
  const [mobilePhone, setMobilePhone] = useState<string>("");
  const [workPhone, setWorkPhone] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState('');



  const [contacts, setContacts] = useState<Contact[]>([]);

  const contextValue: ContactContextType = {
    id,
    setId,
    name,
    setName,
    primaryPhone,
    setPrimaryPhone,
    mobilePhone,
    setMobilePhone,
    workPhone,
    setWorkPhone,
    contacts,
    setContacts,
    edit,
    setEdit,
    idEdit,
    setIdEdit
  };

  return (
    <ContactContext.Provider value={contextValue}>{children}</ContactContext.Provider>
  );
};

export const useContactProvider = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("ContactProvider must be used within a ContactProvider");
  }
  return context;
};