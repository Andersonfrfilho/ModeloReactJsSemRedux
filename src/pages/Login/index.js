import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, SubmitButton, List } from './styles';
import api from '../../services/api';
import Container from '../../components/Container';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: '',
      users: [],
      loading: false,
    };
  }

  componentDidMount() {
    const users = localStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleInputChange = e => {
    this.setState({ newUser: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { newUser, users } = this.state;

    const response = await api.get(`/users/${newUser}`);

    const data = { username: response.data.login, name: response.data.name };
    this.setState({ users: [...users, data], newUser: '' });
    this.setState({ loading: false });
  };

  render() {
    const { newUser, loading, users } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Main
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Usuario"
            value={newUser}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {users.map((user, index) => (
            <li key={index.toString()}>
              <span>{user.name}</span>
              <Link to={`/Home/${encodeURIComponent(user.username)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
