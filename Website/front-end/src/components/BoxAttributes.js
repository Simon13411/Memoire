import * as React from 'react';

import BoxDetailsAdmin from './BoxDetailsAdmin';


class BoxAttributes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoaded: false
    }
  }

  Loaded = () => {
    this.setState({isLoaded: true})
  }

  render() {
    return (
        <>
            <div className="column">
                {/*Info part*/}
                <h2>Population n°{this.props.index+1}</h2>
                <div>
                {(!this.props.order) ?
                    (<></>)
                    :
                    <>
                    <h4 className="title">Order</h4>
                    <p>{this.props.order}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.suborder) ?
                    (<></>)
                    :
                    <>
                    <h4 className="title">Suborder</h4>
                    <p>{this.props.suborder}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.genus) ?
                    (<></>)
                    :
                    <>
                    <h4 className="title">Genus</h4>
                    <p>{this.props.genus}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.subgenus)? 
                    (<></>)
                    :
                    <>
                    <h4  className="title">Subgenus</h4>
                    <p>{this.props.subgenus}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.family) ?
                    (<></>)
                    :
                    <>
                    <h4 className="title">Family</h4>
                    <p>{this.props.family}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.subfamily) ?
                    (<></>)
                    :
                    <>
                    <h4 className="title">Subfamily</h4>
                    <p>{this.props.subfamily}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.species) ?
                    (<></>)
                    :
                    <>
                    <h4 className="title">Species</h4>
                    <p>{this.props.species}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.subspecies) ?
                    (<></>)
                    :
                    <>
                    <h4 className="title">Subspecies</h4>
                    <p>{this.props.subspecies}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.tribus) ?
                    (<></>)
                    :
                    <>
                    <h4 className="title">Tribus</h4>
                    <p>{this.props.tribus}</p>
                    </>
                }
                </div>
            </div>
            {this.props.isAuthenticated() ? 
                (
                //Admin Tools
                <BoxDetailsAdmin {...this.props}/>
                ) : (
                <></>
                )
            }
        </>
        )
    }
}

export default BoxAttributes;