import { CLIENT_ID } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import querystring from 'querystring';



const client_id = CLIENT_ID
const redirect_uri = "http://localhost:5173/callback"

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function GET() {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';
  
    const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      state
    });
  

    throw redirect(302, authUrl);

}
