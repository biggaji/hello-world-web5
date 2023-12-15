import { userProtocolDef } from '../protocols/userProtocolDefinition.js';
/**
 * Creates a new record and store it within my own dwn
 * @param payload
 * @returns record
 */
async function createUserRecord(payload) {
    try {
        // Basic data validation
        if (!payload.data || !payload.web5 || !payload.schema) {
            throw new Error('All parameters are required to create a record');
        }
        const { record, status } = await payload.web5.dwn.records.create({
            data: payload.data,
            message: {
                schema: payload.schema,
                protocol: userProtocolDef.protocol,
                dataFormat: 'application/json',
                protocolPath: 'data',
                published: true,
            },
        });
        if (status.code !== 202 && status.detail == 'Accepted') {
            throw new Error('Record was not created');
        }
        return record;
    }
    catch (error) {
        throw new Error(`Error creating user record: ${error.message}`);
    }
}
/**
 * Fetch all records
 * @param web5
 * @param protocol
 * @param did
 * @returns records
 */
async function fetchAllRecords(web5, protocol, did) {
    try {
        const { records, status } = await web5.dwn.records.query({
            message: {
                filter: {
                    dataFormat: 'application/json',
                    protocol,
                },
            },
        });
        if (status.code !== 200) {
            throw new Error('Failed to fetch records');
        }
        if (records && records.length === 0) {
            return [];
        }
        const userRecords = await Promise.all(records.map(async (record) => {
            return await record.data.json();
        }));
        return userRecords;
    }
    catch (error) {
        throw new Error(`Error fetching all records: ${error.message}`);
    }
}
/**
 * Fetches a record by its id
 * @param recordId
 * @param web5
 * @param did
 * @returns record
 */
async function fetchRecordById(recordId, web5) {
    try {
        const { record } = await web5.dwn.records.read({
            message: {
                filter: {
                    recordId,
                    dataFormat: 'application/json',
                },
            },
        });
        if (!record) {
            throw new Error('Record not found');
        }
        return await record.data.json();
    }
    catch (error) {
        throw new Error(`Error fetching record: ${error.message}`);
    }
}
async function updateRecordById(recordId, payload, web5) {
    try {
        const { record } = await web5.dwn.records.read({
            message: {
                filter: {
                    recordId,
                },
            },
        });
        const data = await record.data.json();
        if (!data) {
            throw new Error('Record not found');
        }
        const { email, firstname, lastname } = payload;
        if (email) {
            data.email = email;
        }
        if (firstname) {
            data.firstname = firstname;
        }
        if (lastname) {
            data.lastname = lastname;
        }
        const { status } = await record.update({ data });
        return status;
    }
    catch (error) {
        throw new Error(`Error updating record: ${error.message}`);
    }
}
/**
 * Deletes a record from the dwn
 * @param recordId
 * @param web5
 * @returns status
 */
async function deleteRecordById(recordId, web5) {
    try {
        const { status } = await web5.dwn.records.delete({
            message: {
                recordId,
            },
        });
        if (status.code !== 202) {
            throw new Error('Failed to delete record');
        }
        return status;
    }
    catch (error) {
        throw new Error(`Error deleting record: ${error.message}`);
    }
}
export { createUserRecord, fetchAllRecords, fetchRecordById, updateRecordById, deleteRecordById };
