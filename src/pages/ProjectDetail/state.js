import { Record, Map, List } from 'immutable';

export class TaskDataState extends Record({
  _id: '',
  name: '',
  position: '',
  projectId: '',
  listId: '',
  description: '',
  createdAt: '',
  member: [],
  label: [],
  userId: ''
}) {}

export class ListDataState extends Record({
  _id: '',
  name: '',
  backgroundUrl: '',
  createdAt: '',
  member: [],
  userId: '',
  tasks: []
}) {}

export class ProjectInfoDataState extends Record({
  _id: '',
  name: '',
  backgroundUrl: '',
  createdAt: '',
  member: [],
  userId: ''
}) {}

export class ListState extends Record({
  data: Map(),
  listIds: List()
}) {}

export class TaskState extends Record({
  data: Map(),
  listIds: List()
}) {}

export class ProjectDetailState extends Record({
  error: null,
  action: '',
  info: Map(),
  tasks: new TaskState(),
  lists: new ListState()
}) {}

//inital state
export default Map();

export const initialProjectDetailState = new ProjectDetailState();
