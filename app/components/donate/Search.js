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
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    },

    handleSubmit: function (event) {
        event.preventDefault();
        this.props.updateSearch(this.state.location, this.state.item);
        console.log(this.state.location + " xxxxx " + this.state.item);
    },

    render: function () {
        return (
            <div id="search-section">
                <h4>Search</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" placeholder="by Item" className="form-control" name="item" onChange={this.handleChange} />
                    </div>
                    <p>OR</p>
                    <div className="form-group">
                        <select className="form-control" name="location" onChange={this.handleChange}>
                            <option value="All">All location</option>
                            <option value="North Coast">North Coast</option>
                            <option value="North Inland">North Inland</option>
                            <option value="Central Coast">Central Coast</option>
                            <option value="Central City">Central City</option>
                            <option value="East County">East County</option>
                            <option value="South Bay">South Bay</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }
});
module.exports = Search;