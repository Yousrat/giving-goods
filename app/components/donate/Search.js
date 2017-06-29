var React = require("react");
var helper = require("./../../utils/helper");

var Search = React.createClass({
    getInitialState: function () {
        return {
            item: "",
            location: ""
        };
    },

    handleChange: function (event) {
        console.log("TEXT CHANGED");
        var newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
        console.log(newState);
    },

    handleSubmit: function (event) {
        event.preventDefault();
        console.log("CLICKED");
        this.props.updateSearch(this.state.item, this.state.location);
    },

    render: function () {
        return (
            <div className="container">
                <h4>Search</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="by Item" className="form-control" id="searchItem" onChange={this.handleChange} />
                    </div>
                    <p>OR</p>
                    <div className="form-group">
                        <input type="text" placeholder="by Location" className="form-control" id="searchLocation" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }
});
module.exports = Search;