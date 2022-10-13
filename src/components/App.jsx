import { Component } from "react";
import PropTypes from "prop-types";
import PhonebookForm from "./PhonebookForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { Container } from "./App.styled";

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contactsFromLocalStorage);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const currentContacts = this.state.contacts;
    if (prevContacts !== currentContacts) {
      localStorage.setItem("contacts", JSON.stringify(currentContacts))
  }

  }

  addContact = (newContact) => {
    const contactsNames = this.state.contacts.map(contact => contact.name);
    console.log(contactsNames)

    if (contactsNames.includes(newContact.name)) {
      alert(`${newContact.name} is already in contacts`)
    } else {
      this.setState(({ contacts}) => ({contacts: [newContact,...contacts]}))
    }
    
  }

  deleteContact = (id) => {
    this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== id)}))
  }

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  render() {
    const filteredContacts = this.getFilteredContacts();
  
    return (
    <Container>
      <h1>Phonebook</h1>
      <PhonebookForm onAddContact={this.addContact} />
      <h2>Contacts</h2>
      <Filter value={ this.state.filter} onChange={this.handleFilter}  />
      <ContactList value={filteredContacts} onDeleteContact={this.deleteContact} />
    </Container>
    );
  }
};

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string
}
