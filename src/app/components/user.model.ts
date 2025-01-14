export interface UserModel {
  id: number | null;
  name: string;
  age: number | null;
  picture: string;
  editMode?: boolean;
}
