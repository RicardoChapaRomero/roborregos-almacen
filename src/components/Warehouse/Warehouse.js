import React, { Component } from 'react';
import WarehouseComponents from './WarehouseComponents/WarehouseComponents.js';
import warehouseData from '../../data/components.json';
import './Warehouse.css';

class Warehouse extends Component { 
    render() {
        return(
            <div className = "warehouse_contanier">
                <WarehouseComponents components = { warehouseData.components } />
            </div>
        );
    }
}
export default Warehouse;
