import * as React from "react";
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

export default function AdminReports() {
  const [report, setReport] = React.useState([]);

  const fetchReports = () => {
    axiosInstance
      .get(`/report`)
      .then((response) => {
        console.log(response.data);
        setReport(response.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  React.useEffect(() => {
    fetchReports();
  }, []);
  return (
    <div className="admin_report">
      <List
        className="admin_report_list"
        sx={{
          width: "100%",
          maxWidth: 900,
          bgcolor: "background.paper",
          overflowY: "scroll",
          scrollbarWidth: "none" /* Hide scrollbar on Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Hide scrollbar on Chrome, Safari, and Opera */,
          },
        }}
      >
        {report && report.length > 0
          ? report.map((obj) => {
              return (
                <ListItem
                  key={obj.id}
                  sx={{ border: "1px solid gray" }}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={obj.reported_user.profile} />
                  </ListItemAvatar>
                  <ListItemText
                    // primary="Brunch this weekend?"
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
                  <ResolveReport  report={obj} fetchReport={fetchReports} />
                </ListItem>
              );
            })
          : ""}
      </List>
    </div>
  );
}
