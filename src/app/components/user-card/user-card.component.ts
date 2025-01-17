import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
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
  @Output() cancel = new EventEmitter<{
    user: UserModel | null;
    event: Event;
  }>();

  userForm: FormGroup;
  editMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      picture: [''],
      name: ['', [Validators.required]],
      age: [null, [Validators.required, Validators.min(1)]],
    });
  }

  private initializeForm(): void {
    if (this.user) {
      this.userForm.patchValue({
        id: this.user.id || null,
        picture: this.user.picture || '',
        name: this.user.name || '',

        age: this.user.age || null,
      });
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    this.editMode = this.user?.editMode || false;
  }

  enableEditMode(): void {
    this.editMode = true;
  }

  saveUser(): void {
    setTimeout(() => {
      if (this.userForm.valid) {
        this.save.emit(this.userForm.value as UserModel);
        this.editMode = false;
      }
    }, 500);
  }

  removeUser(): void {
    this.remove.emit(this.user);
  }

  cancelEditMode(event: Event): void {
    this.initializeForm();
    this.editMode = false;
    this.cancel.emit({ user: this.user, event });
  }

  uploadPicture(id: number): void {
    const idCard = String(id);
    const parentCard = document.getElementById(idCard);
    const fileInput = parentCard?.querySelector('#picture') as HTMLInputElement;

    if (fileInput) {
      fileInput.click();
    }
  }

  onPictureSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileData = reader.result as string;
        this.userForm.patchValue({ picture: fileData });
      };

      reader.readAsDataURL(file);
    }
  }
}
