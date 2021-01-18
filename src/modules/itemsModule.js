import React, { Component } from 'react'

import ItemsList from "../components/item-list";
import ItemForm from "../components/item-create";

export default class itemsModule extends Component {
    render() {
        return (
            <div>
                <ItemForm />
                <hr />
                <ItemsList />
                
            </div>
        )
    }
}