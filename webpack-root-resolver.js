const path = require('path');

class RootResolverPlugin {
  apply(resolver) {
    resolver
      .getHook('before-existing-directory')
      .tapAsync('RootResolverPlugin', (request, resolveContext, callback) => {
        if (request.request) {
          console.log(request);
        }
        if (request.request && request.request.startsWith('~/../')) {
          const resourcePath = request.request.substr(5);

          const nextRequest = Object.assign({}, request, {
            request: path.resolve(`./${resourcePath}`),
          });

          resolver.doResolve('resolve', nextRequest, '', callback);
        } else {
          callback();
        }
      });
  }
}

module.exports = RootResolverPlugin;
