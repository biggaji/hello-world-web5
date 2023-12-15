import { Web5 } from '@web5/api';
import { protocolURL, userProtocolDef } from './protocols/userProtocolDefinition.js';
import { configureProtocol, queryProtocol } from './helpers/protocols.js';
const { web5, did: personalDid } = await Web5.connect();
// Check if the userProtocolDef protocol installed already else go ahead and install it.
const { protocols, status } = await queryProtocol(personalDid, protocolURL, web5);
if (protocols.length === 0 && status.code === 200) {
    console.log('---NO PROTOCOL INSTALLED YET---');
    // Proceed to installing the protocol into the dwn
    await configureProtocol(personalDid, userProtocolDef, web5);
}
else {
    console.log('---PROTOCOL EXISTS---\n---SKIPPING PROTOCOL CHECK STEP---');
}
/**
 * NOTE: Web5 has 2 statusCodes:
 * 1. Write (create, delete, update): 202
 * 2. Read (read, query): 200
 */
// Create a new record
// const userRecord = await createUserRecord({
//   data: {
//     email: 'Johndoe@email.com',
//     firstname: 'John',
//     lastname: 'Doe',
//   },
//   web5,
//   schema: 'https://auth.xyz.io/schemas/userSchema',
// });
// console.log('Record Created:', userRecord);
// Fetch a list of records
// const records = await fetchAllRecords(web5, userProtocolDef.protocol);
// console.log(records);
// const recordId = 'bafyreicq5qqelrjf3l2j2exehu5e2ujo5jb4ew2zrqvkts67n2cv3kpx7a';
// Get a record by id
// const record = await fetchRecordById(recordId, web5, userProtocolDef.protocol);
// console.log(record);
// Update record by id
// const updateStatus = await updateRecordById(recordId, { email: 'janet@doe.org', firstname: 'Janet' }, web5);
// console.log(updateStatus);
// Delete a record by id
// const deleteStatus = await deleteRecordById(recordId, web5);
// console.log(deleteStatus);
