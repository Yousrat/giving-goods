var React = require("react");
var Link = require("react-router").Link;

var Navbar = React.createClass({
    render: function () {
        return (
            <div className="row header">
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#ggNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">Giving goods</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="ggNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/home"><span className="glyphicon glyphicon-home"></span> Home</Link></li>
                                <li><Link to="/donate"><span className="glyphicon glyphicon-heart"></span> Donate goods</Link></li>
                                <li><Link to="#about-us"><span className="glyphicon glyphicon-info-sign"></span> About us</Link></li>
                                <li><Link to="#contact-us"><span className="glyphicon glyphicon-envelope"></span> Contact us</Link></li>
                                <li><Link to="/shelter"><span className="glyphicon glyphicon-log-in"></span> Shelter</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
});
module.exports = Navbar;