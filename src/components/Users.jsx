import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";

const Component = styled(Box)`
  width: 80%;
  margin: 50px auto;
  & > h4 {
    margin-bottom: 20px;
  }
  & > div > table > thead {
    background-color: black;
  }
  & > div > table > thead > tr > th {
    color: white;
    font-size: 16px;
    font-weight: 600px;
  }
  & > div > table > thead > tr > td {
    font-size: 16px;
  }
`;

export const Users = () => {
  const [users, setUsers] = useState([]);
  const API_URL = "https://r6edxbc8t9.execute-api.ap-south-1.amazonaws.com/dev";

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(API_URL);

      setUsers(JSON.parse(data.body));

      console.log("🚀 ~ getData ~ response:", JSON.parse(data.body));
    };
    getData();
  }, []);

  const removeEntry = (id) => {
    const removedUser = users.filter((user) => user.id !== id);
    setUsers(removedUser);
  };
  return (
    <Component className="">
      <Typography variant="h4">Users</Typography>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Remove Entry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.salary}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => removeEntry(user.id)}
                  >
                    Text
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Component>
  );
};
