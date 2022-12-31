import fetch from 'node-fetch';
import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  // @ts-ignore
  const { network = 'mainnet', address } = event.queryStringParameters

  const res = await fetch(`https://${network}.infura.io/v3/${process.env.INFURA_KEY}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          jsonrpc: "2.0",
          method: "eth_getCode",
          params: [address, "latest"],
          id: 1
      })
  }).then(res => res.json());

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  }
}
