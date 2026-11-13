import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  menuOpen = false;
  formOpen = false;

  newNote = {
    title: '',
    content: '',
    color: '#35b4f5'
  };

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }

  openNoteForm() {
    this.closeMenu();
    this.formOpen = true;
  }

  closeNoteForm() {
    this.formOpen = false;

    this.newNote = {
      title: '',
      content: '',
      color: '#35b4f5'
    };
  }
  
}