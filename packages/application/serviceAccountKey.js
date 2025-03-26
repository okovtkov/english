export const serviceAccountKeys = {
  type: 'service_account',
  project_id: 'english-91f46',
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replaceAll(/\\n/g, '\n'),
  client_email: 'firebase-adminsdk-p357k@english-91f46.iam.gserviceaccount.com',
  client_id: '102608605542743957247',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p357k%40english-91f46.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};
