export const responses = {
  SuccessfulUserResponse: {
    description: 'Successful response, return user object',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UserObject'
        }
      }
    }
  }
};
