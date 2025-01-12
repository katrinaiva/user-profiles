export interface UserModel {
  id: number | null;
  firstName: string;
  lastName: string;
  age: number | null;
  picture: string;
  editMode?: boolean;
}
