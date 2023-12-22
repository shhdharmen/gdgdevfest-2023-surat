import { Component, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AddressFormComponent } from './forms/address-form/address-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AddressFormComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-mat-address';
  private document = inject(DOCUMENT);
  private isDark = false;
  readonly DARK_THEME = 'dark-theme.css';

  toggleTheme() {
    this.isDark = !this.isDark;
    this.document.documentElement.classList.toggle('dark-theme');
    if (this.isDark) {
      const href = 'dark-theme.css';
      this.getLinkElementForKey('dark-theme').setAttribute('href', href);
    } else {
      this.removeStyle('dark-theme');
    }
  }

  getLinkElementForKey(key: string) {
    return (
      this.getExistingLinkElementByKey(key) ||
      this.createLinkElementWithKey(key)
    );
  }

  getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(
      `link[rel="stylesheet"].${this.getClassNameForKey(key)}`
    );
  }

  createLinkElementWithKey(key: string) {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(linkEl);
    return linkEl;
  }

  getClassNameForKey(key: string) {
    return `style-manager-${key}`;
  }

  removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      this.document.head.removeChild(existingLinkElement);
    }
  }
}
