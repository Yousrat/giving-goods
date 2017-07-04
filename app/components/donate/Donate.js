var React = require("react");
var helper = require("./../../utils/helper");

var ListPeople = require("./ListPeople");
var Search = require("./Search");

var Donate = React.createClass({
    getInitialState: function () {
        return {
            peopleList: [],
            searchLocation: "",
            searchItem: ""
        }
    },
    componentWillMount: function () {
        helper.default.getAllPeople().then(function (peopleArray) {
            this.setState({ peopleList: peopleArray.data });
        }.bind(this));
    },
    componentDidUpdate: function (prevProps, prevState) {
        if (prevState.searchLocation !== this.state.searchLocation) {
            helper.default.getPeopleByLocation(this.state.searchLocation).then(function (peopleByLocation) {
                this.setState({ peopleList: peopleByLocation.data });
            }.bind(this));
        }

        if (prevState.searchItem !== this.state.searchItem) {
            helper.default.getPeopleByItem(this.state.searchItem).then(function (peopleByItem) {
                this.setState({ peopleList: peopleByItem.data });
            }.bind(this));
        }
    },
    setQuery: function (location, item) {
        this.setState({
            searchLocation: location,
            searchItem: item
        });
    },
    render: function () {
        return (
            <div className="container" id="donate-container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Here's How You Can Help!</h3>
                        <p>
                            <b>Browse</b> individuals and find someone you connect with!
                        </p>
                        <p>
                            Search by a specific <b>item</b> you would like to give or find those near your <b>location</b>!
                        </p>
                        <p>
                            Once you find the neighbor you would like to help, <b>contact</b> the shelter directly to donate your item(s)!
                        </p>
                    </div>
                    <div className="col-md-6" id="search-section">
                        <Search updateSearch={this.setQuery} />
                    </div>
                    <div className="col-md-12" id="people-list-section">
                        <hr />
                        <ListPeople peopleList={this.state.peopleList} />
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = Donate;