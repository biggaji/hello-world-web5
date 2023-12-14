export const userProtocolDef = {
  protocol: 'https://auth.xyz.io',
  published: true,
  types: {
    data: {
      schema: 'https://auth.xyz.io/schemas/userSchema',
      dataFormats: ['application/json'],
    },
    firstname: {
      dataFormats: ['text/plain'],
    },
    lastname: {
      dataFormats: ['text/plain'],
    },
    email: {
      dataFormats: ['text/plain'],
    },
  },
  structure: {
    data: {
      $actions: [
        {
          who: 'anyone',
          can: 'read',
        },
        {
          who: 'author',
          of: 'data',
          can: 'write',
        },
      ],
      firstname: {
        $actions: [
          {
            who: 'anyone',
            can: 'read',
          },
          {
            who: 'author',
            of: 'data',
            can: 'write',
          },
        ],
      },
      lastname: {
        $actions: [
          {
            who: 'anyone',
            can: 'read',
          },
          {
            who: 'author',
            of: 'data',
            can: 'write',
          },
        ],
      },
      email: {
        $actions: [
          {
            who: 'anyone',
            can: 'read',
          },
          {
            who: 'author',
            of: 'data',
            can: 'write',
          },
        ],
      },
    },
  },
};

export const protocolURL = 'https://auth.xyz.io';
