var React = require("react");
var AboutUs = React.createClass({
    render: function () {
        return (
            <div id="about-us" className="row">
                <div className="container-fluid">
                    <div id="about-text" className="col-md-7">
                        <h3>About Us</h3>
                        <p>
                            Homelessness and housing insecurity are prevalent issues in San Diego County.
                            According to a <a href="http://www.rtfhsd.org/wp/wp-content/uploads/2017/06/comp-report-final.pdf" target="_blank"> report </a> by the Regional Homeless Task Force in San Diego, in the January 27 count,
                            5,621 people were unsheltered, an increase of 14 percent from last year, and 3,495 were in shelters, down 6 percent. 
                        </p>
                        <p>
                            To alleviate these issues, caseworkers help on a case to case basis. But the caseworkers need our help with getting specific items to those in need. Most donation centers receive bulk items that are not necessarily catered to an individual’s specific needs. 
                        </p>
                        <blockquote>
                            "The goal is to build more of a connection between the San Diego community and its housing insecure neighbors."
                        </blockquote>                        
                        <p>
                            Our app showcases these clients’ wish lists which are put together by their caseworkers. The goal is to build more of a connection between the San Diego community and its housing insecure neighbors. Instead of wondering where exactly their donated items go, people will know the items go directly to clients in need.
                        </p>
                    </div>
                    <div className="col-md-5">
                        <img src="/assets/images/ggMap.png" id="gg-map" alt="Map"/>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = AboutUs;