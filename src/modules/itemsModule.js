import React, { Component } from 'react'

import ItemsList from "../components/item-list";

export default class itemsModule extends Component {
    render() {
        return (
            <div>
                <ItemsList />
                <hr />
            </div>
        )
    }
}