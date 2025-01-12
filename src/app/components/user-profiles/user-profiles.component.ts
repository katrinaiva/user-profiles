import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserService } from '../../mock-data/user.service';
import { CommonModule } from '@angular/common';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-user-profiles',
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-profiles.component.html',
  styleUrl: './user-profiles.component.scss',
  standalone: true,
})
export class UserProfilesComponent {
  users: UserModel[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  addNewUser() {
    this.users.push({
      id: null,
      firstName: '',
      lastName: '',
      age: null,
      picture: '',
      editMode: true,
    });
  }

  saveUser(user: UserModel): void {
    if (user.id) {
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }
    user.editMode = false;
  }

  editUser(user: UserModel): void {
    user.editMode = true;
  }

  removeUser(user: UserModel): void {
    if (confirm('Are you sure you want to remove this user?')) {
      this.userService.deleteUser(user.id as number);
      this.users = this.users.filter((u) => u.id !== user.id);
    }
  }

  cancelEditMode(user: UserModel): void {
    if (!user.id) {
      this.removeUser(user);
    } else {
      user.editMode = false;
    }
  }
}
