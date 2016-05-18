window.onload = function() {
    console.log("The document is loaded.");
    console.log("React is ready to perform its duties.");

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
            theState: '',
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
    handleSubmit: function(e) {
        console.log(this.state);
        this.state.breweryArray = [];
        e.preventDefault()
        $.ajax({
            url: "http://whereismybrewery.azurewebsites.net/Home/GetBrewery",
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
                            <input id="state" type="text" onChange={this.handleState} value={this.state.theState} className="validate" />
                            <label htmlFor="state">State</label>
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
                            <h4><a href={brewery.website}>{brewery.name}</a></h4>
                            <ul>
                                <li><b>Description: </b> {brewery.description}</li>
                                <li><b>Year Established: </b> {brewery.established}</li>
                            </ul>
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