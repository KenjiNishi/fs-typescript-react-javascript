import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Sances-DevTest</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Lista de Pedidos</Link>
          </li>
          <li className="navbar-item">
          <Link to="/new-order" className="nav-link">Novo Pedido</Link>
          </li>
          <li className="navbar-item">
          <Link to="/produtos" className="nav-link">Lista de Produtos</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}