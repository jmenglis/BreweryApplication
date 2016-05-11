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
            console.log("what");
            return null;
        }
        return React.createElement(
            "div",
            { className: "BreweryList" },
            myArray.map(function (brewery) {
                return React.createElement(
                    "div",
                    { key: brewery.id },
                    React.createElement(
                        "h3",
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
                        )
                    )
                );
            })
        );
    }
});
ReactDOM.render(React.createElement(Breweries, { url: "/home/getbrewery", name: "Breweries" }), document.getElementById('container'));

},{}]},{},[1]);
