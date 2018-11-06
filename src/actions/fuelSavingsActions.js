import * as types from "../constants/actionTypes";
import { v4 as uuid } from "uuid";
import { getFormattedDateTime } from "../utils/dates";

// example of a thunk using the redux-thunk middleware
export function saveFuelSavings(settings) {
  return function(dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings

    // call api to save
    let payload = {
      id: uuid(),
      dateModified: getFormattedDateTime(),
      settings
    };

    // const { savings, ...others } = payload.settings;

    // console.log(
    //   JSON.stringify({
    //     ...savings,
    //     ...others,
    //     dateModified: payload.dateModified
    //   })
    // );

    return dispatch({
      type: types.SAVE_FUEL_SAVINGS,
      settings: payload.settings,
      meta: {
        offline: {
          // the network action to execute:
          effect: {
            url: "http://localhost:3000/fuel-savings",
            method: "GET",
            json: {
              ...payload
            }
          },
          // action to dispatch when effect succeeds:
          commit: { type: "FUEL_SAVINGS_COMMIT", meta: { ...payload } },
          // action to dispatch if network action fails permanently:
          rollback: { type: "FUEL_SAVINGS_ROLLBACK", meta: { ...payload } }
        }
      }
    });
  };
}

export function calculateFuelSavings(settings, fieldName, value) {
  return {
    type: types.CALCULATE_FUEL_SAVINGS,
    dateModified: getFormattedDateTime(),
    settings,
    fieldName,
    value
  };
}
