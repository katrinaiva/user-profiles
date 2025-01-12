import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserService } from '../../mock-data/user.service';
import { CommonModule } from '@angular/common';
import { UserModel } from '../user.model';
import { Modal } from 'bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-profiles',
  imports: [CommonModule, UserCardComponent, ConfirmModalComponent],
  templateUrl: './user-profiles.component.html',
  styleUrl: './user-profiles.component.scss',
  standalone: true,
})
export class UserProfilesComponent {
  users: UserModel[] = [];
  initialUsers: UserModel[] = [];
  userToRemove: UserModel | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  addNewUser(): void {
    this.users.push({
      id: null,
      picture: '',
      firstName: '',
      lastName: '',
      age: null!,
      editMode: true,
    });
  }

  saveUser(user: UserModel): void {
    if (user.id === null) {
      // Find the user in the array
      const index = this.users.findIndex((u) => u.id === null);

      if (index !== -1) {
        // Create a new object based on user and update this.users[index]
        const updatedUser = { ...user, id: this.users.length };
        this.users[index] = updatedUser;
      }
    } else {
      this.userService.updateUser(user);
    }
    user.editMode = false;
  }

  editUser(user: UserModel): void {
    user.editMode = true;
  }

  // modal remove user
  removeUser(user: UserModel): void {
    this.userToRemove = user;

    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  confirmRemoveUser(): void {
    if (this.userToRemove) {
      this.users = this.users.filter((u) => u.id !== this.userToRemove!.id);
      this.userToRemove = null;
    }
  }

  cancelRemoveUser(): void {
    this.userToRemove = null;
  }
  // modal remove user

  cancelEditMode(user: UserModel): void {
    if (user.id === null) {
      this.users = this.users.filter((u) => u !== user); // Удаляем карточку, если ID отсутствует (новый пользователь)
    } else {
      user.editMode = false; // Выключаем режим редактирования для существующего пользователя
    }
  }
}
