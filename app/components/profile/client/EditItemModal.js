var React = require("react");
var NotificationSystem = require('react-notification-system');
var helper = require("./../../../utils/helper");

var EditItemModal = React.createClass({
    _notificationSystem: null,
    getInitialState: function () {
        return {
            itemDetails: []
        }
    },
    componentDidMount: function () {
        this._notificationSystem = this.refs.notificationSystem;
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({ itemDetails: nextProps.itemData });
    },
    handleEditItemChange: function (event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    },
    handleEditItemSubmit: function (event) {
        event.preventDefault();
        var itemUpdatedInfo = {
            itemId: this.state.itemDetails._id,
            itemName: this.state.updateItemName ? this.state.updateItemName : this.state.itemDetails.item_name,
            quantity: this.state.updateItemQuantity ? this.state.updateItemQuantity : this.state.itemDetails.quantity,
            itemStatus: this.state.updateItemStatus ? this.state.updateItemStatus : this.state.itemDetails.item_status,
            description: this.state.updateItemDescription ? this.state.updateItemDescription : this.state.itemDetails.description
        };
        helper.default.updateItem(itemUpdatedInfo).then((itemUpdated) => {
            if (itemUpdated) {
                helper.default.findMyPeople().then(function (peopleArray) {
                    this.props.resetPeople(peopleArray.data);
                }.bind(this));
                this._notificationSystem.addNotification({
                    message: 'Updated item info',
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
    },
    renderEditItemModal: function () {
        return (
            <div id="editItemModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Update item</h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleEditItemSubmit}>
                                <div className="form-group">
                                    <label>Item name</label>
                                    <input type="text" className="form-control" name="updateItemName" onChange={this.handleEditItemChange} />
                                </div>
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="text" className="form-control" name="updateItemQuantity" onChange={this.handleEditItemChange} />
                                </div>
                                <div className="form-group">
                                    <label >Item status</label>
                                    <select className="form-control" name="updateItemStatus" onChange={this.handleAddItemChange} required>
                                        <option value="">Select</option>
                                        <option value="0">Needed</option>
                                        <option value="1">Received</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" name="updateItemDescription" onChange={this.handleEditItemChange} rows="3" />
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
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
                {this.renderEditItemModal()}
            </div>
        );
    }
});
module.exports = EditItemModal;