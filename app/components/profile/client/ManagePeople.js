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
        document.getElementById("edit-people-form").reset();
        this.setState({ currentPeople: people });
    },
    setAddItem: function (people) {
        this.setState({ currentPeopleAddItem: people });
    },
    setEditItem: function (item) {
        document.getElementById("edit-item-form").reset();
        this.setState({ currentItemUpdate: item });
    },
    addDefaultSrc: function (e) {
        e.target.src = 'https://i.stack.imgur.com/WmvM0.png'
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
                                    <td><button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#editItemModal" onClick={this.setEditItem.bind(this, item)}>Edit Item</button></td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={i}>
                                    <td>{item.item_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.description}</td>
                                    <td>Received</td>
                                    <td><button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#editItemModal" onClick={this.setEditItem.bind(this, item)}>Edit Item</button></td>
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

                var proImage = "";
                if (people.person_image) {
                    proImage = people.person_image;
                } else {
                    proImage = "https://i.stack.imgur.com/WmvM0.png";
                }
                return (
                    <div className="col-md-6" key={index}>
                        <div className="manage-people-block clearfix">
                            <div className="col-md-6 col-sm-5 col-xs-5 people-image-section">
                                <img className="img-responsive people-image" src={proImage} onError={this.addDefaultSrc} alt="Profile image" />
                            </div>
                            <div className="col-md-6 col-sm-7 col-xs-7 people-info-section">
                                <p className="people-name capitalize-name"><b>{people.person_first_name + " " + people.person_last_name}</b></p>
                                <p><b>Gender: </b>{people.gender}</p>
                                <p><b>Age Group: </b>{people.age_group} </p>
                                <p><b>Case ID: </b>{people.person_code}</p>
                                <p className="text-justify"><b>Short Bio: </b>{people.notes}</p>
                            </div>
                            <div className="col-md-12">
                                <br /><button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#editPeopleModal" onClick={this.setEditPeople.bind(this, people)}>Edit Personal Info</button>
                                <button type="button" className="btn btn-default btn-sm" data-toggle="modal" data-target="#addItemModal" onClick={this.setAddItem.bind(this, people)}>Add Item</button>
                                <button className="btn btn-default btn-sm" data-toggle="collapse" data-target={"#item-table-" + index}>Items List</button><br />
                                <div id={"item-table-" + index} className="collapse item-table">
                                    {itemTable}
                                </div>
                            </div>
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
                <div className="row">
                    {this.renderMyPeople()}
                </div>
                <EditPeopleModal peopleData={this.state.currentPeople} resetPeople={this.resetMyPeople} />
                <AddItemModal peopleData={this.state.currentPeopleAddItem} resetPeople={this.resetMyPeople} />
                <EditItemModal itemData={this.state.currentItemUpdate} resetPeople={this.resetMyPeople} />
            </div>
        );
    }
});
module.exports = ManagePeople;