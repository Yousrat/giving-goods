import axios from "axios";

const helper = {
  loginUser: function (user) {
    return axios.post("/login", user)
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        return false;
      });
  },
  logoutUser: function () {
    return axios.get("/logout");
  },
  getMyInfo: function () {
    return axios.get("/api/get-my-info")
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        return false;
      });
  },
  updateMyInfo: function (updatedInfo) {
    return axios.post("/api/update-my-info", updatedInfo)
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        return false;
      });
  },
  getUsers: function () {
    return axios.get("/api/user-list");
  }
};

export default helper;
