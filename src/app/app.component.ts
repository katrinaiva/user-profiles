import { Component } from '@angular/core';
import { UserProfilesComponent } from './components/user-profiles/user-profiles.component';

@Component({
  selector: 'app-root',
  imports: [UserProfilesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'user-profiles-app';
}
