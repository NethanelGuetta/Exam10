import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AttackType } from "../../types/attackTypes"
import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/attacks'
interface defenceRequest {
    id: string,
    defenceMissileName: string,
    timeLeft: number
}
interface AttackState {
    attack: AttackType[] ;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: AttackState = {
    attack: [],
    status: 'idle',
    error: null,
};  

export const getAttacksByLocation = createAsyncThunk(
    'attacks/getAttacksByLocation',
    async (location: string): Promise<AttackType[] | undefined> => {
        const response = await axios.get(`${BASE_URL}/getByLocation/${location}`);
        return response.data
    }
);

export const addAttack = createAsyncThunk(
    'attacks/addAttack',
    async (attack: Partial<AttackType>) => {
        const response = await axios.post(`${BASE_URL}/attack`, attack )
        return response.data
    }
);

export const removeAttack = createAsyncThunk(
    'attacks/removeAttack',
    async (data: defenceRequest) => {
        console.log(data);
        
        const response = await axios.post(`${BASE_URL}/defence/${data.id}`, {"defenceMissileName": data.defenceMissileName, "timeLeft": data.timeLeft})
        return response.data
    }
)


export const attackSlice = createSlice({
    name: 'attack',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAttacksByLocation.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getAttacksByLocation.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'succeeded'
                    state.attack = action.payload
                }
            })
            .addCase(getAttacksByLocation.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown error'
            })
            .addCase(addAttack.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addAttack.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.attack.push(action.payload)
            })
            .addCase(addAttack.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown error'
            })
            .addCase(removeAttack.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(removeAttack.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // state.attack = action.payload
            })
            .addCase(removeAttack.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown error'
            })

    }
});

export default attackSlice.reducer;