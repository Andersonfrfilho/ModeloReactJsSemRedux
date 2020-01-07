import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Loading, Owner, RepositoryList } from './styles';
import Container from '../../components/Container';

export default class Home extends Component {
  // static PropTypes = {
  //  match: PropTypes.shape({
  //    params: PropTypes.shape({
  //      username: PropTypes.string,
  //    }),
  //  }).isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      repositoriy: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const username = decodeURIComponent(match.params.username);

    const response = await api.get(`/users/${username}`);
    const [user, repos] = await Promise.all([
      api.get(`/users/${username}`),
      api.get(`/users/${username}/repos`, {
        params: {
          per_page: 5,
        },
      }),
    ]);
    console.log(user);
    console.log(repos);
  }

  render() {
    const { user, repositoriy, loading } = this.state;
    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos usuários</Link>
          <img src={user.avatar_url} alt={user.name} />
          <h1>{user.name}</h1>
          <p>Falar algo</p>
        </Owner>
        <RepositoryList>
          {repositoriy.map((repo, index) => (
            <li key={index.toString()}>
              <img src={repo.owner.avatar_url} alt={repo.owner.name} />
              <div>
                <strong>
                  <a href={repo.html_url}>{repo.name}</a>
                  {repo.labels.map((label, indexLabel) => (
                    <span key={indexLabel.toString()}>{label.name}</span>
                  ))}
                </strong>
              </div>
            </li>
          ))}
        </RepositoryList>
      </Container>
    );
  }
}
