﻿window.onload = function() {
    console.log("The document is loaded.");
    console.log("React is ready to perform its duties.");
    $('select').material_select();
    // Working the mobile SideNav changes for Materialize.
    $(".button-collapse").sideNav();
}

// React Components

/* Breweries component grabs data through 
an AJAX call and displays it on the screen */
var Breweries = React.createClass({
    getInitialState: function() {
        return {
            city: '',
            theState: 'option',
            breweryArray: []
        }
    },
    handleState: function(event) {
        var state = this.state;
        state.theState = event.target.value;
        this.setState(state);
    },
    handleCity: function(event) {
        var state = this.state;
        state.city = event.target.value;
        this.setState(state);
    },
    componentDidMount() {
        // Be able to use the select from Materialize
        var $element = $(ReactDOM.findDOMNode(this.refs.statesDropdown));

        $element.on('change', this.handleState);
    },
    handleSubmit: function(e) {
        console.log(this.state);
        this.state.breweryArray = [];
        e.preventDefault()
        $.ajax({
            url: window.location.href + "/Home/GetBrewery",
            data: JSON.stringify(this.state),
            dataType: "json",
            type: "POST",
            success: function(data) {
                var final = JSON.parse(data);
                console.log(final);
                var self = this;
                final.data.forEach(function(myArray) {
                    var breweryArray = self.state.breweryArray.slice();
                    breweryArray.push(myArray.brewery);
                    self.setState({ breweryArray: breweryArray})
                });
            }.bind(this),
            error: function(err) {
                console.log("Error is erroring:");
                console.error(this.props.url, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var myArray = this.state.breweryArray;
        if (!this.state.breweryArray) {
            return null;
        }
        console.log(myArray);
        return (
            <div className="row">
                <h4 className="centerize">Find a Brewery in your Local Area</h4>
                <form onSubmit={this.handleSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="locality" type="text" onChange={this.handleCity} value={this.state.city} className="validate" />
                            <label htmlFor="locality">City/Town</label>
                        </div>
                        <div className="input-field col s6">
                            <select ref="statesDropdown" onChange={this.handleState} value={this.state.theState}>
                                <option value="option" disabled>Choose your option</option>
	                            <option value="Alabama">Alabama</option>
	                            <option value="Alaska">Alaska</option>
	                            <option value="Arizona">Arizona</option>
	                            <option value="Arkansas">Arkansas</option>
	                            <option value="California">California</option>
	                            <option value="Colorado">Colorado</option>
	                            <option value="Connecticut">Connecticut</option>
	                            <option value="Delware">Delaware</option>
	                            <option value="Distric of Columbia">District Of Columbia</option>
	                            <option value="Florida">Florida</option>
	                            <option value="Georiga">Georgia</option>
	                            <option value="Hawaii">Hawaii</option>
	                            <option value="Idaho">Idaho</option>
	                            <option value="Illinois">Illinois</option>
	                            <option value="Indiana">Indiana</option>
	                            <option value="Iowa">Iowa</option>
	                            <option value="Kansas">Kansas</option>
	                            <option value="Kentucky">Kentucky</option>
	                            <option value="Louisiana">Louisiana</option>
	                            <option value="Maine">Maine</option>
	                            <option value="Maryland">Maryland</option>
	                            <option value="Massachusetts">Massachusetts</option>
	                            <option value="Michigan">Michigan</option>
	                            <option value="Minnesota">Minnesota</option>
	                            <option value="Mississippi">Mississippi</option>
	                            <option value="Missouri">Missouri</option>
	                            <option value="Montana">Montana</option>
	                            <option value="Nebraska">Nebraska</option>
	                            <option value="Nevada">Nevada</option>
	                            <option value="New Hampshire">New Hampshire</option>
	                            <option value="New Jersey">New Jersey</option>
	                            <option value="New Mexico">New Mexico</option>
	                            <option value="New York">New York</option>
	                            <option value="North Carolina">North Carolina</option>
	                            <option value="North Dakota">North Dakota</option>
	                            <option value="Ohio">Ohio</option>
	                            <option value="Oklahoma">Oklahoma</option>
	                            <option value="Oregon">Oregon</option>
	                            <option value="Pennsylvania">Pennsylvania</option>
	                            <option value="Rhode Island">Rhode Island</option>
	                            <option value="South Carolina">South Carolina</option>
	                            <option value="South Dakota">South Dakota</option>
	                            <option value="Tennessee">Tennessee</option>
	                            <option value="Texas">Texas</option>
	                            <option value="Utah">Utah</option>
	                            <option value="Vermont">Vermont</option>
	                            <option value="Virginia">Virginia</option>
	                            <option value="Washington">Washington</option>
	                            <option value="West Virginia">West Virginia</option>
	                            <option value="Wisconsin">Wisconsin</option>
	                            <option value="Wyoming">Wyoming</option>
                             </select>
                            <label>State</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit">Submit
                        <i className="material-icons right">send</i>
                    </button>
                    <br />
                    <br />
                </form>
            <div className="row">
                <div className="col s12">
            {
                myArray.map(function(brewery) {
                    return (
                        <div key={brewery.id}>
                            {(() => {
                                if (!brewery.images) {
                                } else {
                                    return (
                                        <div>
                                            <img src={brewery.images.large} />
                                        </div>
                                    )
                                }
                            })()}
                            <h4><a href={brewery.website}>{brewery.name}</a></h4>
                            <ul>
                                <li><b>Description: </b> {brewery.description}</li>
                                <li><b>Year Established: </b> {brewery.established}</li>
                            </ul>
                            <hr />
                            <br />
                        </div>
                    );
                })
            }
                  </div>
               </div>
           </div>
            );
    }
});
ReactDOM.render( <Breweries name="Breweries" />, document.getElementById('container'));