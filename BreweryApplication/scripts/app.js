(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

window.onload = function () {
    console.log("Welcome to Where is the Brewery!");
    console.log("This application was created by Josh Engilsh");
    console.log("You can find the code for this application at: https://github.com/jmenglis/BreweryApplication");
    $('select').material_select();
    // Working the mobile SideNav changes for Materialize.
    $(".button-collapse").sideNav();
};

// React Components

/* Breweries component grabs data through 
an AJAX call and displays it on the screen */
var Breweries = React.createClass({
    displayName: "Breweries",

    getInitialState: function getInitialState() {
        return {
            city: '',
            theState: 'option',
            breweryArray: []
        };
    },
    handleState: function handleState(event) {
        var state = this.state;
        state.theState = event.target.value;
        this.setState(state);
    },
    handleCity: function handleCity(event) {
        var state = this.state;
        state.city = event.target.value;
        this.setState(state);
    },
    componentDidMount: function componentDidMount() {
        // Be able to use the select from Materialize
        var $element = $(ReactDOM.findDOMNode(this.refs.statesDropdown));

        $element.on('change', this.handleState);
    },

    handleSubmit: function handleSubmit(e) {
        this.state.breweryArray = [];
        e.preventDefault();
        $.ajax({
            url: window.location.href + "/Home/GetBrewery",
            data: JSON.stringify(this.state),
            dataType: "json",
            type: "POST",
            success: function (data) {
                var final = JSON.parse(data);
                var self = this;
                final.data.forEach(function (myArray) {
                    var breweryArray = self.state.breweryArray.slice();
                    breweryArray.push(myArray);
                    self.setState({ breweryArray: breweryArray });
                });
            }.bind(this),
            error: function (err) {
                console.log("Error is erroring:");
                console.error(this.props.url, err.toString());
            }.bind(this)
        });
    },
    render: function render() {
        var myArray = this.state.breweryArray;
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "h4",
                { className: "centerize" },
                "Find a Brewery in your Local Area"
            ),
            React.createElement(
                "form",
                { onSubmit: this.handleSubmit, className: "col s12" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "input-field col s6" },
                        React.createElement("input", { id: "locality", type: "text", onChange: this.handleCity, value: this.state.city, className: "validate" }),
                        React.createElement(
                            "label",
                            { htmlFor: "locality" },
                            "City/Town"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "input-field col s6" },
                        React.createElement(
                            "select",
                            { ref: "statesDropdown", onChange: this.handleState, value: this.state.theState },
                            React.createElement(
                                "option",
                                { value: "option", disabled: true },
                                "Choose your option"
                            ),
                            React.createElement(
                                "option",
                                { value: "Alabama" },
                                "Alabama"
                            ),
                            React.createElement(
                                "option",
                                { value: "Alaska" },
                                "Alaska"
                            ),
                            React.createElement(
                                "option",
                                { value: "Arizona" },
                                "Arizona"
                            ),
                            React.createElement(
                                "option",
                                { value: "Arkansas" },
                                "Arkansas"
                            ),
                            React.createElement(
                                "option",
                                { value: "California" },
                                "California"
                            ),
                            React.createElement(
                                "option",
                                { value: "Colorado" },
                                "Colorado"
                            ),
                            React.createElement(
                                "option",
                                { value: "Connecticut" },
                                "Connecticut"
                            ),
                            React.createElement(
                                "option",
                                { value: "Delware" },
                                "Delaware"
                            ),
                            React.createElement(
                                "option",
                                { value: "Distric of Columbia" },
                                "District Of Columbia"
                            ),
                            React.createElement(
                                "option",
                                { value: "Florida" },
                                "Florida"
                            ),
                            React.createElement(
                                "option",
                                { value: "Georiga" },
                                "Georgia"
                            ),
                            React.createElement(
                                "option",
                                { value: "Hawaii" },
                                "Hawaii"
                            ),
                            React.createElement(
                                "option",
                                { value: "Idaho" },
                                "Idaho"
                            ),
                            React.createElement(
                                "option",
                                { value: "Illinois" },
                                "Illinois"
                            ),
                            React.createElement(
                                "option",
                                { value: "Indiana" },
                                "Indiana"
                            ),
                            React.createElement(
                                "option",
                                { value: "Iowa" },
                                "Iowa"
                            ),
                            React.createElement(
                                "option",
                                { value: "Kansas" },
                                "Kansas"
                            ),
                            React.createElement(
                                "option",
                                { value: "Kentucky" },
                                "Kentucky"
                            ),
                            React.createElement(
                                "option",
                                { value: "Louisiana" },
                                "Louisiana"
                            ),
                            React.createElement(
                                "option",
                                { value: "Maine" },
                                "Maine"
                            ),
                            React.createElement(
                                "option",
                                { value: "Maryland" },
                                "Maryland"
                            ),
                            React.createElement(
                                "option",
                                { value: "Massachusetts" },
                                "Massachusetts"
                            ),
                            React.createElement(
                                "option",
                                { value: "Michigan" },
                                "Michigan"
                            ),
                            React.createElement(
                                "option",
                                { value: "Minnesota" },
                                "Minnesota"
                            ),
                            React.createElement(
                                "option",
                                { value: "Mississippi" },
                                "Mississippi"
                            ),
                            React.createElement(
                                "option",
                                { value: "Missouri" },
                                "Missouri"
                            ),
                            React.createElement(
                                "option",
                                { value: "Montana" },
                                "Montana"
                            ),
                            React.createElement(
                                "option",
                                { value: "Nebraska" },
                                "Nebraska"
                            ),
                            React.createElement(
                                "option",
                                { value: "Nevada" },
                                "Nevada"
                            ),
                            React.createElement(
                                "option",
                                { value: "New Hampshire" },
                                "New Hampshire"
                            ),
                            React.createElement(
                                "option",
                                { value: "New Jersey" },
                                "New Jersey"
                            ),
                            React.createElement(
                                "option",
                                { value: "New Mexico" },
                                "New Mexico"
                            ),
                            React.createElement(
                                "option",
                                { value: "New York" },
                                "New York"
                            ),
                            React.createElement(
                                "option",
                                { value: "North Carolina" },
                                "North Carolina"
                            ),
                            React.createElement(
                                "option",
                                { value: "North Dakota" },
                                "North Dakota"
                            ),
                            React.createElement(
                                "option",
                                { value: "Ohio" },
                                "Ohio"
                            ),
                            React.createElement(
                                "option",
                                { value: "Oklahoma" },
                                "Oklahoma"
                            ),
                            React.createElement(
                                "option",
                                { value: "Oregon" },
                                "Oregon"
                            ),
                            React.createElement(
                                "option",
                                { value: "Pennsylvania" },
                                "Pennsylvania"
                            ),
                            React.createElement(
                                "option",
                                { value: "Rhode Island" },
                                "Rhode Island"
                            ),
                            React.createElement(
                                "option",
                                { value: "South Carolina" },
                                "South Carolina"
                            ),
                            React.createElement(
                                "option",
                                { value: "South Dakota" },
                                "South Dakota"
                            ),
                            React.createElement(
                                "option",
                                { value: "Tennessee" },
                                "Tennessee"
                            ),
                            React.createElement(
                                "option",
                                { value: "Texas" },
                                "Texas"
                            ),
                            React.createElement(
                                "option",
                                { value: "Utah" },
                                "Utah"
                            ),
                            React.createElement(
                                "option",
                                { value: "Vermont" },
                                "Vermont"
                            ),
                            React.createElement(
                                "option",
                                { value: "Virginia" },
                                "Virginia"
                            ),
                            React.createElement(
                                "option",
                                { value: "Washington" },
                                "Washington"
                            ),
                            React.createElement(
                                "option",
                                { value: "West Virginia" },
                                "West Virginia"
                            ),
                            React.createElement(
                                "option",
                                { value: "Wisconsin" },
                                "Wisconsin"
                            ),
                            React.createElement(
                                "option",
                                { value: "Wyoming" },
                                "Wyoming"
                            )
                        ),
                        React.createElement(
                            "label",
                            null,
                            "State"
                        )
                    )
                ),
                React.createElement(
                    "button",
                    { className: "btn waves-effect waves-light", type: "submit" },
                    "Submit",
                    React.createElement(
                        "i",
                        { className: "material-icons right" },
                        "send"
                    )
                ),
                React.createElement("br", null),
                React.createElement("br", null)
            ),
            React.createElement(BreweryData, { data: myArray })
        );
    }
});

