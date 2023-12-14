import { Web5 } from '@web5/api';
import { userProtocolDef } from '../protocols/userProtocolDefinition.js';

export type UserRecord = {
  firstname: string;
  lastname: string;
  email: string;
};

/**
 * Creates a new record and store it within my own dwn
 * @param payload
 * @returns record
 */
async function createUserRecord(payload: { data: UserRecord; web5: Web5; schema: string }) {
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
      },
    });

    if (status.code !== 202 && status.detail == 'Accepted') {
      throw new Error('Record was not created');
    }

    return record;
  } catch (error: any) {
    throw new Error(`Error creating user record: ${error.message}`);
  }
}

async function fetchAllRecords() {}

async function fetchRecordById() {}

async function updateRecordById() {}

async function deleteRecordById() {}

export { createUserRecord, fetchAllRecords, fetchRecordById, updateRecordById, deleteRecordById };
