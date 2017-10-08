var React = require("react");
var createReactClass = require("create-react-class");
var NotificationSystem = require('react-notification-system');
var helper = require("./../../../utils/helper");
import { Pagination } from 'react-bootstrap';

var ManageUsers = createReactClass({
    _notificationSystem: null,
    getInitialState: function () {
        return {
            allUsersList: this.props.usersList,
            myId: this.props.myData._id,
            currentPage: 1,
            itemsPerPage: 8
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({ allUsersList: nextProps.usersList });
    },
    handleSelect(eventKey) {
        this.setState({
            currentPage: eventKey
        });
    },
    handleSuspend: function (userId, event) {
        event.preventDefault();
        helper.default.suspendUser({ id: userId }).then((userInfo) => {
            helper.default.getAllUsers().then((allUsersInfo) => {
                this.setState({ allUsersList: allUsersInfo.data });
            });
            this._notificationSystem.addNotification({
                message: 'Suspended the Account',
                level: 'warning',
                position: 'tr'
            });
        });
    },
    handleActivate: function (user, event) {
        event.preventDefault();
        var userRole = "";
        if (user.role === "admin") {
            userRole = 1;
        } else {
            userRole = 2;
        }
        helper.default.activateAcc({
            id: user._id,
            privilege: userRole
        }).then((userInfo) => {
            helper.default.getAllUsers().then((allUsersInfo) => {
                this.setState({ allUsersList: allUsersInfo.data });
            });
            this._notificationSystem.addNotification({
                message: 'Activated the Account',
                level: 'success',
                position: 'tr'
            });
        });
    },
    renderUsers: function () {
        const { allUsersList, currentPage, itemsPerPage } = this.state;
        const indexOfLastTodo = currentPage * itemsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
        const currentTodos = allUsersList.slice(indexOfFirstTodo, indexOfLastTodo);

        return currentTodos.map((user, index) => {
            if (user._id !== this.state.myId) {
                if (user.privilege === 3) {
                    return (
                        <div className="col-md-3" key={index}>
                            <div className="people-block" >
                                <p className="pull-right"><span className="label label-danger" onClick={this.handleActivate.bind(this, user)}>Activate</span></p>
                                <p><b>Role: </b>{user.role}</p>
                                <p className="capitalize-name"><b>Name: </b>{user.name}</p>
                                <p><b>Emaid-id: </b><a href={"mailto:" + user.emailId}>{user.emailId}</a></p>
                                <p><b>Location: </b>{user.location}</p>
                                <p><b>Address: </b>{user.address}</p>
                                <p><b>Phone: </b>{user.phone}</p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="col-md-3" key={index}>
                            <div className="people-block" >
                                <p className="pull-right"><span className="label label-default" onClick={this.handleSuspend.bind(this, user._id)}>Suspend</span></p>
                                <p><b>Role: </b>{user.role}</p>
                                <p className="capitalize-name"><b>Name: </b>{user.name}</p>
                                <p><b>Emaid-id: </b><a href={"mailto:" + user.emailId}>{user.emailId}</a></p>
                                <p><b>Location: </b>{user.location}</p>
                                <p><b>Address: </b>{user.address}</p>
                                <p><b>Phone: </b>{user.phone}</p>
                            </div>
                        </div>
                    );
                }
            } else {
                return (
                    <div className="col-md-3" key={index}>
                        <div className="people-block" >
                            <p><b>Role: </b>{user.role}</p>
                            <p className="capitalize-name"><b>Name: </b>{user.name}</p>
                            <p><b>Emaid-id: </b><a href={"mailto:" + user.emailId}>{user.emailId}</a></p>
                            <p><b>Location: </b>{user.location}</p>
                            <p><b>Address: </b>{user.address}</p>
                            <p><b>Phone: </b>{user.phone}</p>
                        </div>
                    </div>
                );
            }
        });
    },
    render: function () {
        var totalPages = Math.ceil(this.state.allUsersList.length / this.state.itemsPerPage);
        return (
            <div id="manage-user" className="tab-pane fade">
                <NotificationSystem ref="notificationSystem" />
                <div className="row">
                    {this.renderUsers()}
                </div>
                <div className="row">
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        items={totalPages}
                        maxButtons={5}
                        activePage={this.state.currentPage}
                        onSelect={this.handleSelect} />
                </div>
            </div>
        );
    }
});
module.exports = ManageUsers;