import { useState, useEffect, useMount } from "react";
import PropTypes from "prop-types";
import PhonebookForm from "./PhonebookForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { Container } from "./App.styled";

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromLocalStorage = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contactsFromLocalStorage);
    if (parsedContacts) {
      setContacts(parsedContacts)
    }
  },[])

  // componentDidMount() {
  //   const contactsFromLocalStorage = localStorage.getItem("contacts");
  //   const parsedContacts = JSON.parse(contactsFromLocalStorage);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts])
  
  // componentDidUpdate(prevProps, prevState) {
  //   const prevContacts = prevState.contacts;
  //   const currentContacts = this.state.contacts;
  //   if (prevContacts !== currentContacts) {
  //     localStorage.setItem("contacts", JSON.stringify(currentContacts))
  // }
  // }

  const addContact = (newContact) => {
    const contactsNames = contacts.map(contact => contact.name);
    console.log(contactsNames);

    if (contactsNames.includes(newContact.name)) {
      alert(`${newContact.name} is already in contacts`)
    } else {
      setContacts(prev => [newContact,...contacts])
    }
  }

  // addContact = (newContact) => {
  //   const contactsNames = this.state.contacts.map(contact => contact.name);
  //   console.log(contactsNames)

  //   if (contactsNames.includes(newContact.name)) {
  //     alert(`${newContact.name} is already in contacts`)
  //   } else {
  //     this.setState(({ contacts}) => ({contacts: [newContact,...contacts]}))
  //   }
    
  // }

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id))
  }
  // deleteContact = (id) => {
  //   this.setState(prevState => ({contacts: prevState.contacts.filter(contact => contact.id !== id)}))
  // }

  const handleFilter = e => {
   setFilter(e.currentTarget.value)
  }

  // handleFilter = e => {
  //   this.setState({ filter: e.currentTarget.value });
  // }


  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  // getFilteredContacts = () => {
  //   const { contacts, filter } = this.state;
  //   const normalizedFilter = filter.toLowerCase();
  //   return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  // }

 
    const filteredContacts = getFilteredContacts();
  
    return (
    <Container>
      <h1>Phonebook</h1>
      <PhonebookForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilter}  />
      <ContactList value={filteredContacts} onDeleteContact={deleteContact} />
    </Container>
    );
  
};

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string
}
