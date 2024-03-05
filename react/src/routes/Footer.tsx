import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>© {new Date().getFullYear()} Bibliothèque de la Ville. Tous droits réservés.</p>
                <p>Contactez-nous : <a href="mailto:info@bibliothequeville.com">info@bibliothequeville.com</a></p>
            </div>
        </footer>
    );
};

export default Footer;
