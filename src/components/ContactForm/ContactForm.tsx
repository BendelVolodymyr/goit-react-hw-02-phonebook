import { FaUserPlus } from 'react-icons/fa';
import { Contact } from 'components/App';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';

interface ContactFormState {
  id: string;
  name: string;
  number: string;
}

interface ContactFormProps {
  onSubmit: (data: Contact) => void;
}

class ContactForm extends Component<ContactFormProps, ContactFormState> {
  state = {
    id: '',
    name: '',
    number: '',
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;
    this.setState({
      id: nanoid(),
      [name]: name === 'number' ? value.replace(/\D/g, '') : value,
    } as Pick<ContactFormState, keyof ContactFormState>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  render() {
    return (
      <form className="form__box" onSubmit={this.handleSubmit}>
        <label className="form__box-label">
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handlerInputChange}
            placeholder="Name contact"
            required
          />
        </label>
        <label className="form__box-label">
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handlerInputChange}
            placeholder="Phone number"
            required
          />
        </label>
        <button className="form__box-button" type="submit">
          Add User
          <FaUserPlus />
        </button>
      </form>
    );
  }
}

export default ContactForm;
