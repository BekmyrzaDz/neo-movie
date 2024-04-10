import { combineReducers, configureStore } from '@reduxjs/toolkit'
import filterReducer from '../componets/FilterBar/redux/filterBarSlice'
import searchReducer from '../componets/Header/redux/searchSlice'
import animeReducer from '../modules/Anime/redux/animeSlice'
import authReducer from '../modules/Auth/redux/authSlice'
import cartoonReducer from '../modules/Cartoon/redux/cartoonSlice'
import collectionReducer from '../modules/Collection/redux/collectionSlice'
import confirmCodeReducer from '../modules/ConfirmCode/redux/confirmCodeSlice'
import createPasswordReducer from '../modules/CreatePassword/redux/createPasswordSlice'
import detailReducer from '../modules/DetailCard/redux/detailCardSlice'
import forgotPasswordReducer from '../modules/ForgotPassword/redux/forgotPasswordSlice'
import homeReducer from '../modules/Home/redux/homeSlice'
import movieReducer from '../modules/Movie/redux/movieSlice'
import profileReducer from '../modules/Profile/redux/profileSlice'
import changeProfileReducer from '../modules/ProfileChange/redux/changeProfileSlice'
import changeProfilePasswordReducer from '../modules/ProfileChangePassword/redux/changeProfilePasswordSlice'
import registerReducer from '../modules/Register/redux/registerSlice'
import savedReducer from '../modules/Saved/redux/savedSlice'
import serialReducer from '../modules/Serial/redux/serialSlice'

const rootReducer = combineReducers({
	home: homeReducer,
	movie: movieReducer,
	serial: serialReducer,
	cartoon: cartoonReducer,
	anime: animeReducer,
	collection: collectionReducer,
	filter: filterReducer,
	detail: detailReducer,
	search: searchReducer,
	register: registerReducer,
	auth: authReducer,
	forgotPassword: forgotPasswordReducer,
	confirmCode: confirmCodeReducer,
	createPassword: createPasswordReducer,
	saved: savedReducer,
	profile: profileReducer,
	changeProfile: changeProfileReducer,
	changeProfilePassword: changeProfilePasswordReducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
