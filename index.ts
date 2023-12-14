import { Web5 } from '@web5/api';
import { protocolURL, userProtocolDef } from './protocols/userProtocolDefinition.js';
import { configureProtocol, queryProtocol } from './helpers/protocols.js';
import { createUserRecord } from './helpers/records.js';

const { web5, did: myDid } = await Web5.connect();

// Check if I have the userProtocolDef protocol installed already else go ahead and install it.
const { protocols, status } = await queryProtocol(myDid, protocolURL, web5);
if (protocols.length === 0 && status.code === 200) {
  console.log('---NO PROTOCOL INSTALLED YET---');

  // Proceed to install protocol into the dwn
  await configureProtocol(myDid, userProtocolDef, web5);
} else {
  console.log('---PROTOCOL EXISTS---\n---SKIPPING PROTOCOL CHECK STEP---');
}

const userRecord = await createUserRecord({
  data: {
    email: 'Johndoe@email.com',
    firstname: 'John',
    lastname: 'Doe',
  },
  web5,
  schema: 'https://auth.xyz.io/schemas/userSchema',
});

console.log('Record Created:', userRecord);
