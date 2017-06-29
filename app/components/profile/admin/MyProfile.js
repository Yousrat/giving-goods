var React = require("react");
var helper = require("./../../../utils/helper");



var MyProfile = React.createClass({

    getInitialState: function () {
        return {
            name: this.props.myInfo.name,
            role: this.props.myInfo.role,
            emailId: this.props.myInfo.emailId,
            address: this.props.myInfo.address,
            location: this.props.myInfo.location
        }
    },


    render: function () {
        return (
            <div id="my-profile" className="tab-pane fade in active">
                <div className="row">
                    MyProfile
                    <p> {this.state.name} </p>
                    <p> {this.state.role} </p>
                    <p> {this.state.emailId} </p>
                    <p> {this.state.address} </p>
                    <p> {this.state.location} </p>
                </div>
            </div>
        );
    }
});
module.exports = MyProfile;