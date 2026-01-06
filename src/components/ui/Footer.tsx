import { CONFIG_DEL_SITIO } from "@/lib/constantes";

const Footer = () =>{
    return (
        <footer className="text-center">
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