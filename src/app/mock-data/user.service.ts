import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
      picture: 'https://picsum.photos/id/13/200/200',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      age: 30,
      picture: 'https://picsum.photos/id/12/200/200',
    },
    {
      id: 3,
      firstName: '1Jane',
      lastName: '1Smith',
      age: 40,
      picture: 'https://picsum.photos/id/14/200/200',
    },
    {
      id: 4,
      firstName: '2Jane',
      lastName: '2Smith',
      age: 50,
      picture: 'https://picsum.photos/id/15/200/200',
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
