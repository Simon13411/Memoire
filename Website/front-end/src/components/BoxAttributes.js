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
                <h2>Population {this.props.index}</h2>
                <div>
                {(!this.props.order) ?
                    (<></>)
                    :
                    <>
                    <h1 className="title">Order</h1>
                    <p>{this.props.order}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.suborder) ?
                    (<></>)
                    :
                    <>
                    <h1 className="title">Suborder</h1>
                    <p>{this.props.suborder}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.genus) ?
                    (<></>)
                    :
                    <>
                    <h1 className="title">Genus</h1>
                    <p>{this.props.genus}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.subgenus)? 
                    (<></>)
                    :
                    <>
                    <h1  className="title">Subgenus</h1>
                    <p>{this.props.subgenus}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.family) ?
                    (<></>)
                    :
                    <>
                    <h1 className="title">Family</h1>
                    <p>{this.props.family}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.subfamily) ?
                    (<></>)
                    :
                    <>
                    <h1 className="title">Subfamily</h1>
                    <p>{this.props.subfamily}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.species) ?
                    (<></>)
                    :
                    <>
                    <h1 className="title">Species</h1>
                    <p>{this.props.species}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.subspecies) ?
                    (<></>)
                    :
                    <>
                    <h1 className="title">Subspecies</h1>
                    <p>{this.props.subspecies}</p>
                    </>
                }
                </div>
                <div>
                {(!this.props.tribus) ?
                    (<></>)
                    :
                    <>
                    <h1 className="title">Tribus</h1>
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