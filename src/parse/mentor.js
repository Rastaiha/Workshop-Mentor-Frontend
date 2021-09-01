import Parse from 'parse';

export const getRequests = async () => {
  const query = new Parse.Query('RequestMentor');
  return await query.find();
};

export const deleteRequest = async ({ teamId, fsmId }) => {
  const query = new Parse.Query('RequestMentor');
  query.equalTo('teamId', teamId);
  query.equalTo('fsmId', fsmId);
  const requests = await query.find();
  Parse.Object.destroyAll(requests)
  return;
};

export const getRequestSubscription = async () => {
  const query = new Parse.Query('RequestMentor');
  return await query.subscribe();
};
