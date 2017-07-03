var React = require("react");
var helper = require("./../../../utils/helper");
var EditPeopleModal = require("./EditPeopleModal");
var AddItemModal = require("./AddItemModal");
var EditItemModal = require("./EditItemModal");

var ManagePeople = React.createClass({
    getInitialState: function () {
        return {
            myPeopleList: this.props.peopleList,
            currentPeople: [],
            currentPeopleAddItem: [],
            currentItemUpdate: []
        }
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({ myPeopleList: nextProps.peopleList });
    },
    setEditPeople: function (people) {
        this.setState({ currentPeople: people });
    },
    setAddItem: function (people) {
        this.setState({ currentPeopleAddItem: people });
    },
    setEditItem: function (item) {
        this.setState({ currentItemUpdate: item });
    },
    renderMyPeople: function () {
        if (this.state.myPeopleList.length !== 0) {
            return this.state.myPeopleList.map((people, index) => {
                var itemTable = <div>No Items</div>
                if (people.items.length !== 0) {
                    var itemRow = people.items.map(function (item, i) {
                        if (item.item_status === 0) {
                            return (
                                <tr key={i}>
                                    <td>{item.item_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.description}</td>
                                    <td>Needed</td>
                                    <td><button type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target="#editItemModal" onClick={this.setEditItem.bind(this, item)}>Edit Item</button></td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={i}>
                                    <td>{item.item_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.description}</td>
                                    <td>Received</td>
                                    <td><button type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target="#editItemModal" onClick={this.setEditItem.bind(this, item)}>Edit Item</button></td>
                                </tr>
                            );
                        }

                    }.bind(this));

                    itemTable = <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemRow}
                        </tbody>
                    </table>
                }
                return (
                    <div className="row people-block" key={index}>
                        <div className="col-md-5">
                            <p>{people.person_first_name + " " + people.person_last_name}</p>
                            <p>Gender: {people.gender}</p>
                            <p>Age Group: {people.age_group} </p>
                            <p>Case ID: {people.person_code}</p>
                            <p>Short Bio: {people.notes}</p>
                            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#editPeopleModal" onClick={this.setEditPeople.bind(this, people)}>Edit info</button>
                            <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addItemModal" onClick={this.setAddItem.bind(this, people)}>Add item</button>
                        </div>
                        <div className="col-md-7" >
                            {itemTable}
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <div>
                    No People
                </div>
            );
        }
    },
    resetMyPeople: function (newData) {
        this.setState({ myPeopleList: newData });
    },
    render: function () {
        return (
            <div id="manage-people" className="tab-pane fade">
                Manage People
                {this.renderMyPeople()}
                <EditPeopleModal peopleData={this.state.currentPeople} resetPeople={this.resetMyPeople} />
                <AddItemModal peopleData={this.state.currentPeopleAddItem} resetPeople={this.resetMyPeople} />
                <EditItemModal itemData={this.state.currentItemUpdate} resetPeople={this.resetMyPeople} />
            </div>
        );
    }
});
module.exports = ManagePeople;