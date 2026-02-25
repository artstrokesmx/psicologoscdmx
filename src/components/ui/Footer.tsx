import { CONFIG_DEL_SITIO } from "@/lib/constantes";

const phoneDigitos = CONFIG_DEL_SITIO.phone.replace(/\D/g, '');

const Footer = () =>{
    return (
        <footer className="text-center bg-blue-700 text-white py-6 mt-12">
            <div className="space-x-4 mb-2">
                <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
                <div className="space-x-4">
                    <p className="mb-2">Dirección: <br />
                        <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                            <span itemProp="streetAddress">{CONFIG_DEL_SITIO.address.streetAddress}</span>
                        </span>
                    </p>
                    <p className="mb-2">Teléfono:<br />
                        <a 
                          href={`tel:+${phoneDigitos}`} 
                          className="hover:underline"
                          itemProp="telephone"
                        >
                          {CONFIG_DEL_SITIO.phone}
                        </a>
                    </p>
                </div>
                
                
            </div>
            <div className="space-x-4 mb-2">
                <a href={CONFIG_DEL_SITIO.social.fb} target="_blank"> Facebook</a>
                <a href={CONFIG_DEL_SITIO.social.ig} target="_blank"> Instagram</a>
                <a href={CONFIG_DEL_SITIO.social.spotify} target="_blank"> Spotify</a>
            </div>
            
            <p> ©️ Psicólogos CDMX 2026</p>
        </footer>
    )
}

export default Footer;