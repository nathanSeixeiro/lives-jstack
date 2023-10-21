export function base64Enconder(value: unknown){
  return  Buffer.from(JSON.stringify(value)).toString('base64url')
}
