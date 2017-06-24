var React = require("react");
import Login from "./Login";

var Shelter = React.createClass({
    render: function () {
        return (
            <div className="container">
                <h1>Shelter login</h1>
                <Login/>
            </div>
        );
    }
});
module.exports = Shelter;