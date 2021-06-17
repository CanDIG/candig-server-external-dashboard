import { combineReducers } from 'redux';

const setData = (state, action)=>{
    switch(action.type){
        case "SET_SELECTED_DATASET":
            return {
                ...state,
                selectedDataset: action.payload,  
            }
        case "SET_DATASETS":
            return {
                ...state,
                datasets : {
                    ...action.payload
                }
            }
        case "SET_UPDATE_STATE": 
            return {
            ...state,
                update : {
                   ...action.payload
                }
        }
        default:
            return {
                ...state,
                selectedDataset: '',
                datasets: {},  
                update: {
                    datasetName: '',
                    datasetId: '',
                }
            }
    }
}

const rootReducer = combineReducers({
    setData
});

export default rootReducer;