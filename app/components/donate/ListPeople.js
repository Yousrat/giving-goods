var React = require("react");
var helper = require("./../../utils/helper");

var ListPeople = React.createClass({

    getInitialState: function () {
        return {
            allPeopleList: []
        }
    },

    componentDidMount: function () {
        helper.default.getAllPeople().then(function(peopleList){
            this.setState({ allPeopleList: peopleList.data });
        }.bind(this));
    },

    renderPeople: function () {
        return this.state.allPeopleList.map(function(person, index) {
            console.log(person);
            return(
                <div className="people-block" key={index}>
                    <p>{person.person_first_name + " " + person.person_last_name}</p>
                    <p>{person.shelter_id.location}</p>
                    <p>Age: {person.age_group}</p>                    
                    <p>{person.gender}</p>                    

                </div>
            );
        });
    },

    render: function () {
        return (
            <div id="people-list">
                {this.renderPeople()}
            </div>
        );
    }
});
module.exports = ListPeople;