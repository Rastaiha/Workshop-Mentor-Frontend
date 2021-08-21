// accounts:
export const loginUrl = 'auth/accounts/login/';
export const changePasswordUrl = 'auth/accounts/change_pass/';
export const verificationCodeUrl = 'auth/accounts/verification_code/';
export const accountCRUDUrl = ({ id }) => id ? `auth/accounts/${id}/` : 'auth/accounts/';
export const profileCRUDUrl = ({ id }) => id ? `auth/profile/${id}/` : 'auth/profile/';
export const studentshipCRUDUrl = 'auth/studentship/';

// fsm:
export const eventInfoUrl = ({ eventId = undefined }) => eventId ? `fsm/event/${eventId}/` : 'fsm/event/';
export const allRegistrationReceiptsUrl = ({ registrationFormId = undefined }) => `fsm/registration/${registrationFormId}/get_receipts/`;
export const oneRegistrationReceiptUrl = ({ registrationReceiptId = undefined }) => `fsm/receipts/${registrationReceiptId}/`;






export const workshopsUrl = 'fsm/fsm/';

export const getUnreadNotificationsUrl = 'notifications/api/unread_list/';

export const articlesUrl = 'fsm/article/';

export const statesUrl = 'fsm/state/';

export const helpUrl = 'fsm/help/';

export const widgetUrl = 'fsm/widget/';

export const workshopTeamsUrl = 'fsm/workshopplayers/';

export const getLandingDataUrl = `https://res.cloudinary.com/dflcxtpro/raw/upload/v${Math.floor(
  Math.random() * 10000000
)}/rasta/landing-zero-v3_d5lbgq.json`;

export const goBackwardUrl = 'fsm/gobackward/';

export const goForwardUrl = 'fsm/goforward/';

export const participantGetCurrentStateUrl = 'fsm/getcurrentstate/';

export const mentorGetCurrentStateUrl = 'fsm/mentorgetplayerstate/';

export const visitWorkshopPlayerUrl = 'fsm/visitteam/';

export const sendAnswerUrl = 'fsm/sendanswer/';

export const startWorkshopUrl = 'fsm/startWorkshop/';

export const requestMentorUrl = 'fsm/requestmentor/';

export const getEventRegistrationInfoUrl = 'auth/registration-info/';

export const paymentRequestUrl = 'auth/pay/';

export const applyDiscountUrl = 'auth/verify-discount/';

export const getScoresUrl = 'fsm/getscores/';

export const getProblemsUrl = 'fsm/getproblems/';

export const getSubmissionsUrl = 'fsm/getsubmissions/';

export const markSubmissionUrl = 'fsm/marksubmission/';

export const getWorkshopsDescriptionUrl = 'fsm/getworkshopsdescription/';