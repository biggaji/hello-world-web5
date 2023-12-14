import { Web5 } from '@web5/api';

/**
 * Installs a protocol into a dwn
 * @param did
 * @param protocolDef
 * @param web5
 */
export async function configureProtocol(did: string, protocolDef: any, web5: Web5) {
  try {
    console.log('---INSTALLING PROTOCOL---');
    const { protocol, status } = await web5.dwn.protocols.configure({
      message: {
        definition: protocolDef,
      },
    });

    // Sends protocol to remote DWNs immediately (vs waiting for sync)
    await protocol!.send(did);
    console.log('---PROTOCOL INSTALLED---');
  } catch (error: any) {
    throw new Error(`Error configuring protocol: ${error.message}`);
  }
}

/**
 * Queries for protocols on a specific did
 * @param did
 * @param protocol
 * @param web5
 * @returns object
 */
export async function queryProtocol(did: string, protocol: string, web5: Web5) {
  try {
    const { protocols, status } = await web5.dwn.protocols.query({
      from: did,
      message: {
        filter: {
          protocol,
        },
      },
    });

    return { protocols, status };
  } catch (error: any) {
    throw new Error(`Error querying protocols: ${error.message}`);
  }
}
