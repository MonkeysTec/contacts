import React, { createContext, useContext, useState } from "react";
import { Contact } from "../Contacts/Contact";

export type ContactContextType = {
  id: number;
  name: string;
  primaryPhone: string;
  mobilePhone: string;
  workPhone: string;
  setId: (newState: number) => void;
  setName: (newState: string) => void;
  setPrimaryPhone: (newState: string) => void;
  setMobilePhone: (newState: string) => void;
  setWorkPhone: (newState: string) => void;

  contacts: Contact[];
  setContacts: (newState: Contact[]) => void;
};

export const ContactContext = createContext<ContactContextType | null>(null);

export const ContactProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [primaryPhone, setPrimaryPhone] = useState<string>("");
  const [mobilePhone, setMobilePhone] = useState<string>("");
  const [workPhone, setWorkPhone] = useState<string>("");

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
    setContacts
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