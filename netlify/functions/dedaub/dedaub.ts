import fetch from 'node-fetch';
import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  // @ts-ignore
  const { md5 } = event.queryStringParameters
  let statusCode, data;
  
  try {
    const response = await fetch(`https://library.dedaub.com/api/on_demand/${md5}/`);
    data = await response.json();
    statusCode = 200;
  } catch (err) {
    statusCode = err.statusCode || 500;
    data = { error: err.message };
  }
  
  return {
    statusCode,
    body: JSON.stringify(data)
  }
}
