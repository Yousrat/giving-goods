var React = require("react");
var Banner = React.createClass({
    render: function () {
        return (
            <div className="row" id="banner">
			<img src="assets/images/image1.jpg" alt="giving-goods" className="img-responsive center-block" /> 
            </div>
        );
    }
});
module.exports = Banner;