import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  articlesUrl,
  getProblemsUrl,
  getSubmissionsUrl,
  getUnreadNotificationsUrl,
  helpUrl,
  markSubmissionUrl,
  statesUrl,
  visitWorkshopPlayerUrl,
  widgetUrl,
  workshopsUrl,
  workshopTeamsUrl,
} from '../constants/urls';

const initialState = {
  workshops: [],
  articles: [],
  teams: {},
  notifications: [],
  problems: [],
  submissions: [],
  submissionsIsLoading: false,
};

export { initialState as mentorInitialState };

export const getUnreadNotificationsAction = createAsyncThunkApi(
  'workshops/getNotifications',
  Apis.GET,
  getUnreadNotificationsUrl
);

export const getWorkshopsAction = createAsyncThunkApi(
  'workshops/getAll',
  Apis.GET,
  workshopsUrl
);

export const getWorkshopAction = createAsyncThunkApi(
  'workshops/getOne',
  Apis.GET,
  ({ fsmId }) => workshopsUrl + fsmId + '/'
);

export const getProblemsAction = createAsyncThunkApi(
  'workshops/getProblems',
  Apis.GET,
  getProblemsUrl
);

export const getSubmissionsAction = createAsyncThunkApi(
  'workshops/getSubmissions',
  Apis.POST,
  getSubmissionsUrl,
  {
    bodyCreator: ({ fsmId, stateId, problemId }) => ({
      fsm_id: fsmId,
      state_id: stateId,
      problem_id: problemId,
    }),
  }
);

export const markSubmissionAction = createAsyncThunkApi(
  'workshops/markSubmission',
  Apis.POST,
  markSubmissionUrl,
  {
    bodyCreator: ({ submissionId, score, description }) => ({
      submission_id: submissionId,
      score,
      description,
    }),
    defaultNotification: {
      success: 'نمره با موفقیت ثبت شد!',
    },
  }
);

export const getArticlesAction = createAsyncThunkApi(
  'articles/getAll',
  Apis.GET,
  articlesUrl
);

export const getArticleAction = createAsyncThunkApi(
  'articles/getOne',
  Apis.GET,
  ({ articleId }) => articlesUrl + articleId + '/'
);

export const createArticleAction = createAsyncThunkApi(
  'articles/create',
  Apis.POST,
  articlesUrl
);

export const getStateAction = createAsyncThunkApi(
  'states/getOne',
  Apis.GET,
  ({ stateId }) => statesUrl + stateId + '/'
);


export const createWidgetAction = createAsyncThunkApi(
  'states/widget/create',
  Apis.POST,
  widgetUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت اضافه شد.',
    },
  }
);

export const deleteWidgetAction = createAsyncThunkApi(
  'states/widgets/delete',
  Apis.DELETE,
  widgetUrl,
  {
    bodyCreator: (widget) => ({ ...widget }),
    defaultNotification: {
      success: 'ویجت با موفقیت حذف شد.',
    },
  }
);


export const createVideoWidgetAction = ({ paper, link }) =>
  createWidgetAction({
    paper,
    widget_type: 'Video',
    link,
  });

export const createMiniGameWidgetAction = ({ paper, link }) =>
  createWidgetAction({
    paper,
    widget_type: 'Game',
    link,
  });

export const createImageWidgetAction = ({ paper, link }) =>
  createWidgetAction({
    paper,
    widget_type: 'Image',
    link,
  });

export const createSmallAnswerQuestionWidgetAction = ({
  paper,
  text,
  answer,
}) =>
  createWidgetAction({
    paper,
    widget_type: 'ProblemSmallAnswer',
    text,
    answer: { text: answer },
  });

export const createBigAnswerQuestionWidgetAction = ({ paper, text, answer }) =>
  createWidgetAction({
    paper,
    widget_type: 'ProblemBigAnswer',
    text,
    answer: { text: answer },
  });

export const createMultiChoicesQuestionWidgetAction = ({
  paper,
  text,
  answer,
  choices,
}) =>
  createWidgetAction({
    paper,
    widget_type: 'ProblemMultiChoice',
    text,
    answer: { text: answer },
    choices,
  });

export const createTextWidgetAction = ({ paper, text }) =>
  createWidgetAction({
    paper,
    widget_type: 'Description',
    text,
  });

export const createUploadFileWidgetAction = ({ paper, text }) =>
  createWidgetAction({
    paper,
    widget_type: 'ProblemUploadFileAnswer',
    text,
  });

export const deleteStateAction = createAsyncThunkApi(
  'states/delete',
  Apis.DELETE,
  ({ stateId }) => statesUrl + stateId + '/'
);

export const getWidgetAction = createAsyncThunkApi(
  'states/widgets/getOne',
  Apis.GET,
  ({ widgetId }) => widgetUrl + widgetId + '/'
);

export const getWorkshopTeamsAction = createAsyncThunkApi(
  'workshops/teams/getAll',
  Apis.POST,
  workshopTeamsUrl,
  {
    bodyCreator: ({ fsmId }) => ({ fsm: fsmId }),
  }
);

export const visitWorkshopPlayerAction = createAsyncThunkApi(
  'workshops/teams/visitWorkshopPlayer',
  Apis.POST,
  visitWorkshopPlayerUrl,
  {
    bodyCreator: ({ workshopPlayerId }) => ({
      player_workshop: workshopPlayerId,
    }),
  }
);

export const createHelpAction = createAsyncThunkApi(
  'states/helps/create',
  Apis.POST,
  helpUrl,
  {
    bodyCreator: ({ stateId }) => ({ state: stateId, name: 'help' }),
  }
);

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {},
  extraReducers: {
    [getWorkshopsAction.pending.toString()]: (state) => {
      state.getWorkshopsLoading = true;
    },
    [getWorkshopsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.workshops = response;
      state.getWorkshopsLoading = false;
    },
    [getWorkshopsAction.rejected.toString()]: (state) => {
      state.getWorkshopsLoading = false;
    },
    [getWorkshopAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.workshops = state.workshops.filter(
        (workshop) => +workshop.id !== +response.id
      );
      state.workshops.push(response);
    },
    [getArticlesAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.articles = response;
    },
    [getArticleAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.articles = state.articles.filter(
        (article) => +article.id !== +response.id
      );
      state.articles.push(response);
    },

    [getWorkshopTeamsAction.fulfilled.toString()]: (
      state,
      { payload: { response }, meta: { arg } }
    ) => {
      state.teams = {
        ...state.teams,
        [arg.fsmId]: { teams: response, lastUpdate: Date.now() },
      };
    },
    [getUnreadNotificationsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.notifications = response.unread_list.map(
        (unread) => +unread.actor_object_id
      );
    },
    [visitWorkshopPlayerAction.fulfilled.toString()]: (
      state,
      { meta: { arg } }
    ) => {
      state.notifications = state.notifications.filter(
        (notification) => notification !== arg.workshopPlayerId
      );
    },

    [getProblemsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.problems = response;
    },

    [getSubmissionsAction.pending.toString()]: (state) => {
      state.submissionsIsLoading = true;
    },
    [getSubmissionsAction.rejected.toString()]: (state) => {
      state.submissionsIsLoading = false;
    },
    [getSubmissionsAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.submissions = response;
      state.submissionsIsLoading = false;
    },


  },
});

export const { reducer: widgetReducer } = mentorSlice;
