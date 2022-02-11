import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import defaultContacts from '../defaultContacts.json';
import Form from '../components/form/Form';
import ContactsList from '../components/contactsList/ContactsList';
import SearchFilter from '../components/searchFilter/SearchFilter';
import { Container, Title, Header } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(defaultContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContact = JSON.parse(window.localStorage.getItem('contacts'));
    if (parsedContact) {
      setContacts(parsedContact);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const addContactToList = contact => {
    if (
      contacts.some(
        value => value.name.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      toast.error(`${contact.name} is already in the contact list`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, contact]);
    toast.success(`${contact.name} added to contact list`);
  };

  const filterContacts = () => {
    const filterValueToLowerCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValueToLowerCase),
    );
  };

  const removeContact = ({ id, name }) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id),
    );
    toast.success(`${name} has been removed from the contact list`);
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <Form onSubmit={addContactToList} />
      <Header>Contacts</Header>
      <SearchFilter value={filter} filterChange={filterChange} />
      <ContactsList
        filterContacts={filterContacts()}
        removeContact={removeContact}
      />
      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontFamily: 'sans-serif',
          },
        }}
      />
    </Container>
  );
}
