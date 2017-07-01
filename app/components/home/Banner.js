var React = require("react");
var Banner = React.createClass({
    render: function () {
        return (
            <div className="row" id="banner">
                <div id="btnDiv" className="">
                    <button type="button" className="bannerBTN btn btn-secondary btn-lg">Donate</button>
                    <button type="button" className="bannerBTN btn btn-secondary btn-lg">Shelter</button>
                </div>
            </div>
        );
    }
});
module.exports = Banner;