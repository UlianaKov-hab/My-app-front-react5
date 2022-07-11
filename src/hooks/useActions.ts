import { useMemo, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import  ActionCreator  from '../store/action-creator';

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(()=> bindActionCreators(ActionCreator, dispatch), [dispatch]);
}