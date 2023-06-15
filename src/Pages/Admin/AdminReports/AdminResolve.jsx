import React, { useCallback, useState, useEffect, useContext } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";
import "./adminreports.scss";
import axiosInstance from "../../../axosInstance";
import ConfirmPopup from "../../../Components/confirm_popup/confirmPopup";
import { AlertContext } from "../../../context/alertContext";

function ResolveReport({ report, fetchReport }) {
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [success, setSuccess] = useState(false);
  const { successAlert, showSuccessAlert } = useContext(AlertContext);

  const handleDelete = (post_id) => {
    axiosInstance
      .patch(`report/delete_post/${post_id}`)
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 304) {
          setSuccess(True);
          showSuccessAlert();
        }
      });
    setChange(!change);
  };

  const handleResoveReport = (report_id) => {
    axiosInstance
      .patch(`report/`, { report_id: report_id })
      .then((response) => {
        console.log(response);
        setChange(!change);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchReportMemoized = useCallback(() => {
    fetchReport();
  }, [change]);

  useEffect(() => {
    fetchReportMemoized();
  }, [fetchReportMemoized]);

  const togglePopup = () => {
    setOpen(!open);
  };

  const handleBanUnban = (id, is_banned) => {
    const formData = { is_banned: !is_banned };
    axiosInstance
      .patch(`/admin/block_unblock_user/${id}`, formData)
      .then((response) => {
        console.log(response.data.message);
        setChange(!change);
      });
  };

  return (
    <div className="resolve_btn">
      {successAlert && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert>
      )}
      <Button onClick={togglePopup}>Resolve</Button>

      <Dialog open={open} onClose={togglePopup} maxWidth="md">
        <DialogContent>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs className="reported_posts">
              <div className="reported_post">
                <img src={report.post.media_url} alt="post" />
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem>
              <br />
            </Divider>
            <Grid className="report_details" item xs>
              <div className="report_detail">
                <h1>Reported By:</h1>
                <div className="user_bar">
                  <div className="user_info">
                    <Avatar src={report.reported_user.profile} />

                    <div className="u_info">
                      <span className="user_name">
                        {report.reported_user.username}
                      </span>
                      <span className="user_active">Active</span>
                    </div>
                  </div>

                  {!report.reported_user.is_banned ? (
                    <Button
                      sx={{ color: "red" }}
                      onClick={() =>
                        handleBanUnban(
                          report.reported_user.id,
                          report.reported_user.is_banned
                        )
                      }
                    >
                      Ban
                    </Button>
                  ) : (
                    <Button
                      sx={{ color: "green" }}
                      onClick={() =>
                        handleBanUnban(
                          report.reported_user.id,
                          report.reported_user.is_banned
                        )
                      }
                    >
                      Unban
                    </Button>
                  )}
                </div>
              </div>

              <div className="report_detail">
                <h1>Reported:</h1>
                <div className="user_bar">
                  <div className="user_info">
                    <Avatar src={report.reporting_user.profile} />

                    <div className="u_info">
                      <span className="user_name">
                        {report.reporting_user.username}
                      </span>
                      <span className="user_active">Active</span>
                    </div>
                  </div>
                  {!report.reporting_user.is_banned ? (
                    <Button
                      sx={{ color: "red" }}
                      onClick={() =>
                        handleBanUnban(
                          report.reporting_user.id,
                          report.reporting_user.is_banned
                        )
                      }
                    >
                      Ban
                    </Button>
                  ) : (
                    <Button
                      sx={{ color: "green" }}
                      onClick={() =>
                        handleBanUnban(
                          report.reporting_user.id,
                          report.reporting_user.is_banned
                        )
                      }
                    >
                      Unban
                    </Button>
                  )}
                </div>
              </div>

              <div className="report_reason">
                <p>{report.reason}</p>
              </div>
              <div className="post_status">
                <p>{report.post.deleted ? "Post Deleted" : ""}</p>
              </div>

              <div className="action_btn">
                {!report.post.deleted && (
                  <ConfirmPopup
                    post_id={report.post.post_id}
                    func={handleDelete}
                    color={"red"}
                    name={"Delete Post"}
                    content={"Are you sure about deleting the post."}
                  />
                )}

                <Button
                  onClick={() => handleResoveReport(report.id)}
                  variant="outlined"
                >
                  Resolved
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResolveReport;
