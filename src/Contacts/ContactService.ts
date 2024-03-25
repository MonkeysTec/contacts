import { Contact } from './Contact';

export default class ContactService {
  private contacts: Contact[] = [];
  private baseUrl: string = 'http://localhost:3001/contacts';

  public async getAllContacts(): Promise<Contact[]> {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  public async addContact(contact: Contact): Promise<void> {
    await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
  }

  public async updateContact(contact: Contact): Promise<void> {
    await fetch(`${this.baseUrl}/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    this.contacts = await this.getAllContacts();
  }

  public async deleteContact(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  public get contactsList(): Contact[] {
    return this.contacts
  }
}