import { customAlphabet } from "nanoid";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * 
 * @returns Nanoid ( which will be used as Proxyid )
 */
const GenNano = () => customAlphabet(alphabet, 10);

export default GenNano;
