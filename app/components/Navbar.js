var React = require("react");
var createReactClass = require("create-react-class");
var Link = require("react-router").Link;

var Navbar = createReactClass({
    render: function () {

        return (
            <div className="row header">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#ggNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">
                                <img id="navImg" src="/assets/images/givinggoods.png" alt="Logo" />
                            </Link>
                        </div>
                        <div className="collapse navbar-collapse" id="ggNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="active"><Link to="#GGapp"><span className="glyphicon glyphicon-home"></span> Home</Link></li>
                                <li><Link to="/donate"><span className="glyphicon glyphicon-heart"></span> Donate Goods</Link></li>
                                <li><Link to="#about-us"><span className="glyphicon glyphicon-info-sign"></span> About Us</Link></li>
                                <li><Link to="#contact-us"><span className="glyphicon glyphicon-envelope"></span> Contact Us</Link></li>
                                <li><Link to="/shelter"><span className="glyphicon glyphicon-log-in"></span> My account</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
});
module.exports = Navbar;