import 'dotenv/config'
import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = process.env.SECRET_KEY as string
const token = sign({
  exp: Date.now() + 24 * 60 * 60 * 1000,
  data: {
    sub: 'nathan',
  },
  secret,
});

const decoded = verify({ token, secret });

console.log(decoded);
