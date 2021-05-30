import axios from 'axios';

const webserverDomain = `//${document.location.host}`;
const apiDomain = webserverDomain.replace('3000', '3001');

export async function createMetaDataUri({
  name,
  description,
  artistDNA
}) {
  return axios.post(`${apiDomain}/create_metadata_uri`, {
    name,
    description,
    artistDNA
  }, {
    headers: {"Access-Control-Allow-Origin": "*"}
  });
}
