var React = require("react");
var createReactClass = require("create-react-class");
var NotificationSystem = require('react-notification-system');
var helper = require("./../../../utils/helper");

var AddItemModal = createReactClass({
    _notificationSystem: null,
    getInitialState: function () {
        return {
            peopleDetails: []
        }
    },
    componentDidMount: function () {
        this._notificationSystem = this.refs.notificationSystem;
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({ peopleDetails: nextProps.peopleData });
    },
    handleAddItemChange: function (event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    },
    handleAddItemSubmit: function (event) {
        event.preventDefault();
        var newItemInfo = {
            peopleId: this.state.peopleDetails._id,
            itemName: this.state.newItemName,
            quantity: this.state.newItemQuantity,
            itemStatus: this.state.newItemStatus,
            description: this.state.newItemDescription
        };
        helper.default.addItem(newItemInfo).then((newItem) => {
            if (newItem) {
                helper.default.findMyPeople().then(function (peopleArray) {
                    this.props.resetPeople(peopleArray.data);
                }.bind(this));
                this._notificationSystem.addNotification({
                    message: 'Added Item',
                    level: 'success',
                    position: 'tr'
                });
            } else {
                this._notificationSystem.addNotification({
                    message: 'Error',
                    level: 'error',
                    position: 'tr'
                });
            }
        });
        document.getElementById("add-item-form").reset();
    },
    renderAddItemModal: function () {
        return (
            <div id="addItemModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Add item</h4>
                        </div>
                        <div className="modal-body">
                            <form id="add-item-form" onSubmit={this.handleAddItemSubmit}>
                                <div className="form-group">
                                    <input type="text" placeholder="Item Name" className="form-control" name="newItemName" onChange={this.handleAddItemChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Quantity" className="form-control" name="newItemQuantity" onChange={this.handleAddItemChange} required />
                                </div>
                                <div className="form-group">
                                    <select className="form-control" name="newItemStatus" onChange={this.handleAddItemChange} required>
                                        <option value="">Status</option>
                                        <option value="0">Needed</option>
                                        <option value="1">Received</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <textarea rows="4" placeholder="Item Description" className="form-control" name="newItemDescription" onChange={this.handleAddItemChange} required />
                                </div>
                                <button type="submit" className="btn btn-default btn-sm">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    render: function () {
        return (
            <div className="row">
                <NotificationSystem ref="notificationSystem" />
                {this.renderAddItemModal()}
            </div>
        );
    }
});
module.exports = AddItemModal;