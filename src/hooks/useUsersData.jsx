import axios from 'axios';
import { useEffect, useState } from 'react'

const useUsersData = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const data = await axios.get("https://jsonplaceholder.typicode.com/users")
    const json = await data.data
    setUsers(json)
  }

  return [users, setUsers];
}

export default useUsersData