export default (request) => {
  const xhr = require('xhr');
  const query = require('codec/query_string');

  const apiKey = 'ZIpb3pojBXgB4xV087bLBP031rGEcOOt';
  const apiUrl = 'http://api.giphy.com/v1/gifs/search';

  const regex = /\/gif\s\(([^.?]*)\)|\/gif\s\w+/g;
  let textToAnalyze = request.message.text;

  const matches = textToAnalyze.match(regex) || [];
  const rets = [];

  matches.forEach((match) => {
      const queryParams = {
          api_key: apiKey,
          limit: 1,
          rating: 'g',
          q: match.split('/gif')[1]
      };

      let url = apiUrl + '?' + query.stringify(queryParams);

      const a = xhr.fetch(url)
          .then((r) => {
              const body = JSON.parse(r.body || r);
              return body.data[0].images.fixed_height.url;
          })
          .catch((e) => {
              console.error(e);
          });
          
      rets.push(a);
  });

  return Promise.all(rets).then((values) => {
      request.message.gifs = values;
      request.message.text = textToAnalyze.replace(/\/gif\s\(([^.?]*)\)/g, '$1').replace(/\/gif\s/g, '');
      return request.ok();
  });
};