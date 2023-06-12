import React, { useState, useEffect, useMemo } from "react";
import Cookies from "js.cookie";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Button,
  TextField,
} from "@mui/material";
import axiosInstance from "../../../axosInstance";

const Usertable = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");
  const [banned, setBanned] = useState(true);

  const handleBanUnban = (id, is_banned) => {
    const formData = { is_banned: !is_banned };
    axiosInstance
      .patch(`/admin/block_unblock_user/${id}`, formData, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        console.log(response.data.message);
        setBanned(!banned);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/get_userlist/`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        setUserData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [banned]);

  const handleSort = (column) => {
    if (orderBy === column && order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
    setOrderBy(column);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    setPage(0);
  };

  const sortedAndFilteredData = useMemo(() => {
    let sortedData = [...userData];
    if (orderBy) {
      sortedData.sort((a, b) => {
        if (order === "asc") {
          return a[orderBy] - b[orderBy];
        } else {
          return b[orderBy] - a[orderBy];
        }
      });
    }
    if (filterText) {
      sortedData = sortedData.filter((user) =>
        user.username.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    return sortedData;
  }, [userData, orderBy, order, filterText]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedData = sortedAndFilteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="user_table" style={{ margin: "30px" }}>
      <TextField
        label="Search..."
        value={filterText}
        onChange={handleFilterChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={order}
                  onClick={() => handleSort("id")}
                >
                  Id
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "username"}
                  direction={order}
                  onClick={() => handleSort("username")}
                >
                  Username
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "full_name"}
                  direction={order}
                  onClick={() => handleSort("full_name")}
                >
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "email"}
                  direction={order}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "phone"}
                  direction={order}
                  onClick={() => handleSort("phone")}
                >
                  Phone
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "date_joined"}
                  direction={order}
                  onClick={() => handleSort("date_joined")}
                >
                  Joined At
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "last_login"}
                  direction={order}
                  onClick={() => handleSort("last_login")}
                >
                  Last Login
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.date_joined}</TableCell>
                <TableCell>{user.last_login}</TableCell>
                <TableCell>
                  {user.is_banned ? (
                    <Button
                      sx={{
                        backgroundColor: "#5D9C59",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "green",
                        },
                      }}
                      onClick={() => handleBanUnban(user.id, user.is_banned)}
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#CD1818",
                        },
                      }}
                      onClick={() => handleBanUnban(user.id, user.is_banned)}
                    >
                      Ban
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={sortedAndFilteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Usertable;
