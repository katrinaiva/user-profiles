import { Injectable } from '@angular/core';
import { UserModel } from '../components/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: UserModel[] = [
    {
      id: 1,
      name: 'John Doe',

      age: 25,
      picture: 'https://picsum.photos/id/13/200/400',
    },
    {
      id: 2,
      name: 'Jane Smith',

      age: 30,
      picture: 'https://picsum.photos/id/12/400/200',
    },
    {
      id: 3,
      name: '1Jane 1Smith',

      age: 40,
      picture: 'https://picsum.photos/id/14/400/200',
    },
    {
      id: 4,
      name: '2Jane 2Smith',

      age: 50,
      picture: 'https://picsum.photos/id/15/400/200',
    },
  ];

  getUsers() {
    return this.users;
  }

  addUser(user: any) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }

  updateUser(user: any) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index > -1) this.users[index] = user;
  }

  deleteUser(userId: number) {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
