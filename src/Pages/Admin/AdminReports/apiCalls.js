const handleResoveReport = (report_id) => {
  axiosInstance
    .patch(`report/`, { report_id: report_id })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

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
    });
};
