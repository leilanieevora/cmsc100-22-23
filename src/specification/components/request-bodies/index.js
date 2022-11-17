export const requestBodies = {
  RequestNewUser: {
    description: 'Request body for new user',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/NewUserObject'
        }
      }
    }
  }
};
