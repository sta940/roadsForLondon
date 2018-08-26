export function setActiveRoad(roadIndex) {
    return {
        type: 'SET_ACTIVE_ROAD',
        roadIndex
    };
}

export function fetchRoadSuccess(fetchedRoad) {
    return {
        type: 'FETCH_ROAD_SUCCESS',
        fetchedRoad
    };
}

export function setRoads(roadsData) {
    return {
        type: 'SET_ROADS',
        roadsData
    };
}

export function fetchRoad(url) {
    return (dispatch) => {
        fetch(url)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchRoadSuccess(json));
        })
        .catch((err)=>console.log(err));
    };
}

export function fetchData(url) {
    return (dispatch) => {
        fetch(url)
        .then(res => res.json())
        .then(json => {
            dispatch(setRoads(json));
        })
        .catch((err)=>console.log(err));
    };
}
