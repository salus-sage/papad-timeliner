import React from 'react';
import './Papad.scss';
import { useHistory, withRouter } from "react-router-dom";
import { Dropdown } from 'primereact/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faTag } from '@fortawesome/free-solid-svg-icons'
import Root from '../../containers/Root/Root';
import configureStore from '../../store/main';
import * as qs from 'query-string';

class Papad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            car2: '',
            recordData: [],
            channelData: []
        };
    }
    componentDidMount() {
        this.getRecordData()
        this.getStationChannel()
    }
    getRecordData = (e => {
        fetch('http://papad-api.test.openrun.net/recordings/')
            .then(res => res.json())
            .then((data) => {
                this.setState({ recordData: data })
            })
            .catch(console.log)
    })
    getStationChannel = (e => {
        fetch('http://papad-api.test.openrun.net/channels/')
            .then(res => res.json())
            .then((data) => {
                data.map(item => {
                    item.label = item.station_name
                    item.value = item.station_name
                    this.setState({ channelData: data })
                })
            })
            .catch(console.log)
    })
    onCarChange2 = e => {
        this.setState({ car2: e.value });
    }
    carTemplate = (option) => {
        if (!option.value) {
            return option.label;
        }
        else {
            let logoPath = option.station_image;
            return (
                <div className="p-clearfix">
                    <img alt={option.label} src={logoPath} srcSet={logoPath} style={{ display: 'inline-block', margin: '5px 0 0 5px' }} width="24" />
                    <span style={{ float: 'right', margin: '.5em .25em 0 0' }}>{option.label}</span>
                </div>
            );
        }
    };
    playAudio = (value) => {

        const {
            resource,
            save,
            callback,
            noFooter,
            noHeader,
            noSourceLink,
            ...hash
        } = qs.parse(location.hash);

        // Set the hash back
        location.hash = qs.stringify({
            resource,
            save,
            callback,
            noFooter,
            noHeader,
            noSourceLink,
            ...hash,
        });

        const { store, persistor } = configureStore(
            resource,
            typeof save === 'undefined',
            callback
        );
        this.props.history.push("/papad_details",value);
        console.log(value)
    }
    render() {
        return (
            <div className="papad">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#" style={{ color: "white", marginLeft: "1em", fontSize: "1em" }}><img src="https://i.ibb.co/9NFPwLs/papadsmal.png" alt="PAPAD" style={{ width: "50px", height: "50px", marginLeft: "2em", marginRight: ".5em" }} /><b>PAPAD</b></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <form className="form-inline">
                            {/* <label className="channel_label">Channel</label> */}
                            <Dropdown value={this.state.car2} options={this.state.channelData} onChange={this.onCarChange2} itemTemplate={this.carTemplate} style={{ width: '12em' }}
                                filter={true} placeholder="Select a Channel" filterPlaceholder="Select Car" filterBy="label,value" showClear={true} />
                        </form>
                    </div>
                </nav>
                <div className="row ml-2 mt-4">

                    {this.state.recordData.map((val, idx) => (

                        <div className="card" >
                            <img className="card-img-top img-fluid" src={val.img_tags} alt="Card image cap" style={{ height: "110px" }} />
                            <div className="card-body" >
                                <FontAwesomeIcon icon={faTag} className="icons" />
                                <FontAwesomeIcon icon={faPlay} value={val} className="icons" style={{ float: "right" }} onClick={(e) => this.playAudio(val.audio_url)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default withRouter(Papad);