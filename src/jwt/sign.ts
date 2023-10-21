/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { base64Enconder } from "./utils/encoder"
import { generateSignature } from "./utils/generateSignature"

interface ISignOption {
  data: Record<string, any>
  exp: number,
  secret: string
}

export function sign({data, exp, secret}: ISignOption){
  // header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  // payload
  const payload = {
    ...data,
    iat: Date.now(),
    exp
  }

  const base64EncondedHeader = base64Enconder(header)
  const base64EncondedPayload = base64Enconder(payload)

  // signature
  const signature = generateSignature({
    header: base64EncondedHeader,
    payload: base64EncondedPayload,
    secret
  })
  return `${base64EncondedHeader}.${base64EncondedPayload}.${signature}`
}

