import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SingleComponent from './SingleComponent/SingleComponent.js';
import './WarehouseComponents.css';

class WarehouseComponents extends Component {
    constructor(props) {
        super(props);    

        this.components = props.components;

        this.resolveFilter = this.resolveFilter.bind(this); 
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: 'All'
        }
    }

    resolveFilter(section) {
        let values = ["component","sensors","motors","microcontrollers"];
        if(section === "All") {
            return(
                values.map((element,index) => (
                   this.components[element].map((component, i) => (
                        <Col sm='4' md='3' key={ i } className='component-col'>
                            <SingleComponent
                                component =  { component }
                                section = { element }
                            />
                        </Col>
                    ))
                ))
            );
        }
        else {
            return(
                this.components[section].map((component, i) => (
                    <Col sm='4' md='3' key={ i } className='component-col'>
                        <SingleComponent
                            component =  { component }
                            section = { section }
                        />
                    </Col>
                ))
            );
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return(
            <div className= "WareHouseComponent_container">
                <Container fluid = "md">
                    <Col lg= { true }>
                        <label className = "search_filter_label" htmlFor = "search_filter">Filter by component type: </label>
                        <select className= "search_filter" onChange = { this.handleChange } value = { this.state.value }> 
                            <option value = "All"> All </option>
                            <option value = "component"> Circuit Component </option>
                            <option value = "sensors"> Sensors </option>
                            <option value = "motors"> Motors </option>
                            <option value = "microcontrollers"> Microcontrollers </option>
                        </select>
                        <br/>
                        <br/>
                        <Row className= 'justify-content-sm-left'>
                            { this.resolveFilter(this.state.value) }
                        </Row>
                    </Col>
                </Container>
            </div>
        );
    }
}
export default WarehouseComponents;