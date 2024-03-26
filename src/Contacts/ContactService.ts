import { Contact } from './Contact';

export default class ContactService {
  private contacts: Contact[] = [];
  private baseUrl: string = 'http://localhost:3001/contacts';

  public async getAllContacts(name?:string): Promise<Contact[]> {
    if(name!==undefined ||name===''){
      const response = await fetch(`${this.baseUrl}?name=${name}`);
    return await response.json();
    }else{
      const response = await fetch(`${this.baseUrl}?&_sort=name`);
    return await response.json();
    }
    
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

  public async updateContact(contact: Contact,id:string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
  
      // Atualize a lista de contatos após a edição bem-sucedida
      this.contacts = await this.getAllContacts();
    } catch (error) {
      console.error('Erro ao atualizar o contato:', error);
      throw error; // Você pode lidar com o erro de outra forma, se necessário
    }
  }
  

  public async deleteContact(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  public get contactsList(): Contact[] {
    return this.contacts
  }
}