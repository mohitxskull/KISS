import { customAlphabet } from 'nanoid/async';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NanoID = customAlphabet(alphabet, 10);

const GenNano = async () => {
  const id = await NanoID();
  return id;
};

export default GenNano;
