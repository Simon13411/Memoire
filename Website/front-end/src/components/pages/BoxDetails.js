import * as React from 'react';
import { Navigate, useSearchParams } from "react-router-dom"
import Navbar from '../Navbar';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BoxAttributes from '../BoxAttributes'
import BoxDetailsAddPop from '../BoxDetailsAddPop';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class BoxDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      attr: [],
      isLoaded: false,
      collection: null,
      loaner: null,
      collectionlist: [],
      loanerslist: [],
      newcollection: null,
      newloaner: null,
      modifycollectionstate: '',
      modifyloanerstate: '',
      imageURL: null
    }
  }

  componentDidMount() {
    this.GetBox()
    this.getCollections()
    this.getLoaners()
    this.getPicture()
  }

  maxPopDegree = (newattributelist) => {
    const attributes = ['order','suborder','family','subfamily','tribu','genus','subgenus','species','subspecies']
    var maxdegree = null
    for (let i=0; i< attributes.length; i++) {
      for (let j=0; j<this.state.attr.length; j++){
        console.log(this.state.attr[j][attributes[i]])
        console.log(newattributelist[i])
        if (this.state.attr[j][attributes[i]] !== newattributelist[i]) {
          if (maxdegree === null) {
            maxdegree = attributes[i]
            break;
          }
          else {
            console.log("ici2")
            return "You can't have such a population in this box (Degree of precision)"
          }
        }
      }
    }
    console.log("ici")
    return "ok"
  }

  refreshPage() {
    window.location.reload(false)
  }

  getStateVar = () => {
    return this.state
  }

  GetBox = (event) => {
    axios.get(`${url}/get_boxdetails`, {params: {id: this.props.searchParams.get("id")}})
    .then((res) => {
        this.setState({attr: res.data.rows, collection: res.data.rows[0].collection, newcollection: res.data.rows[0].collection, loaner: res.data.rows[0].loaner, newloaner: res.data.rows[0].loaner}, this.Loaded)
    })
  }

  getCollections = () => {
    axios.get(`${url}/get_collections`)
        .then((res) => {
            this.setState({collectionlist: res.data.rows})
    })
  }

  getLoaners = () => {
    axios.get(`${url}/get_loaners`)
    .then((res) => {
        this.setState({loanerslist: res.data.rows})
    })
  }

  getPicture = () => {
    const type = "Boxes"
    const id = this.props.searchParams.get("id")
    axios.get(`${url}/getpicture`, {params : {type: type, id: id}}, { responseType: 'blob' })
    .then(response => {
        const imageurl = window.URL.createObjectURL(new Blob([response.data]));
        console.log(imageurl)
	this.setState({imageURL: `${url}/getpicture?type=Boxes&id=${id}`})
      })
  }

  Loaded = () => {
    this.setState({isLoaded: true, collection: this.state.attr[0].collection, loaner: this.state.attr[0].loaner})
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
        [name]: value
    })
  }

  modifycollection = () => {
    this.setState({modifycollectionstate: 'Changement en cours...'})
    const newcollection = this.state.newcollection
    axios.post(`${url}/changeboxcollection`, {boxid: this.props.searchParams.get("id"), collection: newcollection})
    .then((res) => {
      this.setState({collection: newcollection, modifycollectionstate: `La boite appartient maintenant à la collection ${newcollection}`})
    })
    .catch((err) => {
      if (!err.response) {
        this.setState({modifycollectionstate: 'Erreur Serveur - Gateway'})
      }
      else {
        this.setState({modifycollectionstate: err.response.data.error})
      }
    })
  }

  modifyloaner = () => {
    this.setState({modifyloanerstate: 'Changement en cours...'})
    const newloaner = this.state.newloaner
    axios.post(`${url}/changeboxloaner`, {boxid: this.props.searchParams.get("id"), newloaner: newloaner})
    .then((res) => {
      this.setState({loaner: newloaner, modifyloanerstate: `Loaner est maintenant ${newloaner}`})
    })
    .catch((err) => {
      if (!err.response) {
        this.setState({modifyloanerstate: 'Erreur Serveur - Gateway'})
      }
      else {
        this.setState({modifyloanerstate: err.response.data.error})
      }
    })
  }

  render() {
    return (
      <>
      {!this.props.searchParams.get("id") ?
        ( 
        <Navigate to='/' /> 
        ):(
          <>
            <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
            <p>Boite n° {this.props.searchParams.get("id")}  Collection: {this.state.collection}  {this.state.loaner ? (<>Loaner: {this.state.loaner}</>):(<></>)}</p>
            <div className="container">
    
              {this.props.isAuthenticated() ?
                (
                  <div className="column">
                    <div>
                      <h4 className="title">Collection</h4>
                          <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                              <Select
                              id="collection-select"
                              value={this.state.newcollection}
                              onChange={this.handleInputChange}
                              name="newcollection"
                              >
                              <MenuItem value={null}>
                                  <em>None</em>
                              </MenuItem>
                              {this.state.collectionlist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                              </Select>
                          </FormControl>
                    </div>
                    <button type='submit' onClick={this.modifycollection}>Modifier</button>
                    <div>{this.state.modifycollectionstate}</div>
                    <div>
                      <h4 className="title">Loaner</h4>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                            <Select
                            id="loaner-select"
                            value={this.state.newloaner}
                            onChange={this.handleInputChange}
                            name="newloaner"
                            >
                            <MenuItem value={null}>
                                <em>None</em>
                            </MenuItem>
                            {this.state.loanerslist.map((data) => <MenuItem value={data.name}>{data.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </div>
                    <button type='submit' onClick={this.modifyloaner}>Modifier</button>
                    <div>{this.state.modifyloanerstate}</div>
                  </div>
                ):(
                  <></>
                )
              }
              
            
              {this.state.attr.map((data, index) => <BoxAttributes isAuthenticated={this.props.isAuthenticated}
                                                            id={this.props.searchParams.get("id")}
                                                            index={index}
                                                            order={data.order}
                                                            suborder= {data.suborder}
                                                            family= {data.family}
                                                            subfamily= {data.subfamily}
                                                            genus= {data.genus}
                                                            subgenus= {data.subgenus}
                                                            species= {data.species}
                                                            subspecies= {data.subspecies}
                                                            tribu= {data.tribu}
                                                            loaner= {data.loaner} maxPopDegree={this.maxPopDegree} refresh={this.refreshPage}></BoxAttributes>)}
            </div>
            {this.props.isAuthenticated() ?
                <BoxDetailsAddPop refresh={this.refreshPage} id={this.props.searchParams.get("id")} maxPopDegree={this.maxPopDegree}/>
              :
                <></>
            }

            <div className="column">
                {/*Photo part*/}
                <h2>Pictures</h2>
                {this.state.imageURL ?
                  (
		              <a href={this.state.imageURL}>
                    <img src={this.state.imageURL} width={250} height={250}/>
	                </a>
                  ):(
                    <></>
                  )
                }
            </div>
          </>
      )
    }
    </>
  )}
}

export function BoxDetailsWSP(props) {
  const [searchParams] = useSearchParams();
  return <BoxDetails searchParams={searchParams} {...props}></BoxDetails>
}
