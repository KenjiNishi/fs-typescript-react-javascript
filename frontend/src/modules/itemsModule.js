/** 
 *  Author: Willian Kenji Nishizawa 
 *  GitHub: github.com/KenjiNishi
 * 
 *  I'm defining modules as a group of related components that will be in the same route (page);
 * eg. ItemList and ItemForm
 * 
 *  Initially I planned to link the ItemList to the OrderCreate form so only items registered in ItemList
 * would be accepted inside OrderCreate. Due to time constraints I gave up on the idea. So this module
 * is a showcase of CRUD functionality.
 * 
 */

import React, { Component } from 'react'

import ItemsList from "../components/item-list";
import ItemForm from "../components/item-create";

export default class itemsModule extends Component {
    render() {
        return (
            <div className="container">
                <hr />
                <ItemForm />
                <hr />
                <ItemsList />
                <hr />
            </div>
        )
    }
}