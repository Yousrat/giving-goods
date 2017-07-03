var React = require("react");
var Link = require("react-router").Link;

var Banner = React.createClass({
    render: function () {
        return (
            <div className="row" id="banner">
                <div id="logoSection">
                    <span id="logoText">Giving Goods(s) </span>
                </div>
                <div id="buttonSection">
                <div id="btnDiv" className="">
                    <Link to="/donate"> <button type="button" className="bannerBTN btn btn-secondary btn-lg">Donate Goods</button></Link>
                    <Link to="/shelter"> <button type="button" className="bannerBTN btn btn-secondary btn-lg">Shelter Login</button></Link>
                </div>
                 </div>
            </div>
        );
    }
});
module.exports = Banner;