var React = require("react");
var NotificationSystem = require("react-notification-system");
var helper = require("./../../utils/helper");

var ListPeople = React.createClass({
    _notificationSystem: null,

    getInitialState: function () {
        return {
            allPeopleList: [],
            currentPerson: [],
            currentPersonItems: []
        }
    },

    componentDidMount: function () {
        helper.default.getAllPeople().then(function (peopleList) {
            this.setState({ allPeopleList: peopleList.data });
        }.bind(this));
        this._notificationSystem = this.refs.notificationSystem;
    },

    getPersonItems: function (person) {
        this.setState({ currentPerson: person });
        helper.default.findMyItemsIds(person.items).then(function (itemDetails) {
            this.setState({ currentPersonItems: itemDetails.data });
        }.bind(this));
    },

    renderPersonModal: function () {
        var itemRows = "";
        if (this.state.currentPersonItems.length !== 0) {
            itemRows = this.state.currentPersonItems.map((item,index) => {
                return (
                    <tr key={index}>
                        <td>{item.item_name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.description}</td>
                    </tr>
                );
            });
        }

        return (
            <div id="personModal" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{this.state.currentPerson.person_first_name}</h4>
                        </div>
                        <div className="modal-body">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemRows}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    },

    renderPeople: function () {
        return this.state.allPeopleList.map((person, index) => {
            if (person.items.length) {
                return (
                    <div className="people-block" key={index}>
                        <p>{person.person_first_name + " " + person.person_last_name}</p>
                        <p>{person.shelter_id.location}</p>
                        <p>Age: {person.age_group}</p>
                        <p>{person.gender}</p>
                        <button type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target="#personModal" onClick={this.getPersonItems.bind(this, person)}>Expand</button>
                        <button type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target="#contactModal" onClick="">Contact Shelter</button>
                    </div>
                );
            }
        });
    },

    render: function () {
        return (
            <div id="people-list">
                <NotificationSystem ref="notificationSystem" />
                {this.renderPeople()}
                {this.renderPersonModal()}
            </div>
        );
    }
});
module.exports = ListPeople;