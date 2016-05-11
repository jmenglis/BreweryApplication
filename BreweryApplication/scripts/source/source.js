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
            console.log("what");
            return null;
        }
        return (
            <div className="BreweryList">
            {
                myArray.map(function(brewery) {
                    return (
                        <div key={brewery.id}>
                            <h3>{brewery.name}</h3>
                            <ul>
                                <li><b>Description: </b> {brewery.description}</li>
                            </ul>
                        </div>
                    );
                })
            }
        </div>
            );
    }
});
ReactDOM.render( <Breweries url="/home/getbrewery" name="Breweries" />, document.getElementById('container'));