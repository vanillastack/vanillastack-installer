const fs = require('fs');
const path = require('path');

const getVersion = function () {
  try {
    const versionPath = path.join(__dirname, '../../version');
    if (fs.existsSync(versionPath)) {
      return fs.readFileSync(versionPath, 'utf8').replace(/(\r\n|\n|\r)/gm, '');
    } else {
      console.log(`Version File does not exists: ${versionPath}`);
    }
  } catch (e) {
    console.log(`Reading Version File gone wrong:\n${e}`);
  }
};
// Version can be passed through build args
const currentVersion = process.env.VERSION; // getVersion();

const config = {
  ansibleBasePath: process.env.ANSIBLE_PATH || '/tmp/ansible',
  mode: process.env.MODE || 'installer',
  debug: JSON.parse(process.env.DEBUG || 'false'),
  version: currentVersion,
  ansibleVersion: process.env.VANILLASTACK_ANSIBLE_VERSION || '-1',
  localPort: process.env.PORT,
  localIp: process.env.IP,
  externalIp: process.env.EXTERNAL_IP || process.env.IP,
  externalPort: process.env.EXTERNAL_PORT || process.env.PORT,
  // Keycloak
  realm: process.env.KEYCLOAK_REALM || 'vsmanager',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'vsmanager-backend',
  authServerUrl: process.env.KEYCLOAK_URL || 'http://keycloak:8080/auth', // 'http://keycloak:8080/auth' 'http://localhost:8081/auth'
};

module.exports = config;
