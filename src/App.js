import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,Checkbox,Radio,
    Grid,Row,Col,Table, Modal
} from 'react-bootstrap';
class App extends Component {
    state = {
        name: "",
        Fname:"",
        address:"",
        gender:"",
        liscense: "",
        bike:[],
        purpose:"",
        records:[],

        show:false,
        sname: "",
        sFname:"",
        saddress:"",
        sgender:"",
        sliscense: "",
        sbike:[],
        spurpose:""
    };
    componentDidMount(){
        this.refreshData();
    }

     refreshData=()=>{
         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })
             }).catch((error)=> {
             });
     };
    onChange = (fieldName)=> {
        return (event)=> {
            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);
            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };

    saveSurvey = ()=> {
        var data = this.state;
         delete data.records;
        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
                alert("Rent Information has been Saved.");
                location.reload();
            }).catch((error)=> {
            });
    };

    deleteItem = (id)=>{
        return ()=>{
            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {
                    alert("Rent List ID: "+id+" has been deleted.")
                    this.refreshData();
                }).catch((error)=> {
                });
        };
    };

    modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedRecommend;
            state[fieldName] = targetArray;
            this.setState(state.selectedRecommend);
        }
    };  

    editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        liscense: data.liscense
                    })
                }).catch((error)=>{
                    
                });
        };
    };

    openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        sname: data.name,
                        sFname: data.Fname,
                        saddress: data.address,
                        sgender: data.gender,
                        sliscense: data.liscense,
                        sbike: data.bike,
                        spurpose: data.purpose,
                        selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };

        saveEdit = (id) =>{

        return () => {
            console.log(data);
            var data = {name:this.state.sname,
                        Fname:this.state.sFname,
                        address:this.state.saddress,
                        gender:this.state.sgender,
                        liscense:this.state.sliscense,
                        bike:this.state.sbike,
                        purpose:this.state.spurpose};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                    alert("Rent ID: "+id+" has been edited and saved.");
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                    sname: "",
                    sFname: "",
                    saddress: "",
                    sgender: "",
                    sliscense: "",
                    sbike: [],
                    spurpose: "",
            });
        }
    };


    render() {
        var rows  = this.state.records.map((item,i)=>{
            return (
                <tr key={i}>
                     <td><Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>&nbsp;Delete&nbsp;</Button>
                         &emsp;<Button bsSize="xsmall" bsStyle="success" onClick={this.openModal(item.id)}>&emsp;Edit&emsp;</Button>
                     </td>
                     <td>{item.id}</td>
                     <td>{item.name}</td>
                    <td>{item.Fname}</td>
                    <td>{item.address}</td>
                    <td>{item.gender}</td>
                     <td>{item.liscense}</td>   
                     <td>{
                         item.bike.map((bike, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-info">{bike}</span>
                                 </div>
                         })
                      }
                     </td>
   
                 
                     <td>{item.purpose}</td>
                </tr>
            );
        });

let close =() => this.setState({show:false})

{/*START OF FORM--------------------------------------------------------------*/}
        return (
            <div className="container">
                <div className="page-header">
                    <div className="header-logo" />
                </div>
                <div className="jumbotron">
                    <Grid>
                        <Row>
                            <Col>
                            <div className="formback">
                                <Form>
                                    <FormGroup>
                                        <ControlLabel>Name:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder=" Your name..."
                                            className="tsize"
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                       
                                    </FormGroup>
                                    <FormGroup>
                                    
                                        <ControlLabel>Last Name:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder=" Your Last name..."
                                            className="tsize"
                                            value={this.state.Fname}
                                            onChange={this.onChange('Fname')}
                                            />
                                        
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder=" Your address..."
                                            className="tsize"
                                            value={this.state.address}
                                            onChange={this.onChange('address')}
                                            />
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="gender" value="Male"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="Female"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                       
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Liscense Type:</ControlLabel>
                                        <FormControl componentClass="select"
                                                   className="tsize"
                                                     value={this.state.liscense}
                                                     onChange={this.onChange('liscense')}
                                            >
                                            
                                            <option value="SP">SP</option>
                                            <option value="Non-Professional">Non-Professional</option>                                           
                                            <option value="Professional">Professional</option>
                                        </FormControl>
                                        
                                    </FormGroup>
                                
                                    
                                    
                                    <FormGroup>
                                        <ControlLabel>Available Bikes for Rent. <br/>Choose bike(s).</ControlLabel>
                                        <Checkbox value="Honda CBR1000RR"
                                                  checked={this.state.bike.indexOf('Honda CBR1000RR')>=0 ? true:false}
                                                  onChange={this.checkboxChange('bike')}>
                                           Honda CBR1000RR
                                        </Checkbox> 
                                        <Checkbox value="Honda XR200R"
                                                  checked={this.state.bike.indexOf('Honda XR200R')>=0 ? true:false}
                                                  onChange={this.checkboxChange('bike')}>
                                          Honda XR200R
                                        </Checkbox>
                                        <Checkbox value="Honda CBR150R"
                                                  checked={this.state.bike.indexOf('Honda CBR150R')>=0 ? true:false}
                                                  onChange={this.checkboxChange('bike')}>
                                       Honda CBR150R
                                       
                                        </Checkbox>
                                        <Checkbox value="Honda CBR400"
                                                  checked={this.state.bike.indexOf('Honda CBR400')>=0 ? true:false}
                                                  onChange={this.checkboxChange('bike')}>
                                     Honda CBR400
                                        </Checkbox>
                                        <Checkbox value="Honda CBR650F"
                                                  checked={this.state.bike.indexOf('Honda CBR650F')>=0 ? true:false}
                                                  onChange={this.checkboxChange('bike')}>
                                      Honda CBR650F
                                       
                                        </Checkbox>
                                        <Checkbox value="CBR600RR"
                                                  checked={this.state.bike.indexOf('CBR600RR')>=0 ? true:false}
                                                  onChange={this.checkboxChange('bike')}>
                                     CBR600RR
                                       
                                        </Checkbox>
                                    </FormGroup>
                                    
                                    
                                    
                                    <FormGroup>
                                        <ControlLabel> Rent Purposes: </ControlLabel><br/>
                                        <textarea
                                            className="comtext"
                                            type="textarea"
                                            placeholder=" Write your purpose(s) here..."
                                            value={this.state.purpose}
                                            onChange={this.onChange('purpose')}
                                        />
                                    </FormGroup>
                                    <ButtonGroup>
                                    
                                        <Button bsStyle="primary" onClick={this.saveSurvey}>Save Form</Button>
                                    </ButtonGroup>
                                    
                                    
                                    
                                    
                                </Form>
                                </div>
                            </Col>
                            <hr></hr>
                            <h2>Rent List</h2>

                                <Table condensed striped bordered hover className="sList">
                                    <thead>
                                    <tr>
                                        <th>Options</th>
                                        <th>Rent ID</th>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Address</th>
                                        <th>Gender</th>
                                        <th>Liscense</th>
                                        <th>Bike(s) Rented</th>
                                        <th>Purpose</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                          
                        </Row>
                    </Grid>
                </div>

{/*START OPEN MODAL------------------------------------------------*/}

                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Change Rent Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-container">
                        <Form>
                                    <FormGroup>
                                        <ControlLabel>Name:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            className="tsize"
                                            value={this.state.sname}
                                            onChange={this.modalonChange('sname')}
                                            />
                                       
                                    </FormGroup>
                                    <FormGroup>
                                    
                                        <ControlLabel>Last Name:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            className="tsize"
                                            value={this.state.sFname}
                                            onChange={this.modalonChange('sFname')}
                                            />
                                        
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Address</ControlLabel>
                                        <FormControl
                                            type="text"
                                            className="tsize"
                                            value={this.state.saddress}
                                            onChange={this.modalonChange('saddress')}
                                            />
                                        
                                    </FormGroup>
                                    <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="gender" value="Male"
                                               checked={this.state.sgender == "Male" ? true : false}
                                               onChange={this.modalonChange('sgender')}>Male</Radio>
                                        <Radio name="gender" value="Female"
                                               checked={this.state.sgender == "Female" ? true : false}
                                               onChange={this.modalonChange('sgender')}>Female</Radio>
                                       
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <ControlLabel>Liscense Type:</ControlLabel>
                                        <FormControl componentClass="select"
                                                   className="tsize"
                                                     value={this.state.sliscense}
                                                     onChange={this.modalonChange('sliscense')}
                                            >
                                            
                                            <option value="SP">SP</option>
                                            <option value="Non-Professional">Non-Professional</option>                                           
                                            <option value="Professional">Professional</option>
                                        </FormControl>
                                        
                                    </FormGroup>
                                
                                    
                                    
                                    <FormGroup>
                                        <ControlLabel>Available Bikes for Rent. <br/>Choose bike(s).</ControlLabel>
                                        <Checkbox value="Honda CBR1000RR"
                                                  checked={this.state.sbike.indexOf('Honda CBR1000RR')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('sbike')}>
                                           Honda CBR1000RR
                                        </Checkbox> 
                                        <Checkbox value="Honda XR200R"
                                                  checked={this.state.sbike.indexOf('Honda XR200R')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('sbike')}>
                                          Honda XR200R
                                        </Checkbox>
                                        <Checkbox value="Honda CBR150R"
                                                  checked={this.state.sbike.indexOf('Honda CBR150R')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('sbike')}>
                                       Honda CBR150R
                                       
                                        </Checkbox>
                                        <Checkbox value="Honda CBR400"
                                                  checked={this.state.sbike.indexOf('Honda CBR400')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('sbike')}>
                                     Honda CBR400
                                        </Checkbox>
                                        <Checkbox value="Honda CBR650F"
                                                  checked={this.state.sbike.indexOf('Honda CBR650F')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('sbike')}>
                                      Honda CBR650F
                                       
                                        </Checkbox>
                                        <Checkbox value="CBR600RR"
                                                  checked={this.state.sbike.indexOf('CBR600RR')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('sbike')}>
                                     CBR600RR
                                       
                                        </Checkbox>
                                    </FormGroup>
                                    
                                    
                                    
                                    <FormGroup>
                                        <ControlLabel> Rent Purposes: </ControlLabel><br/>
                                        <textarea
                                            className="comtext"
                                            type="textarea"
                                            placeholder=""
                                            value={this.state.spurpose}
                                            onChange={this.modalonChange('spurpose')}
                                        />
                                    </FormGroup>
                                    <ButtonGroup>
                                    
                                        <Button bsStyle="success" onClick={this.saveEdit(this.state.selectedId)}>Save Changes</Button>
                                    </ButtonGroup>
                                    
                                    
                                    
                                    
                                </Form>
</div>
                    </Modal.Body>
                    </Modal>

            </div>
        );
    }
}
export default App;