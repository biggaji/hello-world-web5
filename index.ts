import { Web5 } from '@web5/api';
import { protocolURL, userProtocolDef } from './protocols/userProtocolDefinition.js';
import { configureProtocol } from './helpers/protocols.js';

const { web5, did: myDid } = await Web5.connect();

// Check if i have the userProtocol installed already else go ahead and install it.
const { protocols, status } = await web5.dwn.protocols.query({
  message: {
    filter: {
      protocol: protocolURL,
    },
  },
});

if (protocols.length === 0 && status.code === 200) {
  console.log('---NO PROTOCOL INSTALLED YET---');

  // Proceed to install protocol into the dwn
  await configureProtocol(myDid, userProtocolDef, web5);
} else {
  console.log('---PROTOCOL EXISTS---\n--- SKIPPING CHECK STEP---');
  console.log('existingProtocols', protocols);
}
