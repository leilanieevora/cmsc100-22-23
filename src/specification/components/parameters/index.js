export const parameters = {
  TodoParameterId: {
    name: 'todoId',
    in: 'path',
    required: true,
    description: 'Todo ID',
    schema: {
      type: 'string'
    }
  }
};
