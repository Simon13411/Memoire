import * as React from 'react';
import { Navigate, useSearchParams } from "react-router-dom"
import Navbar from '../Navbar';

import InsectDetailsAdmin from './InsectDetailsAdmin';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class InsectDetails extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        individ: undefined,
        idbox: 0,
        order: undefined,
        suborder: undefined,
        genus: undefined,
        subgenus: undefined,
        family: undefined,
        subfamily: undefined,
        species: undefined,
        subspecies: undefined,
        tribus: undefined,
        loaner: undefined,
        orderlist: [],
        suborderlist: [],
        genuslist: [],
        subgenuslist: [],
        familylist: [],
        subfamilylist: [],
        specieslist: [],
        subspecieslist: [],
        tribuslist: [],
        loanerlist: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
      {this.GetIndiv()}
    }

    getStateVar = () => {
      return this.state
    }  
  
    GetIndiv = (event) => {
      axios.get(`${url}/get_indivdetails`, {params: {id: this.props.searchParams.get("id")}})
      .then((res) => {
          this.setState({individ: res.data.rows[0].id_individu,
                        idbox: res.data.rows[0].box_id,
                        order: res.data.rows[0].order,
                        suborder: res.data.rows[0].suborder,
                        family: res.data.rows[0].family,
                        subfamily: res.data.rows[0].subfamily,
                        genus: res.data.rows[0].genus,
                        subgenus: res.data.rows[0].subgenus,
                        species: res.data.rows[0].species,
                        subspecies: res.data.rows[0].subspecies,
                        tribu: res.data.rows[0].tribu,
                        loaner: res.data.rows[0].loaner}, this.Loaded)
      })
    }

    Loaded = () => {
      this.setState({isLoaded: true})
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
              <div className="container">
                {/*Info part*/}
                <div className="column">
                    <div>
                      {(!this.state.individ)  ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Individual ID</h3>
                        <p>{this.state.individ}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(this.state.idbox) === 0 ?
                        (<></>)
                        :
                        <>
                        (<h3 className="title">Box ID</h3>
                        <p>{this.state.idbox}</p>)
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.order) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Order</h3>
                        <p>{this.state.order}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.suborder) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Suborder</h3>
                        <p>{this.state.suborder}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.genus) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Genus</h3>
                        <p>{this.state.genus}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.subgenus)? 
                        (<></>)
                        :
                        <>
                        <h3  className="title">Subgenus</h3>
                        <p>{this.state.subgenus}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.family) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Family</h3>
                        <p>{this.state.family}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.subfamily) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Subfamily</h3>
                        <p>{this.state.subfamily}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.species) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Species</h3>
                        <p>{this.state.species}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.subspecies) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Subspecies</h3>
                        <p>{this.state.subspecies}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.tribus) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Tribus</h3>
                        <p>{this.state.tribus}</p>
                        </>
                      }
                    </div>
                    <div>
                      {(!this.state.loaner) ?
                        (<></>)
                        :
                        <>
                        <h3 className="title">Loaner</h3>
                        <p>{this.state.loaner}</p>
                        </>
                      }
                    </div>
                </div>
                <div className="column">
                  {/*Photo part*/}
                  <h3>Pictures</h3>
                </div>
                {this.props.isAuthenticated() && this.state.isLoaded ? 
                  (
                    //Admin Tools
                    <InsectDetailsAdmin isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout} getParentStateVar={this.getStateVar}/>
                  ) : (
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

export function InsectDetailsWSP(props) {
  const [searchParams] = useSearchParams();
  return <InsectDetails searchParams={searchParams} {...props}></InsectDetails>
}