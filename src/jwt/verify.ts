import { generateSignature } from "./utils/generateSignature"

interface IVerifyOptions {
  token: string,
  secret: string
}

export function verify({token, secret} : IVerifyOptions){
 const [headerSent, payloadSent, signatureSent] = token.split('.')
//  console.log({headerSent,  payloadSent, signatureSent})

const signature = generateSignature({
  header: headerSent,
  payload: payloadSent,
  secret
})

if( signature !== signatureSent){
  throw new Error('Invalid JWT token')
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const decodedPayload: Record<string, any> = JSON.parse(
  Buffer
  .from(payloadSent, 'base64url')
  .toString('utf-8')
)

if(decodedPayload.exp < Date.now()){
  throw new Error('Expired token')
}

return decodedPayload

}
