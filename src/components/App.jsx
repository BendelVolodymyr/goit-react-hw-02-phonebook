import React, { Component } from 'react';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyOptions = {
  position: 'top-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handlerInputData = data => {
    const { name, number } = data;
    const validInput = this.state.contacts.some(function (element) {
      return (
        element.name.toLowerCase().trim() === name.toLowerCase().trim() ||
        element.number.trim() === number.trim()
      );
    });

    return validInput
      ? toast.info(`${name}: is already in contacts `, notifyOptions)
      : this.setState(prevState => {
          return {
            contacts: [data, ...prevState.contacts],
          };
        });
  };

  handlerFilterChange = event => {
    this.setState({ filter: event.currentTarget.value.toLowerCase().trim() });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
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
