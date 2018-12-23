import { Record, Map, List } from 'immutable';

export class TaskDataState extends Record({
  _id: '',
  name: '',
  position: '',
  projectId: '',
  listId: '',
  description: '',
  createdAt: '',
  members: List(),
  label: List(),
  userId: ''
}) {}

export class ListDataState extends Record({
  _id: '',
  name: '',
  backgroundUrl: '',
  createdAt: '',
  members: List(),
  userId: '',
  tasks: List(),
  position: ''
}) {}

export class ProjectInfoDataState extends Record({
  _id: '',
  name: '',
  backgroundUrl: '',
  createdAt: '',
  member: List(),
  userId: ''
}) {}

export class ListState extends Record({
  data: Map(),
  listIds: List()
}) {}

export class TaskState extends Record({
  data: Map(),
  tasksIds: List()
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
