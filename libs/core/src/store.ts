import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import * as interaction from './modules/interaction/index';
import * as person from './modules/person/index';
import * as settings from './modules/settings/index';
import * as auth from './modules/auth/index';
import * as tags from './modules/tags/index';
import * as family from './modules/family/index';

import { FilterSet, Filter } from './common/common.model';

export interface AppState {
  interaction: interaction.InteractionState;
  person: person.PersonState;
  settings: settings.SettingsState;
  tags: tags.TagState;
  family: family.FamilyState;
  auth: auth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  interaction: interaction.interactionReducer,
  person: person.personReducer,
  settings: settings.settingsReducer,
  tags: tags.tagReducer,
  family: family.familyReducer,
  auth: auth.authReducer
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = [];

/**
 * People Reducers
 */
export const getPersonState: any = (state: AppState) => state.person;
export const getPeople: any = createSelector(getPersonState, person.people);
export const getSelectedPerson: any = createSelector(getPersonState, person.person);
export const getLastCreatedPersonId: any = createSelector(getPersonState, person.lastCreatedPersonId);
/**
 * Auth Reducers
 */
export const getAuthState: any = (state: AppState) => state.auth;
export const isAuth: any = createSelector(getAuthState, auth.isAuthenticated);
export const isAuthLoading: any = createSelector(getAuthState, auth.isAuthenticationLoading);
export const getAuthError: any = createSelector(getAuthState, auth.getAuthenticationError);
export const isAuthLoaded: any = createSelector(getAuthState, auth.isAuthenticatedLoaded);
export const getAuthPersonId: any = createSelector(getAuthState, auth.getPersonId);
export const getAuthPerson: any = createSelector(
  getPeople,
  getAuthPersonId,
  (people: person.Person[], personId: string) => {
    return people.filter((p: person.Person) => p.uid === personId)[0];
  }
);
/**
 * Settings Reducers
 */
export const getSettingsState: any = (state: AppState) => state.settings;
export const getLayoutSettings: any = createSelector(getSettingsState, settings.layoutSettings);
export const getPeopleSettings: any = createSelector(getSettingsState, settings.peopleSettings);
export const getPeopleListSettings: any = createSelector(getSettingsState, settings.peopleListSettings);
export const getPeopleFilterSettings: any = createSelector(getSettingsState, settings.peopleFilterSettings);
export const getProfileSettings: any = createSelector(getSettingsState, settings.profileSettings);
export const getSysSettings: any = createSelector(getSettingsState, settings.sysSettings);

export const getShowDrawer: any = createSelector(getSettingsState, settings.showDrawer);
export const getTitle: any = createSelector(getSettingsState, settings.title);
export const getContextButtons: any = createSelector(getSettingsState, settings.contextButtons);
export const getSysGoogleKey: any = createSelector(getSettingsState, settings.sysGoogleKey);

export const getPeopleSysSettings: any = createSelector(getPeopleSettings, getSysSettings, (people: any, system: any) =>
  Object.assign({}, people, system)
);
/**
 * Interaction Reducers
 */
export const getInteractionState: any = (state: AppState) => state.interaction;
export const getInteractions: any = createSelector(getInteractionState, interaction.interactions);
export const getMyInteractions: any = createSelector(
  getInteractions,
  getAuthPersonId,
  (interactions: any, personId: string) => {
    return interactions.filter((i: any) => i.recipients.indexOf(personId) > -1);
  }
);
export const getInteractionsPerson: any = createSelector(
  getInteractions,
  getSelectedPerson,
  (interactions: any, p: any) => {
    return interactions.filter((i: any) => i.refId === p.uid);
  }
);
/**
 * Tag Reducers
 */
export const getTagState: any = (state: AppState) => state.tags;
export const getTags: any = createSelector(getTagState, tags.tags);
/**
 * Family Reducers
 */
export const getFamilyState: any = (state: AppState) => state.family;
export const getFamilies: any = createSelector(getFamilyState, family.families);
export const getFamilyPerson: any = createSelector(getFamilies, getSelectedPerson, (families: any, p: any) => {
  return 'id' in p.family ? families.filter((f: any) => f.id === p.family.id) : [];
});
/**
 * Loading  Reducers
 */
export const getLoadingP: any = createSelector(getPersonState, person.loadingPerson);
export const getLoadingS: any = createSelector(getSettingsState, settings.loadingSettings);
export const getLoadingI: any = createSelector(getInteractions, interaction.loadingInteraction);
export const getLoadingT: any = createSelector(getTags, tags.loadingTags);
export const getLoading: any = createSelector(
  getLoadingP,
  getLoadingS,
  getLoadingI,
  (lP: boolean, lS: boolean, lI: boolean) => lP || lS || lI
);
/**
 * Message  Reducers
 */
export const getMessageP: any = createSelector(getPersonState, person.messagePerson);
export const getMessageS: any = createSelector(getSettingsState, settings.messageSettings);
export const getMessageI: any = createSelector(getInteractionState, interaction.messageInteraction);
export const getMessageT: any = createSelector(getTagState, tags.messageTags);
export const getMessageF: any = createSelector(getFamilyState, family.messageFamilies);
export const getMessage: any = createSelector(
  getMessageP,
  getMessageS,
  getMessageI,
  getMessageT,
  getMessageF,
  (msgP: any, msgS: any, msgI: any, msgT: any, msgF: any) => msgP || msgS || msgI || msgT || msgF
);
// TODO: make this work (below)
/*export const getMessage: any = (state: AppState) => [getMessageP, getMessageS]
        .find(messageSelector => messageSelector(state));*/

export const getPeopleWithFilter: any = createSelector(
  getPeople,
  getPeopleFilterSettings,
  (people: person.Person[], filter: Filter) => {
    if (filter && filter.hasOwnProperty('term')) {
      return people.filter(search, filter.term.split(' '));
    } else {
      return people;
    }
    function search(prs: person.Person) {
      return this.every((searchTerm: string) => {
          let found = false;
          const fieldSearch: string[] = searchTerm.split(':');
          if (fieldSearch.length === 1) {
              const sFullname = prs.fullName.includes(searchTerm);
              const sStatus = prs.status.some((s: tags.Tag) => s.text.includes(searchTerm));
              found = sFullname || sStatus;
          } else {
                const filterSet: FilterSet = person.personFilterSet
                    .filter((set: any) => set.label === fieldSearch[0].toLocaleLowerCase())[0];
                if (filterSet.key === 'age') {
                    const exprRange = fieldSearch[1].split('-');
                    // const exprGt = fieldSearch[1].split('>');
                    // const exprLt = fieldSearch[1].split('<');

                    if (exprRange.length > 1) {
                        found = prs[filterSet.key] >= parseInt(exprRange[0] , 10)
                            && prs[filterSet.key] <= parseInt(exprRange[1], 10);
                    } else {
                        found = parseInt(fieldSearch[1], 10) === prs[filterSet.key];
                    }
                } else {
                    found = fieldSearch[1] === prs[filterSet.key]
                }
          }
          return found;
      });
    }
  }
);
