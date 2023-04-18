import { useState } from 'react'
import styled from 'styled-components'
import useUsersData from '../hooks/useUsersData'

const Home = () => {
  const [users, setUsers] = useUsersData()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    const data = {
      id: users.length + 1,
      name: name,
      email: email,
      phone: phone,
    };
    setUsers([...users, data])
    setName("")
    setEmail("")
    setPhone("")
    setShowAddRow(false);
  }

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (users.length === 0) ? <h1>No Users</h1> : (
    <div>
      <Search>
        <input type="text" placeholder="Search Name/Email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </Search>
      <Table>
        <thead>
          <tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
            </tr>
          ))}
          {showAddRow ? (
            <>
              <tr>
                <Td></Td>
                <Td>
                  <Input placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                </Td>
                <Td>
                  <Input placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Td>
                <Td>
                  <Input placeholder='Enter Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Td>
              </tr>
              <Button onClick={submitForm} disabled={!name || !email || !phone}>Save User</Button>
              <Button onClick={() => setShowAddRow(false)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setShowAddRow(true)}>Add User</Button>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`
const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`
const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`
const Input = styled.input`
  text-align: left;
  outline: none;
  border: none;
`
const Button = styled.button`
  padding: 9px;
  border:none;
  background: lightgray;
  margin: 1rem 1rem 0 0;
  cursor: pointer;
`
const Search = styled.div`
  input {
    padding: 0.3rem;
    margin: 0.5rem 0;
    outline: none;
  }
`

export default Home;
