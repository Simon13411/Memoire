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
      order: 'NULL',
      suborder: 'NULL',
      genus: 'NULL',
      subgenus: 'NULL',
      family: 'NULL',
      subfamily: 'NULL',
      species: 'NULL',
      subspecies: 'NULL',
      tribus: 'NULL',
      loaner: 'NULL',
      grangebegin: 'NULL',
      grangeend: 'NULL',
      srangebegin: 'NULL',
      srangeend: 'NULL',
      collection: 'NULL',
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

  OrderChange = (event) => {
    this.setState({order: event.target.value})
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
                <div>
                  <p className="title">Order</p>
                  {(this.state.order) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.order}</p>)
                  }
                </div>
                <div>
                  <p className="title">Suborder</p>
                  {(this.state.suborder) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.suborder}</p>)
                  }
                </div>
                <div>
                  <p className="title">Genus</p>
                  {(this.state.genus) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.genus}</p>)
                  }
                </div>
                <div>
                  <p  className="title">Subgenus</p>
                  {(this.state.subgenus) === 'NULL'? 
                    (<></>)
                    :
                    (<p>{this.state.subgenus}</p>)
                  }
                </div>
                <div>
                  <p className="title">Family</p>
                  {(this.state.family) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.family}</p>)
                  }
                </div>
                <div>
                  <p className="title">Subfamily</p>
                  {(this.state.subfamily) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.subfamily}</p>)
                  }
                </div>
                <div>
                  <p className="title">Species</p>
                  {(this.state.species) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.species}</p>)
                  }
                </div>
                <div>
                  <p className="title">Subspecies</p>
                  {(this.state.subspecies) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.subspecies}</p>)
                  }
                </div>
                <div>
                  <p className="title">Tribus</p>
                  {(this.state.tribus) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.tribus}</p>)
                  }
                </div>
                <div>
                  <p className="title">Loaner</p>
                  {(this.state.loaner) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.loaner}</p>)
                  }
                </div>
                <div>
                  <p className="title">Genus Range</p>
                  {(this.state.grangebegin) === 'NULL' ?
                    (<></>)
                    :
                    (<>{(this.state.grangeend) === 'NULL' ?
                      (<p>{this.state.grangebegin}-...</p>)
                      :
                      (<p>{this.state.grangebegin}-{this.state.grangeend}</p>)
                    }</>)
                  }
                </div>
                <div>
                  <p className="title">Species Range</p>
                  {(this.state.grangebegin) === 'NULL' ?
                    (<></>)
                    :
                    (<>{(this.state.srangeend) === 'NULL' ?
                      (<p>{this.state.srangebegin}-...</p>)
                      :
                      (<p>{this.state.srangebegin}-{this.state.srangeend}</p>)
                    }</>)
                  }
                </div>
                <div>
                  <p className="title">Collection</p>
                  {(this.state.collection) === 'NULL' ?
                    (<></>)
                    :
                    (<p>{this.state.collection}</p>)
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

export function BoxDetailsWSP(props) {
  const [searchParams] = useSearchParams();
  return <BoxDetails searchParams={searchParams} {...props}></BoxDetails>
}

export default BoxDetails;