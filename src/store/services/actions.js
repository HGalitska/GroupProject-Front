import * as types from './action-types';
import * as Services from '../../microservices/services';

export function getService(serviceId) {
    return async (dispatch, getState) => {
        let res = await Services.getService(serviceId);
        dispatch({
            type: types.SERVICE_FETCHED,
            errors: res.errors,
            service: res.service
        });
    };
}

export function resetService() {
    return {
        type: types.SERVICE_RESET
    };
}

export function getUserServices(userId) {
    return async (dispatch, getState) => {
        let res = await Services.getUserServices(userId);
        dispatch({
            type: types.USER_SERVICES_FETCHED,
            services: res.services
        });
    };
}

export function searchService(query) {
    return async (dispatch, getState) => {
        let res = await Services.serviceSearch(query);
        dispatch({
            type: types.SEARCH_FETCHED,
            errors: res.errors,
            services: res.services
        });
    };
}

export function resetSearch() {
    return {
        type: types.SEARCH_RESET
    };
}
