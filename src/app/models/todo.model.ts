export interface Todo {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
  editMode?: boolean;
}
