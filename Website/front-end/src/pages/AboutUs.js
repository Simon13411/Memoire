import * as React from 'react';
import Navbar from '../components/Navbar';

import logo from '../components/GemblouxLogo.png';

class AboutUs extends React.Component {
    constructor (props) {
      super(props)
    }

    render() {
        return (
            <>
            <Navbar isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} Logout={this.props.Logout}/>
            <div className="about-container">
                <h1>About Us</h1>
                <div className="about-content">
                    <img className='logo-nav' src={logo} />
                    <p>
                        This new platform for the Walloon entomology is the result from the first numeric repertoire of the Gembloux entomological conservatory <sup>[1]</sup>. It includes two levels of numeric datasets: the insect boxes and the insect specimen data.
                    </p>
                    <p>
                        This online database has been built from the Gembloux Agro-Bio Tech – University de Liège student insect collections, from several research projects developed by the Entomology Department staff but also from the activities of non-professional entomologists on biodiversity monitoring. Many entomologists transferred their own collections to be sure that their life passion will be kept and valorized as a part of the Walloon entomological patrimony. As part of long-term collaboration with foreign countries over all continents, substantial amount of the insect collection was deposited by African, Asian, Oceanian, or American entomologists. The willingness of scientific team of the Gembloux entomological conservatory is to provide their passion and integrity to every professional and non-professional entomologist and to promote each individual initiative. We hope that our ongoing numeric project will shine and radiate at the world level.
                    </p>
                    <div className="references">
                        <p><sup>[1]</sup> Frédéric Francis & Éric Haubruge, «Le Conservatoire entomologique de Gembloux: lieu de conservation et de valorisation du patrimoine wallon», Entomologie faunistique - Faunistic Entomology [En ligne], Volume 65 (2012), 35-40 URL : <a href="https://popups.uliege.be/2030-6318/index.php?id=2310"></a></p>
                    </div>
                    <br />
                    <div>
                        <p>Laboratoire d’Entomologie Fonctionnelle et Evolutive (Prof. Frédéric Francis), Gembloux Agro-Bio Tech, Passage des Déportés, 2, B-5030 Gembloux</p>
                        <p>Hexapoda – Insectarium Jean Leclercq, Rue de Grand’Axhe, 45E, B-4300 Waremme</p>
                    </div>
                    <br />
                    <div>
                        <h3>Project Managers</h3>
                        <ul>
                            <li>Grégoire Noël (GxABT– ULiège)</li>
                            <li>Simon Grognard (UCLouvain)</li>
                            <li>Jean Schot (UCLouvain)</li>
                        </ul>
                    </div>
                    <div className="team">
                        <h3>The rest of the Team</h3>
                        <ul>
                            <li>Frédéric Francis (GxABT – ULiège)</li>
                            <li>Jeannine Bortels (GxABT – ULiège)</li>
                            <li>Rudy Caparros Megido (GxABT – ULiège)</li>
                            <li>Eric Haubruge (GxABT – ULiège)</li>
                            <li>Ottavia Chiandotto (GxABT – ULiège)</li>
                            <li>Lara de Backer (HEXAPODA)</li>
                            <li>Julien Bebermans (HEXAPODA)</li>
                            <li>Axel Legay (UCLouvain)</li> 
                            <li>Thibault Vereerstraeten (UCLouvain)</li>
                        </ul>
                    </div>
                </div>
            </div>
            </>
        );
    }
            
}

export default AboutUs;