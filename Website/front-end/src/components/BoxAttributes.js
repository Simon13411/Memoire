import * as React from 'react';

import BoxDetailsAdmin from './BoxDetailsAdmin';

class BoxAttributes extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            order: this.props.order,
            suborder: this.props.suborder,
            family: this.props.family,
            subfamily: this.props.subfamily,
            tribu: this.props.tribu,
            genus: this.props.genus,
            subgenus: this.props.subgenus,
            species: this.props.species,
            subspecies: this.props.subspecies
        }
    }

    changefetchedpop = (childstatevar) => {
        this.setState({order: childstatevar.order,
            suborder: childstatevar.suborder,
            family: childstatevar.family,
            subfamily: childstatevar.subfamily,
            tribu: childstatevar.tribu,
            genus: childstatevar.genus,
            subgenus: childstatevar.subgenus,
            species: childstatevar.species,
            subspecies: childstatevar.subspecies})
    }

    render() {
        return (
            <>
                <div className="column">
                    {/*Info part*/}
                    <h3>Population n°{this.props.index+1}</h3>
                    <div>
                    {(!this.state.order) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Order</h4>
                        <p>{this.state.order}</p>
                        </>
                    }
                    </div>
                    <div>
                    {(!this.state.suborder) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Suborder</h4>
                        <p>{this.state.suborder}</p>
                        </>
                    }
                    </div>
                    <div>
                    {(!this.state.family) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Family</h4>
                        <p>{this.state.family}</p>
                        </>
                    }
                    </div>
                    <div>
                    {(!this.state.subfamily) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Subfamily</h4>
                        <p>{this.state.subfamily}</p>
                        </>
                    }
                    </div>
                    <div>
                    {(!this.state.tribu) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Tribe</h4>
                        <p>{this.state.tribu}</p>
                        </>
                    }
                    </div>
                    <div>
                    {(!this.state.genus) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">Genus</h4>
                        <p>{this.state.genus}</p>
                        </>
                    }
                    </div>
                    <div>
                    {(!this.state.subgenus)? 
                        (<></>)
                        :
                        <>
                        <h4  className="title">Subgenus</h4>
                        <p>{this.state.subgenus}</p>
                        </>
                    }
                    </div>
                    <div>
                    {(!this.state.species) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">species</h4>
                        <p>{this.state.species}</p>
                        </>
                    }
                    </div>
                    <div>
                    {(!this.state.subspecies) ?
                        (<></>)
                        :
                        <>
                        <h4 className="title">subspecies</h4>
                        <p>{this.state.subspecies}</p>
                        </>
                    }
                    </div>
                </div>
                {this.props.isAuthenticated() && this.props.mode===1 &&
                    //Admin Tools
                    <BoxDetailsAdmin changefetchedpop={this.changefetchedpop} {...this.props}/>
                }
            </>
            )
        }
}

export default BoxAttributes;