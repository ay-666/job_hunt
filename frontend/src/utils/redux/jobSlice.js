import { createSlice } from "@reduxjs/toolkit";
import { setSearchCompanyByText } from "./companySlice";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        adminJobs:[],
        singleJob:null,
        searchJobByText:"",
        appliedJobs:[],
        searchQuery:"",
        loading:false
    },

    reducers:{
        setAllJobs : (state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob : (state,action)=>{
            state.singleJob = action.payload;
        },
        setAdminJobs: (state,action) =>{
            state.adminJobs = action.payload;
        },
        setSearchJobByText : (state,action) =>{
            state.searchJobByText = action.payload;
        }, 
        setAppliedJobs : (state,action)=>{
            state.appliedJobs = action.payload;
        },
        setSearchQuery : (state,action) =>{
            state.searchQuery = action.payload;
        },
        setLoading: (state,action)=>{
            state.loading = action.payload;
        }
    }
});

export const {setAllJobs , setSingleJob, setAdminJobs , setSearchJobByText , setAppliedJobs, setSearchQuery,setLoading} = jobSlice.actions;

export default jobSlice.reducer;