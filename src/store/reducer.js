import { combineReducers } from 'redux';

const DEFAULT = [{}];

const setData = (state=DEFAULT, action)=>{
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
            }
    }
}

const rootReducer = combineReducers({
    setData
});

export default rootReducer;