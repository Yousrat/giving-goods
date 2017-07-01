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
            <div className="container">
                <div className="row">
                    <h1>Donate Goods</h1>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-6">
                        <Search updateSearch={this.setQuery} />
                    </div>
                    <div className="col-md-12">
                        <ListPeople peopleList={this.state.peopleList} />
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = Donate;