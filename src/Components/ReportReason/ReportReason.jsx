import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axiosInstance from "../../AxiosQueries/axosInstance";

export default function ReportReason({
  post_id,
  reporting_user,
  reported_user,
}) {
  const [open, setOpen] = React.useState(false);
  const [report, setReport] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReport = () => {
    const formData = {
      post: post_id,
      reported_user: reported_user,
      reporting_user: reporting_user,
      reason: report,
    };
    console.log(formData)
    handleClose();
    axiosInstance
      .post(`/report/`,formData)
      .then((response) => {
        console.log(response);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div>
      <span
        style={{ cursor: "pointer", padding: "10px" }}
        onClick={handleClickOpen}
      >
        Report
      </span>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Brief the reason for reporting this particular post and click on sen
            button. Necessary actions will be taken.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Report"
            type="text"
            fullWidth
            variant="standard"
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReport}>send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
