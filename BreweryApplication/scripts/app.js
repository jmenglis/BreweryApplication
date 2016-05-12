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
            breweryArray: []
        };
    },
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.data);
    },
    componentDidMount: function componentDidMount() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                var final = JSON.parse(data);
                var self = this;
                final.data.forEach(function (myArray) {
                    var breweryArray = self.state.breweryArray.slice();
                    breweryArray.push(myArray.brewery);
                    self.setState({ breweryArray: breweryArray });
                });
            }.bind(this),
            error: function (err) {
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
                "form",
                { onSubmit: this.handleSubmit, className: "col s12" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "input-field col s6" },
                        React.createElement("input", { id: "locality", type: "text", className: "validate" }),
                        React.createElement(
                            "label",
                            { htmlFor: "locality" },
                            "City/Town"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "input-field col s6" },
                        React.createElement("input", { id: "state", type: "text", className: "validate" }),
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
                )
            ),
            React.createElement(
                "div",
                { className: "row" },
                myArray.map(function (brewery) {
                    return React.createElement(
                        "div",
                        { key: brewery.id },
                        React.createElement(
                            "h4",
                            null,
                            brewery.name
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
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "b",
                                    null,
                                    "Website: "
                                ),
                                " ",
                                brewery.website
                            )
                        )
                    );
                })
            )
        );
    }
});
ReactDOM.render(React.createElement(Breweries, { name: "Breweries" }), document.getElementById('container'));

},{}]},{},[1]);
