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
      }
    }

    componentDidMount() {
      {this.GetIndiv()}
    }
  
    GetIndiv = (event) => {
      axios.get(`${url}/get_indivdetails`, {params: {id: this.props.searchParams.get("id")}})
      .then((res) => {
          this.setState({individ: res.data.rows[0].id_individu})
          this.setState({idbox: res.data.rows[0].box_id})
          this.setState({order: res.data.rows[0].order})
          this.setState({suborder: res.data.rows[0].suborder})
          this.setState({family: res.data.rows[0].family})
          this.setState({subfamily: res.data.rows[0].subfamily})
          this.setState({genus: res.data.rows[0].genus})
          this.setState({subgenus: res.data.rows[0].subgenus})
          this.setState({species: res.data.rows[0].species})
          this.setState({subspecies: res.data.rows[0].subspecies})
          this.setState({tribu: res.data.rows[0].tribu})
          this.setState({loaner: res.data.rows[0].loaner})
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
            {this.props.isAuthenticated() ? 
              (
              //Admin's Version
              <InsectDetailsAdmin isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
              ) : (
              //User's Version
              <>
              <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
              <div className="container">
                  <div>
                  <p className="title">Individual ID</p>
                    {(!this.state.individ)  ?
                      (<></>)
                      :
                      (<p>{this.state.individ}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Box ID</p>
                    {(this.state.idbox) === 0 ?
                      (<></>)
                      :
                      (<p>{this.state.idbox}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Order</p>
                    {(!this.state.order) ?
                      (<></>)
                      :
                      (<p>{this.state.order}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Suborder</p>
                    {(!this.state.suborder) ?
                      (<></>)
                      :
                      (<p>{this.state.suborder}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Genus</p>
                    {(!this.state.genus) ?
                      (<></>)
                      :
                      (<p>{this.state.genus}</p>)
                    }
                  </div>
                  <div>
                    <p  className="title">Subgenus</p>
                    {(!this.state.subgenus) === ''? 
                      (<></>)
                      :
                      (<p>{this.state.subgenus}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Family</p>
                    {(!this.state.family) ?
                      (<></>)
                      :
                      (<p>{this.state.family}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Subfamily</p>
                    {(!this.state.subfamily) ?
                      (<></>)
                      :
                      (<p>{this.state.subfamily}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Species</p>
                    {(!this.state.species) ?
                      (<></>)
                      :
                      (<p>{this.state.species}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Subspecies</p>
                    {(!this.state.subspecies) ?
                      (<></>)
                      :
                      (<p>{this.state.subspecies}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Tribus</p>
                    {(!this.state.tribus) ?
                      (<></>)
                      :
                      (<p>{this.state.tribus}</p>)
                    }
                  </div>
                  <div>
                    <p className="title">Loaner</p>
                    {(!this.state.loaner) ?
                      (<></>)
                      :
                      (<p>{this.state.loaner}</p>)
                    }
                  </div>
              </div>
              </>
            )
            }
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