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
            breweryArray: []
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();
        console.log(this.props.data);
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                var final = JSON.parse(data);
                var self = this;
                final.data.forEach(function(myArray) {
                    var breweryArray = self.state.breweryArray.slice();
                    breweryArray.push(myArray.brewery);
                    self.setState({ breweryArray: breweryArray})
                });
            }.bind(this),
            error: function(err) {
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
                <form onSubmit={this.handleSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="locality" type="text" className="validate" />
                            <label htmlFor="locality">City/Town</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="state" type="text" className="validate" />
                            <label htmlFor="state">State</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            <div className="row">
            {
                myArray.map(function(brewery) {
                    return (
                        <div key={brewery.id}>
                            <h4>{brewery.name}</h4>
                            <ul>
                                <li><b>Description: </b> {brewery.description}</li>
                                <li><b>Year Established: </b> {brewery.established}</li>
                                <li><b>Website: </b> {brewery.website}</li>
                            </ul>
                        </div>
                    );
    })
            }
            </div>
           </div>
            );
    }
});
ReactDOM.render( <Breweries name="Breweries" />, document.getElementById('container'));