import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-user-card',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
})
export class UserCardComponent {
  @Input() user!: UserModel | null;
  @Output() save = new EventEmitter<UserModel>();
  @Output() edit = new EventEmitter<UserModel>();
  @Output() remove = new EventEmitter<UserModel | null>();
  @Output() cancel = new EventEmitter<void>();

  userForm: FormGroup;
  editMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      picture: [''],
      firstName: [''],
      lastName: [''],
      age: [''],
    });
  }

  private initializeForm(): void {
    if (this.user) {
      this.userForm.patchValue({
        id: this.user.id || null,
        picture: this.user.picture || '',
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        age: this.user.age || null,
      });
    }
  }

  ngOnInit() {
    this.initializeForm();
  }

  enableEditMode() {
    this.editMode = true;
  }

  saveUser() {
    console.log('this.userForm.value', this.userForm.value);
    this.save.emit(this.userForm.value as UserModel);
    this.editMode = false;
  }

  removeUser() {
    this.remove.emit(this.user);
  }

  cancelEditMode() {
    this.initializeForm();
    this.editMode = false;
    this.cancel.emit();
  }
}
