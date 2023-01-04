import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

class TransactionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      budget: 1000,
    };
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    fetch('/api/transactions/')
      .then(response => response.json())
      .then(data => this.setState({ transactions: data }));
  }

  getMemberBalances() {
    const balances = {};
    this.state.transactions.forEach(transaction => {
      const share = transaction.amount / transaction.members.length;
      transaction.members.forEach(member => {
        if (!(member.id in balances)) {
          balances[member.id] = 0;
        }
        balances[member.id] += share;
      });
    });
    return balances;
  }

  render() {
    const totalSpent = this.state.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const budgetRemaining = this.state.budget - totalSpent;
    const memberBalances = this.getMemberBalances();

    return (
      <div>
        <p>Total spent: {totalSpent}</p>
        <p>Budget remaining: {budgetRemaining}</p>
        <Form inline>
          <FormControl type="date" placeholder="Start date" />
          <FormControl type="date" placeholder="End date" />
          <FormControl as="select">
            <option>All categories</option>
            {/* options for categories will go here */}
          </FormControl>
          <Button type="submit">Filter</Button>
        </Form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Members</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>{transaction.category.name}</td>
                <td>
                  {transaction.members.map(member => (
                    <p key={member.id}>
                      {member.username}: {memberBalances[member.id]}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class CreateTransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {       name: '',
    amount: 0,
    date: '',
    category: '',
    members: [],
  };
}

handleChange(event) {
  this.setState({ [event.target.name]: event.target.value });
}

handleSubmit(event) {
  event.preventDefault();
  fetch('/api/transactions/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.state),
  });
}

render() {
  return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={this.state.category}
          onChange={this.handleChange}
        >
          {/* options for categories will go here */}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formMembers">
        <Form.Label>Members</Form.Label>
        <Form.Control
          as="select"
          multiple
          name="members"
          value={this.state.members}
          onChange={this.handleChange}
        >
          {/* options for members will go here */}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
}
}

class UpdateTransactionForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        amount: 0,
        date: '',
        category: '',
        members: [],
      };
    }
  
    componentDidMount() {
      this.fetchTransaction();
    }
  
    fetchTransaction() {
      fetch(`/api/transactions/${this.props.transactionId}/`)
        .then(response => response.json())
        .then(data => this.setState(data));
    }
  
    handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    handleSubmit(event) {
      event.preventDefault();
      fetch(`/api/transactions/${this.props.transactionId}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      });
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
          >
            {/* options for categories will go here */}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formMembers">
          <Form.Label>Members</Form.Label>
          <Form.Control
            as="select"
            multiple
            name="members"
            value={this.state.members}
            onChange={this.handleChange}
          >
            {/* options for members will go here */}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    );
  }
}

class DeleteTransactionButton extends React.Component {
  handleClick() {
    fetch(`/api/transactions/${this.props.transactionId}/`, { method: 'DELETE' });
  }

  render() {
    return (
      <Button variant="danger" onClick={this.handleClick}>
        Delete
      </Button>
    );
  }
}

