import React, { Component } from 'react';
import axios from 'axios';                                                      // Import axios to call your backend.
import ProductCard from '../../presentational/ProductCard/ProductCard';
import Loader from '../../presentational/Loader/Loader';
import './Home.css';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {                                                          // Have a products and loading
            products: [],                                                       // products holding all your products
            loading: true                                                       // loading for when loader is shown. Set it true, and when data is retrieve set to false.
        }
    }
    componentDidMount() {
        axios.get('/api/products').then(res => {
            console.log('res.data products-----------', res.data);
            this.setState({products: res.data, loading: false});                // Set your loading to false, and products to the res.data, since we are doing res.send in our backend.
        }).catch(err => console.log('Read all products Error-------', err));    // Each .then must have a .catch to catch errors.
    }
    render() {
        const { products, loading } = this.state;                               // Destruct the products, loading from state.
        if(!loading) {                                                          // If it is done loading return html else return the loading indicator.
            return (
                <div className='home container'>
                    <div className='home-products container'>
                        {/* If the products have data return products else return nothing using ternary statement */}
                        {products.length ? products.map(product => <ProductCard key={product.id} {...product} />) : null}
                    </div>
                </div>
            );
        } else {
            return <Loader />
        }
    }
}