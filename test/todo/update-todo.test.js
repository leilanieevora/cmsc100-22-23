import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = '/api';

describe('Update todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should update the object given an ID', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update',
      description: 'Some description for update',
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });
    response.statusCode.must.be.equal(200);
    const result = await response.json();
    result.id.must.be.equal(id);
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newerTodo.description);
    result.isDone.must.be.equal(newerTodo.isDone);
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });

  it('Should update the object given an ID and only isDone is being updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      isDone: true
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });
    response.statusCode.must.be.equal(200);
    const result = await response.json();
    result.id.must.be.equal(id);
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.equal(newerTodo.isDone);
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });

  it('Should update the object given an ID and only title is updated', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const newerTodo = {
      title: 'New Todo for update 2'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id, createdDate, updatedDate } = await createResponse.json();

    const response = await app.inject({
      method: 'PUT',
      url: `${prefix}/todo/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newerTodo)
    });
    response.statusCode.must.be.equal(200);
    const result = await response.json();
    result.id.must.be.equal(id);
    result.title.must.be.equal(newerTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.false();
    result.createdDate.must.equal(createdDate);
    result.updatedDate.must.above(updatedDate);
  });
});
