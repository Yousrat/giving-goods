var React = require("react");
var helper = require("./../../utils/helper");

var ListPeople = require("./ListPeople");
var Search = require("./Search");

var Donate = React.createClass({
    getInitialState: function () {
        return {
            searchLocation: "",
            searchItem: ""
        }
    },

    setQuery: function (location, item) {
        this.setState({
            searchLocation: location,
            searchItem: item
        });
    },

    render: function () {
        return (
            <div className="container">
                <h1>Donate Goods</h1>
                <Search updateSearch={this.setQuery} />
                <ListPeople searchLocation={this.state.searchLocation} />
            </div>
        );
    }
});
module.exports = Donate;