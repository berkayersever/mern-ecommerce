import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/container/Home/Home';
import About from './components/container/About/About';
import Cart from './components/container/Cart/Cart';

export default (    //When dealing with default exports we do not even need to name the export since when it is imported we can name it whatever we want.
    <Switch>
        {/*Use the exact keyword means it will direct to that exact route, and used primarily when creating sub routes. */}
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About}/>
        <Route path='/cart' component={Cart}/>
    </Switch>
)