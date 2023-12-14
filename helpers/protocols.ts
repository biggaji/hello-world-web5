import { Web5 } from '@web5/api';

export async function configureProtocol(did: string, protocolDef: any, web5: Web5) {
  console.log('---INSTALLING PROTOCOL---');
  const { protocol, status } = await web5.dwn.protocols.configure({
    message: {
      definition: protocolDef,
    },
  });

  // Sends protocol to remote DWNs immediately (vs waiting for sync)
  await protocol!.send(did);
  console.log('---PROTOCOL INSTALLED---');
  return status;
}
