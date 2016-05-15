(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

window.onload = function () {
    console.log("The document is loaded.");
    console.log("React is ready to perform its duties.");

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
            theState: '',
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
    handleSubmit: function handleSubmit(e) {
        console.log(this.state);
        this.state.breweryArray = [];
        e.preventDefault();
        $.ajax({
            url: "http://localhost:4495/Home/GetBrewery",
            data: JSON.stringify(this.state),
            dataType: "json",
            type: "POST",
            success: function (data) {
                var final = JSON.parse(data);
                console.log(final);
                var self = this;
                final.data.forEach(function (myArray) {
                    var breweryArray = self.state.breweryArray.slice();
                    breweryArray.push(myArray.brewery);
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
        if (!this.state.breweryArray) {
            return null;
        }
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
                        React.createElement("input", { id: "state", type: "text", onChange: this.handleState, value: this.state.theState, className: "validate" }),
                        React.createElement(
                            "label",
                            { htmlFor: "state" },
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
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col s12" },
                    myArray.map(function (brewery) {
                        return React.createElement(
                            "div",
                            { key: brewery.id },
                            React.createElement(
                                "h4",
                                null,
                                React.createElement(
                                    "a",
                                    { href: brewery.website },
                                    brewery.name
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
                                    brewery.description
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
                                    brewery.established
                                )
                            ),
                            React.createElement("br", null)
                        );
                    })
                )
            )
        );
    }
});
ReactDOM.render(React.createElement(Breweries, { name: "Breweries" }), document.getElementById('container'));

},{}]},{},[1]);
