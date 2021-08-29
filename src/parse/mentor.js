import Parse from 'parse';

export const getRequests = async () => {
  const query = new Parse.Query('RequestMentor');
  return await query.find();
};

export const getRequestSubscription = async () => {
  const query = new Parse.Query('RequestMentor');
  return await query.subscribe();
};
