import React, { Component } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Contact {
  id?: string;
  name: string;
  number: string;
}

interface AppState {
  contacts: Contact[];
  filter: string;
}

export class App extends Component<{}, AppState> {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-122-562' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-893-121' },
      { id: 'id-3', name: 'Eden Clements', number: '645-178-791' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-919-264' },
    ],
    filter: '',
  };

  handlerInputData = ({ name, number }: Contact): void => {
    const validInput = this.state.contacts.some(function (element) {
      return (
        element.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        element.number.trim() === number.trim()
      );
    });

    const newName = name.slice(0).toLowerCase().trim();
    const newNumber = number.replace(/(\d{3})(?=\d)/g, '$1-');

    const newContact: Contact = { name: newName, number: newNumber };

    if (validInput) {
      toast.warn(`${name}: is already in contacts `, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      this.setState(prevState => {
        return {
          contacts: [newContact, ...prevState.contacts],
        };
      });

      toast.success(`${name}: add to contact`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  handlerFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ filter: event.currentTarget.value.toLowerCase().trim() });
  };

  visibleContacts = (): Contact[] => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  removeContact = (id: string): void => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });

    toast.info('Delete contact success', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  render() {
    const { filter } = this.state;
    const createContactList = this.visibleContacts();
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.handlerInputData} />
        </Section>
        <Section title="Contacts">
          <Filter
            title="Find contacts by name"
            value={filter}
            onChange={this.handlerFilterChange}
          />
          <ToastContainer />
          <ContactList
            createList={createContactList}
            onDelete={this.removeContact}
          />
        </Section>
      </>
    );
  }
}
