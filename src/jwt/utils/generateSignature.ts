import { createHmac } from "crypto"

interface IGenSignature {
  secret: string;
  header: string;
  payload: string;
}

export function generateSignature({header, payload, secret}:IGenSignature){
  const hmac = createHmac('sha256', secret)
  const signature = hmac
  .update(`${header}.${payload}`)
  .digest('base64')
  return signature
}
