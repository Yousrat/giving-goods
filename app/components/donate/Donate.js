var React = require("react");

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
        helpers.runQuery(newQuery, newStart, newEnd).then(function (data) {
            this.setState({ results: { docs: data.docs } });
        }.bind(this));
    },

    render: function () {
        return (
            <div className="container">
                <h1>Donate Goods</h1>
                <Search />
                <ListPeople />
            </div>
        );
    }
});
module.exports = Donate;