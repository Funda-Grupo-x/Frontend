<<<<<<< HEAD
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from "@angular/forms";
import { NgClass, NgFor } from "@angular/common";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserStoriesService } from "../../services/user-stories.service";
import { UserStory } from "../../model/user-story.entity";
=======
import { Component,Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, NgForm } from "@angular/forms";
import { NgClass, NgFor } from "@angular/common";
import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {UserStoriesService} from "../../services/user-stories.service";
import {UserStory} from "../../model/user-story.entity";

>>>>>>> origin/main
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-story-create-and-edit',
  standalone: true,
<<<<<<< HEAD
  imports: [MatCardModule, FormsModule, NgFor, MatFormFieldModule, MatInputModule, MatSelectModule, TranslateModule],
  templateUrl: './user-story-create-and-edit.component.html',
  styleUrls: ['./user-story-create-and-edit.component.css']
})
export class UserStoryCreateAndEditComponent {
  newUserStory: UserStory;
  statusOptions = ['TO_DO', 'DONE']; // Opciones de estado

  constructor(
    private userStoriesService: UserStoriesService,
    private dialog: MatDialog,
=======
  imports: [MatCardModule, FormsModule, NgFor,MatFormFieldModule, MatInputModule, MatSelectModule, TranslateModule],
  templateUrl: './user-story-create-and-edit.component.html',
  styleUrl: './user-story-create-and-edit.component.css'
})
export class UserStoryCreateAndEditComponent {
  newUserStory: UserStory;


  constructor(
    private userStoriesService: UserStoriesService,
    private dialog: MatDialog,  // Para abrir el diálogo de añadir evento
>>>>>>> origin/main
    private dialogRef: MatDialogRef<UserStoryCreateAndEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserStory
  ) {
    this.newUserStory = data ? { ...data } : new UserStory();
<<<<<<< HEAD
    // Si es nueva historia, establecer estado por defecto
    if (!this.newUserStory.id) {
      this.newUserStory.status = 'TO_DO';
    }
=======
>>>>>>> origin/main
  }

  onSubmit(): void {
    if (!this.newUserStory.id) {
<<<<<<< HEAD
      const currentDateTime = new Date().toISOString();
=======
      const currentDateTime = new Date().toISOString(); // Obtener fecha y hora actuales
>>>>>>> origin/main
    }
    if (this.newUserStory.id) {
      this.userStoriesService.update(this.newUserStory.id, this.newUserStory).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.userStoriesService.create(this.newUserStory).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
<<<<<<< HEAD

  onCancel(): void {
    this.dialogRef.close(false);
  }
=======
  onCancel(): void {
    this.dialogRef.close(false);
  }

>>>>>>> origin/main
}
