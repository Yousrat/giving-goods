var React = require("react");

var ListPeople = require("./ListPeople");
// var Search = ("./Search");

var Donate = React.createClass({
    render: function () {
        return (
            <div className="container">
                <h1>Donate Goods</h1>
                <ListPeople />
            </div>
        );
    }
});
module.exports = Donate;