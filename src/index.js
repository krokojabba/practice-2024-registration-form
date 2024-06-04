import  './styles.scss';
import  'bootstrap';
import _ from "lodash";

import init from './init';
import view from './view';
import app from './app';

const initState = init();
const state = view(initState);
app(state, _.cloneDeep(initState));
