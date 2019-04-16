import React, { Component } from 'react';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {      // Have a products and loading
            products: [],   // products holding all your products
            loading: true   // loading for when loader is shown. Set it true, and when data is retrieve set to false.
        }
    }
}