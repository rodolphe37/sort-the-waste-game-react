import React from 'react';
import '../App.css'

const Footer = ({gameState}) => (
  <footer className="container text-right text-secondary">
  <div className="pictures-columns">
  <ul>
  <li>rouge = E-poubelle</li>
  <li>orange = Plastique</li>
  <li>jaune = Metal</li>
  <li>bleue = Papier</li>
  <li>gris = Organique</li>
  </ul><img src={require('../assets/poubelles.png')} alt="poubelles"/>
  </div>
  </footer>
);

export default Footer;
