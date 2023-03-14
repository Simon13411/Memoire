import * as React from 'react';
import Navbar from '../Navbar';
import './Details.css';

import {Navigate} from 'react-router-dom';

class InsectDetails extends React.Component {
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
        subspecies: 'Test',
        tribus: 'NULL',
        subtribus: 'NULL',
        loaner: 'NULL',
        rangebegin: 'NULL',
        rangeend: 'NULL',
        collection: 'NULL',
      }
    }

    render() {
      return (
        <>
        {this.props.isAuthenticated() ? 
          (
          <>
            <Navbar />
            <div className="container">
                <div>
                  <p className="title">Order</p>
                  {(this.state.order) ?
                    (<p>{this.state.order}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Suborder</p>
                  {(this.state.suborder) ?
                    (<p>{this.state.suborder}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Genus</p>
                  {(this.state.genus) ?
                    (<p>{this.state.genus}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p  className="title">Subgenus</p>
                  {(this.state.subgenus) ?
                    (<p>{this.state.subgenus}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Family</p>
                  {(this.state.family) ?
                    (<p>{this.state.family}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Subfamily</p>
                  {(this.state.subfamily) ?
                    (<p>{this.state.subfamily}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Species</p>
                  {(this.state.species) ?
                    (<p>{this.state.species}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Subspecies</p>
                  {(this.state.subspecies) ?
                    (<p>{this.state.subspecies}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Tribus</p>
                  {(this.state.tribus) ?
                    (<p>{this.state.tribus}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Subtribus</p>
                  {(this.state.subtribus) ?
                    (<p>{this.state.subtribus}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Loaner</p>
                  {(this.state.loaner) ?
                    (<p>{this.state.loaner}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Range</p>
                  {(this.state.rangebegin) ?
                    (<p>{this.state.rangebegin}-{this.state.rangeend}</p>)
                    :
                    (<></>)
                  }
                </div>
                <div>
                  <p className="title">Collection</p>
                  {(this.state.rangebegin) ?
                    (<p>{this.state.collection}</p>)
                    :
                    (<></>)
                  }
                </div>
            </div>
          </>
        ) : (
          <Navigate to='/sign-in' />
        )
      }
      </>
    )}
}


export default InsectDetails;