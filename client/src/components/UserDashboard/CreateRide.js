import React, { useRef, useState, useEffect, useContext } from "react";
import { StandaloneSearchBox, useLoadScript, GoogleMap, DirectionsRenderer,DirectionsService,google } from "@react-google-maps/api";
import Toast from 'react-bootstrap/Toast';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Form, Col, Row, Button, FormControl } from 'react-bootstrap';
import DashNav from './DashNav';
import Sidebar from './Sidebar';
import './CreateRide.css';
import Home from '../Home';
import contractContext from '../../utils/contractContext';
let o,d,dd,ad,kc,cost;
let startLat, startLng, endLat, endLng,distance ;

function CreateRide({ user }) {
    const [setOrigin] = useState();
    const [setDestination] = useState();
    const libraries = ["places","geometry"];
    const [rideData, setRideData] = useState({
        driveCost: cost, 
        kmCost: 1,
        capacity: 1,  
        originAddress: '',  
        destAddress: '', 
        year: new Date().getFullYear(),
        month: new Date().getMonth()+1,
        day: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
    });

    const handleOriginAdd=(value) => {
        const updateData ={
            ...rideData,
            originAddress:value
        }
        setRideData(updateData);
        
    }

    const handleDestinationAdd=(value) => {
        const updateData ={
            ...rideData,
            destAddress:value
        }
        setRideData(updateData);
        
    }

    const AutocompleteInput = ({  setRideData, setDestination, name,driveDist,location ,value , onChange}) => {
        const [inputValue, setInputValue] = useState(value);
        const inputRef = useRef(null);

        // useEffect((event)=> {
        //     event.preventDefault();
        //    
        // });


        const { isLoaded, loadError } = useLoadScript({
          googleMapsApiKey: "AIzaSyAuGLzaNRFclsIfbMGBuZKTPSd7pjeI0xE",
          libraries
         
        });          
        
        const handlePlaceChanged = (place, name) => {

            //vicinity formatted_address
            
            console.log(place)
            //console.log("Before",rideData);
            onChange(place.formatted_address);
            //console.log("After",rideData);
            if (name === "originAddress"){
                console.log(name,place.vicinity)
                o = place.vicinity;
                startLat = place.geometry.location.lat();
                startLng = place.geometry.location.lng();
                console.log(startLat,startLng);
            }
            else{
                console.log(name,place.vicinity)
                d = place.vicinity;
                endLat = place.geometry.location.lat();
                endLng = place.geometry.location.lng();
                console.log(endLat,endLng);
            } 
            // document.getElementById("formBasicPickUp").value = o
            // document.getElementById("formBasicDestination").value = d
        
            // console.log(startLat,startLng);
            // console.log(endLat,endLng);
            const directionsService = new window.google.maps.DirectionsService();
            const origin = new window.google.maps.LatLng(startLat, startLng);
            const destination = new window.google.maps.LatLng(endLat, endLng);
            directionsService.route(
              {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  distance = result.routes[0].legs[0].distance.text;
                  place.distance = distance;
                  console.log(place.distance);
                  document.getElementById("formBasicDist").value = place.distance
                  dd = place.distance;
                  ad = dd.slice(0,-3);
                  console.log(ad);
                  
        
                //   document.getElementById("formBasicPickUp").value = o
                //   document.getElementById("formBasicDestination").value = d
                
                //   console.log(dist.tagName)
                //   dist.InnerHTML.value = place.distance
                  setRideData(prevState => ({
                    ...prevState,
                    driveDist: dd
                  }));
                } else {
                  console.log(`Directions request failed due to ${status}`);
                }
              }
            );

          };

          const handleInputChange = (e) => {
            console.log("Selecting Address:",rideData);
           
            setInputValue(e.target.value);
            
          };
        
          if (loadError) return "Error loading maps";
          if (!isLoaded) return "Loading Maps";
        
          return (
            <div className="col-md-9 ">
              <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)}
                onPlacesChanged={() => handlePlaceChanged(inputRef.current.getPlaces()[0],name)}
              >
                <input
                  type="text"
                  id="autocomplete"
                  className="form-control"
                  placeholder="Enter Location"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </StandaloneSearchBox>
            </div>
          );
        };

        const handleOriginSelect = e => {
            const { name, value } = e.target
            console.log(name,value)
            // console.log(place)
            // setOrigin(place.vicinity)
            setRideData(prevState => ({
              ...prevState,
              originAddress: value
            }));
          };
          const handleDestSelect = e => {
            const { name, value } = e.target
            console.log(name,value)
            setRideData(prevState => ({
              ...prevState,
              destAddress: value
            }));
          };
    const { createRide, getTotalRideCount, currentAccount, accountBalance, checkWalletIsConnected, connectWalletHandler, checkWalletConnected } = useContext(contractContext);
    

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState();
    const f = 50*2;



    
    const handleFareChange = (e) => {
        // console.log(o,d)
        ad = parseFloat(ad);
        kc = parseFloat(e.target.value)
        console.log(typeof kc ,kc)
        console.log(typeof ad ,ad)
        cost = Math.ceil(kc*ad)
        console.log(cost)
        document.getElementById("formActualFair").value = cost
        

        const updateData ={
            ...rideData,
            kmCost:e.target.value

        }
        setRideData(updateData);
      
    }
    // const handlekmChange = e => {
    //     const { name, value } = e.target
    //     kc = parseInt(value)
    //     dc = ad*kc
    //     console.log(value)
    //     document.getElementById("formActualFair").value = dc
    //     setRideData({
    //         ...rideData,
    //         kmCost: value
    //     })
    // }
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value)
        setRideData((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
      



    const onCreateRide = (e) => {
        e.preventDefault();


        
        let {driveCost, capacity, originAddress, destAddress, year, month, day, hours, minutes, seconds,driveDist,kmCost,actualDist} = rideData;
        originAddress = o;
        destAddress = d;
        // actualDist = dd.slice(0,-3);
        // kmCost = parseFloat(kmCost);
        driveCost = cost
        
        // document.getElementById("formActualFair").value = driveCost;
        // driveDist = dd;
        console.log(driveCost, capacity, originAddress, destAddress, year, month, day, hours, minutes, seconds,kmCost)
        // if (driveCost && capacity && originAddress && destAddress && departAt) {
        if (year==='' || month==='' ||   day==='' || hours==='' || minutes==='' ||   seconds==='' 
        || driveCost===undefined || capacity==='' || originAddress===undefined || destAddress===undefined){
             
        console.log(driveCost, capacity, originAddress, destAddress, year, month, day, hours, minutes, seconds,driveDist)
        alert("invlid input")
        
        // console.log(selectedDate)

    } else {
        const userDate = new Date(year, month, day, hours, minutes, seconds);
        console.log(typeof originAddress)
        const departAt = userDate.getTime();
        createRide(driveCost, capacity, originAddress, destAddress, departAt);
        console.log(driveCost, capacity, originAddress, destAddress, departAt)
        alert("ride created")
        
            
        }
    }


    connectWalletHandler()
    getTotalRideCount()
    // createRide(10, 2, "Barshi", "Aurangabad", 1000)


    if (localStorage.getItem('mobile_no')) {
        return (
            <div>
                
                <DashNav sidebar={sidebar} showSidebar={showSidebar} user={user} />
                <Sidebar sideNav={sidebar} />
                <div id="createRide" className={sidebar ? 'createRide active' : 'createRide'}>
                    
                    <Container>
                        <Col xs={12} lg={12} className="top-heading">
                            <Form style={{
                                backgroundColor: "#FFFFFF",
                                color: "black",
                                borderRadius: "3px",
                                width: "550px",
                                margin: "50px auto"
                            }}
                                className="rideForm"
                                onSubmit={onCreateRide}
                                >

                                <b style={{ color: "black", fontWeight: "700", fontSize: "23px" }}>Create a Ride to your destination in town</b>

                                <Form.Group className="mt-4" controlId="formBasicDate">
                                    <Row>

                                        <Col md={3} xs={12}>
                                            <Form.Label>Date</Form.Label>
                                        </Col>
                                        <Col md={3} xs={12}>
                                            <Form.Label>Year</Form.Label> 
                                            <Form.Control type="number" placeholder="Year" name="year" className="rideInput" min="2022" max="2050" onChange={handleChange} value={rideData.year} />
                                        </Col>
                                        <Col md={3} xs={12}>
                                            <Form.Label>Month</Form.Label> 
                                            <Form.Control type="number" placeholder="Month" name="month" className="rideInput" min="1" max="12" onChange={handleChange} value={rideData.month} />
                                        </Col>
                                        <Col md={3} xs={12}>
                                        <Form.Label>Day</Form.Label> 
                                            <Form.Control type="number" placeholder="Day" name="day" className="rideInput" min="1" max="31" onChange={handleChange} value={rideData.day} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className="mt-4" controlId="formBasicTime">
                                    <Row>

                                        <Col md={3} xs={12}>
                                            <Form.Label>Time</Form.Label>
                                        </Col>
                                        <Col md={3} xs={12}>
                                            <Form.Label>Hours(24 hour)</Form.Label> 
                                            <Form.Control type="number" placeholder="Hours" name="hours" className="rideInput" min="0" max="23" onChange={handleChange} value={rideData.hours} />
                                        </Col>
                                        <Col md={3} xs={12}>
                                            <Form.Label>Minutes</Form.Label> 
                                            <Form.Control type="number" placeholder="Minutes" name="minutes" className="rideInput" min="0" max="59" onChange={handleChange} value={rideData.minutes} />
                                        </Col>

                                    </Row>
                                </Form.Group>
                                <Form.Group className="mt-4" controlId="formBasicPickUp">
                                        <Row>
                                            <Col md={3} xs={12}>
                                            <Form.Label>Source</Form.Label>
                                            </Col>
                                            <Col md={9} xs={12}>
                                            <AutocompleteInput  onPlaceChanged={handleOriginSelect} name="originAddress" value={rideData.originAddress} onChange={handleOriginAdd} >

                                            </AutocompleteInput>
                                            </Col>
                                        </Row>
                                        </Form.Group>

                                        <Form.Group className="mt-4" controlId="formBasicDestination">
                                        <Row>
                                            <Col md={3} xs={12}>
                                            <Form.Label>Destination</Form.Label>
                                            </Col>
                                            <Col md={9} xs={12}>
                                            <AutocompleteInput onPlaceChanged={handleDestSelect}  className="rideInput" name="destAddress" value={rideData.destAddress} onChange={handleDestinationAdd}>

                                            </AutocompleteInput>
                                            </Col>
                                        </Row>
                                        </Form.Group>

                                        <Form.Group className="mt-4" controlId="formBasicDist">
                                        <Row>
                                            <Col md={3} xs={12}>
                                            <Form.Label>Distance</Form.Label>
                                            </Col>
                                            <Col md={9} xs={12}>
                                            <Form.Control type="text" placeholder="Distance" className="Form-control" name="driveDist" value={rideData.driveDist} readOnly  />
                                            </Col>
                                        </Row>
                                        </Form.Group>
                                <Form.Group className="mt-4" controlId="formBasicFair">
                                <Row>
                                        <Col md={3} xs={12}>
                                            <Form.Label>Fare per KM</Form.Label>
                                        </Col>
                                        <Col md={9} xs={12}>
                                            <Form.Control type="number" placeholder="Enter Fare per km" className="Form-control" name="kmCost" value={rideData.kmCost} onChange={handleFareChange}/>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className="mt-4" controlId="formActualFair">
                                <Row>
                                        <Col md={3} xs={12}>
                                            <Form.Label>Actual Fare(₹)</Form.Label>
                                        </Col>
                                        <Col md={9} xs={12}>
                                            <Form.Control type="number" placeholder="Calculated  Fair Price" className="Form-control" name="driveCost" value={rideData.driveCost} onChange={handleChange} readOnly />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group className="mt-4" controlId="formBasicSelect">
                                    <Row>
                                        <Col md={3} xs={12}>
                                            <Form.Label>No of Seats</Form.Label>
                                        </Col>
                                        <Col md={9} xs={12}>
                                            <Form.Select aria-label="Default select example" className="rideInput" name="capacity" value={rideData.capacity} onChange={handleChange}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Button className="rideButton" type="submit">
                                    Create Ride
                                </Button>
                            </Form>
                        </Col>
                        
                    </Container>
                </div>
                
            </div>
            
        );
    } else {
        return <Home />
    }
}

export default CreateRide;