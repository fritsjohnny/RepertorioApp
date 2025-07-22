import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-louvor-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './louvor-form.component.html',
  styleUrls: ['./louvor-form.component.scss']
})
export class LouvorFormComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  title: string = '';
  artist: string = '';
  key: string = '';
  tempo: string = '';
  theme: string = '';
  lyrics: string = '';
  tags: string = '';
  externaLink = '';
  bibleReferences: string = '';
  worshipType: string = '';

  louvorId: string | null = null;
  isEditMode = false;

  ngOnInit(): void {
    this.louvorId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.louvorId;

    if (this.isEditMode) {

    }
  }

  salvar() {
    const novoLouvor = {
      titulo: this.title,
      artista: this.artist,
      bpm: this.tempo,
      tom: this.key,
      tema: this.theme,
      subtemas: this.tags,
      letra: this.lyrics,
      link: this.externaLink,
      referenciasBiblicas: this.bibleReferences
    };

    if (this.isEditMode) {
      console.log('Atualizando:', this.louvorId, novoLouvor);
      // this.louvorService.update(this.louvorId, novoLouvor).subscribe(...)
    } else {
      console.log('Criando novo louvor:', novoLouvor);
      // this.louvorService.create(novoLouvor).subscribe(...)
    }

    this.router.navigate(['/buscar']);
  }

  excluir() {
    if (!this.isEditMode) return;

    const confirmar = confirm('Deseja realmente excluir este louvor?');
    if (confirmar) {
      console.log('Louvor excluído:', this.louvorId);
      this.router.navigate(['/buscar']);
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir Louvor',
        message: `Deseja realmente excluir este louvor?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

    });
  }

  cancelar() {
    this.router.navigate(['/buscar']);
  }
}
