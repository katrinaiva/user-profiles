export interface UserModel {
  id: number | null;
  name: string;
  age: number;
  picture: string;
  editMode?: boolean;
}
