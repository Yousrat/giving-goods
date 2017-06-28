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
  contactAdmin: function (senderData) {
    return axios.post("/contact-admin", senderData)
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        return false;
      });
  },
  contactShelter: function (donorData) {
    return axios.post("/contact-shelter", donorData)
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        return false;
      });
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
  addNewUser: function (userInfo) {
    return axios.post("/api/new-user", userInfo)
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        return false;
      });
  },
  suspendUser: function (userId) {
    return axios.post("/api/suspend-user", userId)
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        return false;
      });
  },
  activateAcc: function (userData) {
    return axios.post("/api/activate-acc", userData)
      .then(function (response) {
        return (response);
      })
      .catch(function (error) {
        return false;
      });
  },
  getAllUsers: function () {
    return axios.get("/api/user-list");
  },
  getAllPeople: function () {
    return axios.get("/api/all-people-list");
  },
  getItemInfo: function (itemId) {
    return axios.get(`/api/item-info/${itemId}`);
  },
  findMyItemsIds: function (itemIdArray) {
    return axios.get('/api/all-my-items', {
      params: {
        idArray: itemIdArray
      }
    });
  }
};

export default helper;
