import { compareSync, hashSync } from 'bcryptjs';

/**
 * Rounds 10
 */
const Bcrypt = {
  Hash: (TEXT: string) => hashSync(TEXT, 10),
  Check: (TEXT: string, HASH: string) => compareSync(TEXT, HASH),
};

export default Bcrypt;
