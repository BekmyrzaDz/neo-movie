import { combineReducers, configureStore } from '@reduxjs/toolkit'
import animeReducer from '../modules/Anime/redux/animeSlice'
import cartoonReducer from '../modules/Cartoon/redux/cartoonSlice'
import homeReducer from '../modules/Home/redux/homeSlice'
import movieReducer from '../modules/Movie/redux/movieSlice'
import serialReducer from '../modules/Serial/redux/serialSlice'

const rootReducer = combineReducers({
	home: homeReducer,
	movie: movieReducer,
	serial: serialReducer,
	cartoon: cartoonReducer,
	anime: animeReducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
