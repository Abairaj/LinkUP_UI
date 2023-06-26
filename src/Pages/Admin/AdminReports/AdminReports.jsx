import React, { useState, useEffect, useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axiosInstance from "../../../axosInstance";
import "./adminreports.scss";
import ResolveReport from "./AdminResolve";
import debounce from "lodash/debounce";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function AdminReports() {
  const [report, setReport] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchReports = () => {
    axiosInstance
      .get(`/report?page=${page}`)
      .then((response) => {
        console.log(response.data);
        setReport(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  useEffect(() => {
    fetchReports();
  }, [page]);

  const handleSearch = (value) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const fetchFilteredReports = (value) => {
    axiosInstance
      .get(`/report/search_report?key=${value}`)
      .then((response) => {
        console.log(response.data);
        setReport(response.data.results);
        setTotalPages(response.data.total_pages);
        setPage(1); // Reset page to 1 when performing a search
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const debouncedSearch = useMemo(
    () => debounce(fetchFilteredReports, 700),
    []
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="admin_report">
      <div className="searchreport">
        <input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <List
        className="admin_report_list"
        sx={{
          width: "100%",
          maxWidth: 900,
          bgcolor: "background.paper",
          overflowY: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {report&&report.length > 0 ? (
          report.map((obj) => (
            <ListItem
              key={obj.id}
              sx={{ border: "1px solid gray" }}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={obj.reported_user.profile} />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <h1>{obj.reported_user.username}</h1>
                    </Typography>
                    <p>{obj.reason}</p>
                  </React.Fragment>
                }
              />
              <ResolveReport report={obj} fetchReport={fetchReports} />
            </ListItem>
          ))
        ) : (
          <p>No reports</p>
        )}
      </List>

      <Stack spacing={4}>
        <Pagination
          count={totalPages}
          color="secondary"
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
}
