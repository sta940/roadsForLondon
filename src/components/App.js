import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRoad, fetchData, setActiveRoad } from '../actions/act';
import { MenuItem, Nav} from "react-bootstrap";
import '../styles/App.css';

class Road extends Component {
    constructor(props) {
        super(props);
        this.statusSeverity = this.statusSeverity.bind(this);
    }

    collectData(road) {
        if (this.props.roads.length !== 0) {
            let URL = `https://api-neon.tfl.gov.uk/Road/${this.props.roads[road].id}?app_id=d5a6071a&app_key=4603710fa32411663094f337eef8c5a2`;
            this.props.fetchRoad(URL);
        }
        else{
            let URL = `https://api-neon.tfl.gov.uk/Road/a1?app_id=d5a6071a&app_key=4603710fa32411663094f337eef8c5a2`;
            this.props.fetchRoad(URL);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeRoad !== nextProps.activeRoad) {
            this.collectData(nextProps.activeRoad);
        }
    }

    componentDidMount() {
        this.collectData(this.props.activeRoad);
    }

    statusSeverity(status){
        if(status==="Good"){
            return <img src={require('../img/open.png')} alt="" />
        }
        else if (status==="Closure"){
            return <img src={require('../img/Close.png')} alt="" />
        }
    }

    render() {
        let roadData = this.props.roadData;
        if (roadData[0] !== undefined) {
            return (
                <div>
                    <h1>
                        { roadData[0].displayName}
                    </h1>
                    <p>
                        Status severity: {roadData[0].statusSeverity}
                    </p>
                    <p>
                        Status severity description: {roadData[0].statusSeverityDescription}
                    </p>
                    {roadData[0].group !== undefined &&
                        <p>
                            Group: {roadData[0].group}
                        </p>
                    }
                    {this.statusSeverity(roadData[0].statusSeverity)}
                </div>
            );
        }
        return (
            <div>
                Loading...
            </div>
        );

    }
}

class App extends Component {
    collectData() {
        let roadsURL = `https://api-neon.tfl.gov.uk/Road?app_id=d5a6071a&app_key=4603710fa32411663094f337eef8c5a2`;
        this.props.fetchData(roadsURL);
    }

    componentDidMount() {
        this.collectData();
    }

    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-expand-md navbar-light">
                    <div className="collapse navbar-collapse">
                        <span className="navbar-brand">Roads of London</span>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <Nav
                                bsStyle="pills"
                                stacked
                                activeKey={this.props.activeRoad}
                                onSelect={(index) => {
                                    this.props.setActiveRoad(index);
                                }}>
                                    {this.props.roads.map((road, index) => (
                                        <MenuItem key={index} eventKey={index}>{road.displayName}</MenuItem>
                                    ))}
                            </Nav>
                        </div>
                        <div className="col-sm-8">
                            <Road key={0} roads={this.props.roads} roadData={this.props.roadData} activeRoad={this.props.activeRoad} fetchRoad={this.props.fetchRoad} />
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        roadData: state.roadData,
        activeRoad: state.activeRoad,
        roads: state.roads
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchData(url)),
        fetchRoad: (url) => dispatch(fetchRoad(url)),
        setActiveRoad: (index) => dispatch(setActiveRoad(index))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(App);

