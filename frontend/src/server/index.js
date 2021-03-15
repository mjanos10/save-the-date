import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      record: Model,
    },

    seeds(server) {
      server.create('record', {
        id: '1',
        isComing: '',
        people: ['Johnny', 'Jane'],
        canBringPlusOne: false,
        askChildren: true,
        multipleChildren: false,
        children: undefined,
      });
      server.create('record', { id: '2', name: 'Alice' });
    },

    routes() {
      // this.namespace = 'api';

      this.get('/record/:recordId', (schema, request) => {
        console.log(request.params.recordId);
        console.log(typeof request.params.recordId);
        const record = schema.findBy('record', { id: request.params.recordId });

        if (!record) {
          console.log('[mirage] no record found', record);
          return new Response(404, {}, { error: 'NOT_FOUND' });
        }

        console.log('[mirage] found record', record);

        return record.attrs;
      });
    },
  });

  return server;
}
