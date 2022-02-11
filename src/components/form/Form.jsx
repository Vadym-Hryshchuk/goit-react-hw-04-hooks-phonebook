import { useState } from 'react';
import { customAlphabet } from 'nanoid';
import PropTypes from 'prop-types';
import { ContactForm } from '../form/Form.styled';

const nanoid = customAlphabet('1234567890abcdef', 6);

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({
      id: nanoid(),
      name,
      number,
    });
    setName('');
    setNumber('');
  };

  return (
    <ContactForm onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          autoComplete="off"
          placeholder="Name"
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          type="tell"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="off"
          placeholder="Number"
          onChange={handleChange}
        />
      </label>
      <button type="submit"> Add contact 💬</button>
    </ContactForm>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
