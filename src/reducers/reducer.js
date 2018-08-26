export function roadData(state = {}, action) {
    switch (action.type) {
        case 'FETCH_ROAD_SUCCESS':
            return action.fetchedRoad;
        default:
            return state;
    }
}

export function activeRoad(state = 0, action) {
    switch (action.type) {
        case 'SET_ACTIVE_ROAD':
            return action.roadIndex;
        default:
            return state;
    }
}

export function roads(state = [] , action) {
    switch (action.type) {
        case 'SET_ROADS':
            return action.roadsData;
        default:
            return state;
    }
}