var BreweryData = React.createClass({
    displayName: "BreweryData",
    render: function render() {
        if (!this.props.data) {
            return null;
        }
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col s12" },
                this.props.data.map(function (data) {
                    if (data.status === "verified") {
                        return React.createElement(
                            "div",
                            { key: data.brewery.id },
                            function () {
                                if (!data.brewery.images) {} else {
                                    return React.createElement(
                                        "div",
                                        null,
                                        React.createElement("img", { src: data.brewery.images.large })
                                    );
                                }
                            }(),
                            React.createElement(
                                "h4",
                                null,
                                React.createElement(
                                    "a",
                                    { href: data.brewery.website },
                                    data.brewery.name
                                )
                            ),
                            React.createElement(
                                "ul",
                                null,
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "b",
                                        null,
                                        "Description: "
                                    ),
                                    " ",
                                    data.brewery.description
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "b",
                                        null,
                                        "Year Established: "
                                    ),
                                    " ",
                                    data.brewery.established
                                ),
                                function () {
                                    if (!data.streetAddress) {
                                        return React.createElement(
                                            "li",
                                            null,
                                            React.createElement(
                                                "b",
                                                null,
                                                "Address: "
                                            ),
                                            " No Address Information"
                                        );
                                    } else {
                                        return React.createElement(
                                            "li",
                                            null,
                                            React.createElement(
                                                "b",
                                                null,
                                                "Address: "
                                            ),
                                            " ",
                                            data.streetAddress,
                                            " ",
                                            data.locality,
                                            " ",
                                            data.region,
                                            " ",
                                            data.postalCode
                                        );
                                    }
                                }()
                            ),
                            React.createElement("hr", null),
                            React.createElement("br", null)
                        );
                    } else {
                        return null;
                    }
                })
            )
        );
    }
});
ReactDOM.render(React.createElement(Breweries, { name: "Breweries" }), document.getElementById('container'));

},{}]},{},[1]);
