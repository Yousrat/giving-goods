var React = require("react");
var Link = require("react-router").Link;
var helpers = require("./../../utils/helper");
import AdminNavTab from "./AdminNavTab";
import ShelterNavTab from "./ShelterNavTab";
// import MyProfile from "./admin/MyProfile";
// import AddUser from "./admin/AddUser";
// import ManageUser from "./admin/ManageUser";
// import ShelterProfile from "./admin/ShelterProfile";
// import AddPeople from "./admin/AddPeople";
// import ManagePeople from "./admin/ManagePeople";
import { browserHistory } from 'react-router';

var Profile = React.createClass({
    getInitialState: function () {
        return {
            loggedInUser: ""
        }
    },
    componentDidMount: function () {
        helpers.default.getMyInfo().then(function (myInfo) {
            this.setState({ loggedInUser: myInfo.data });
        }.bind(this));
    },
    handleClick: function (event) {
        helpers.default.logoutUser();
    },
    renderLogout: function () {
        return (
             <Link to="/home" onClick={this.handleClick}><span className="glyphicon glyphicon-log-out"></span> Logout</Link>
        );
    },
    renderWarning: function () {
        return (
            <div className="container">
                Please login
                <button><Link to="/shelter">Login</Link></button>
            </div>
        );
    },
    renderAdminPanel: function () {
        return (
            <div className="container">
                {this.renderLogout()}
                <AdminNavTab />
                <div className="tab-content">
                    {/*<MyProfile myInfo={this.state.loggedInUser}/>*/}
                    {/*<AddUser />*/}
                    {/*<ManageUser />*/}
                </div>
            </div>
        );
    },
    renderShelterPanel: function () {
        return (
            <div className="container">
                {this.renderLogout()}
                <ShelterNavTab />
                <div className="tab-content">
                    {/*<ShelterProfile shelterInfo={this.state.loggedInUser/>
                    <AddPeople shelterId={this.state.loggedInUser._id/>
                    <ManagePeople />*/}
                </div>
            </div>
        );
    },
    render: function () {
        if (this.state.loggedInUser) {
            if (this.state.loggedInUser.privilege === 1 && this.state.loggedInUser.role === "admin") {
                return this.renderAdminPanel();
            } else if (this.state.loggedInUser.privilege === 2 && this.state.loggedInUser.role === "shelter") {
                return this.renderShelterPanel();
            }
        }
        else {
            return this.renderWarning();
        }
    }
});
module.exports = Profile;