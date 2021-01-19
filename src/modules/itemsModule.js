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