import * as React from 'react';
import { Navigate, useSearchParams } from "react-router-dom"
import Navbar from '../Navbar';

import BoxDetailsAdmin from './BoxDetailsAdmin';

import axios from 'axios'
const url = process.env.REACT_APP_IP

class BoxDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
      grangebegin: undefined,
      grangeend: undefined,
      srangebegin: undefined,
      srangeend: undefined,
      collection: undefined,
    }
  }

  componentDidMount() {
    {this.GetBox()}
  }

  GetBox = (event) => {
    axios.get(`${url}/get_boxdetails`, {params: {id: this.props.searchParams.get("id")}})
    .then((res) => {
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
        this.setState({grangebegin: res.data.rows[0].grangebegin})
        this.setState({grangeend: res.data.rows[0].grangeend})
        this.setState({srangebegin: res.data.rows[0].srangebegin})
        this.setState({srangeend: res.data.rows[0].srangeend})
        this.setState({collection: res.data.rows[0].collection})
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
              <BoxDetailsAdmin isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
            ) : (
            //User's Version
            <>
            <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
            <div className="container">
              <div className="column">
                  {/*Info part*/}
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
                  <div>
                    {(!this.state.grangebegin) ?
                      (<></>)
                      :
                      (<>{(!this.state.grangeend) ?
                        <>
                        <h3 className="title">Genus Range</h3>
                        <p>{this.state.grangebegin}-...</p>
                        </>
                        :
                        <>
                        <h3 className="title">Genus Range</h3>
                        <p>{this.state.grangebegin}-{this.state.grangeend}</p>
                        </>
                      }</>)
                    }
                  </div>
                  <div>
                    {(!this.state.grangebegin) ?
                      (<></>)
                      :
                      (<>{(!this.state.srangeend) ?
                        <>
                        <h3 className="title">Species Range</h3>
                        <p>{this.state.srangebegin}-...</p>
                        </>
                        :
                        <>
                        <h3 className="title">Species Range</h3>
                        <p>{this.state.srangebegin}-{this.state.srangeend}</p>
                        </>
                      }</>)
                    }
                  </div>
                  <div>
                    {(!this.state.collection) ?
                      (<></>)
                      :
                      <>
                      <h3 className="title">Collection</h3>
                      <p>{this.state.collection}</p>
                      </>
                    }
                  </div>
              </div>
              <div className="column">
                {/*Photo part*/}
                <h3>Pictures</h3>
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

export function BoxDetailsWSP(props) {
  const [searchParams] = useSearchParams();
  return <BoxDetails searchParams={searchParams} {...props}></BoxDetails>
}