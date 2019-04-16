import React from 'react';
import './ProductCard.css';

const ProductCard = (props) => {    // Don't forget to pass props to the stateless component as an argument.
    const {name, price} = props;
    return (
        <div className='product-card container'>
            <div>
                <p className='product-card label'>{name}</p>
                <p className='product-card label'>${price}</p>
            </div>
        </div>
    );
};

export default ProductCard;