import { Record, Map, List } from 'immutable';

export class ProjectDataState extends Record({
  _id: '',
  name: '',
  backgroundUrl: ''
}) {}

class ProjectState extends Record({
  error: null,
  action: '',
  data: Map(),
  projects: List()
}) {}

export default new ProjectState();
