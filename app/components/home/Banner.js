var React = require("react");
var Link = require("react-router").Link;

var Banner = React.createClass({
    render: function () {
        return (
            <div className="row" id="banner">
                <div id="btnDiv" className="">
                    <button type="button" className="bannerBTN btn btn-secondary btn-lg"><Link to="/donate"> Donate goods</Link></button>
                    <button type="button" className="bannerBTN btn btn-secondary btn-lg"><Link to="/shelter"> Shelter</Link></button>
                </div>
            </div>
        );
    }
});
module.exports = Banner;