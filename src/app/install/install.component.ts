import { Component, HostListener } from '@angular/core';
import { BeforeInstallPromptEvent } from './install.types';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css'],
})
export class InstallComponent {
  deferredPrompt?: BeforeInstallPromptEvent;
  showInstallBanner = false;

  constructor() {}

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: BeforeInstallPromptEvent) {
    event.preventDefault();
    this.deferredPrompt = event;
    this.showInstallBanner = true;
  }

  async addToHomeScreen() {
    if (!this.deferredPrompt) {
      return;
    }

    this.showInstallBanner = false;
    await this.deferredPrompt.prompt();
    const choice = await this.deferredPrompt.userChoice;
    switch (choice.outcome) {
      case 'accepted':
        console.log('ACCEPTED!');
        break;
      case 'dismissed':
        console.log('DECLINED!');
        break;
    }
    this.deferredPrompt = undefined;
  }

  dismissInstall() {
    this.showInstallBanner = false;
  }
}
