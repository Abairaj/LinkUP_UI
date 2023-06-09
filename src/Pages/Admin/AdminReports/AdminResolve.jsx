import React, { useCallback, useState ,useEffect} from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
} from "@mui/material";
import "./adminreports.scss";
import axiosInstance from "../../../AxiosQueries/axosInstance";

function ResolveReport({ report, fetchReport }) {
  const [open, setOpen] = useState(false);
  const [banned, setBanned] = useState(false);

  const fetchReportMemoized = useCallback(() => {
    fetchReport();
  }, [banned]);

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
        setBanned(!banned);
      });
  };

  return (
    <div className="resolve_btn">
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

              <Button className="resolved_btn" variant="outlined">
                Resolved
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResolveReport;
