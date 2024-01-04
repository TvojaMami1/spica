import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  styleUrl: './absences.component.css',
  template: `
  `
})
export class AbsencesComponent {
  title = 'Absences';
}