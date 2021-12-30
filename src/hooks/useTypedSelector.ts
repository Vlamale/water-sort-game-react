import { RootState } from "../redux/rootReducer";
import {useSelector, TypedUseSelectorHook} from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector