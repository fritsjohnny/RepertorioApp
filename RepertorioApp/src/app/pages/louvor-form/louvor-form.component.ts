import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';
import { Messenger } from '../../common/messenger';

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
  private songService = inject(SongService);
  private messenger = inject(Messenger);

  louvorId?: string | null;
  title: string = '';
  artist?: string;
  key?: string;
  tempo?: string;
  theme?: string;
  lyrics?: string;
  tags?: string;
  externalLink?: string;
  bibleReferences?: string;
  worshipType?: string;

  isEditMode = false;

  ngOnInit(): void {
    this.louvorId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.louvorId;

    if (this.isEditMode) {
      this.songService.getById(+this.louvorId!).subscribe({
        next: (louvor) => {
          this.title = louvor.title;
          this.artist = louvor.artist;
          this.key = louvor.key;
          this.tempo = louvor.tempo;
          this.theme = louvor.theme;
          this.lyrics = louvor.lyrics;
          this.tags = louvor.tags;
          this.externalLink = louvor.externalLink;
          this.bibleReferences = louvor.bibleReferences;
          this.worshipType = louvor.worshipType;
        },
        error: (err) => {
          console.error('Erro ao carregar louvor para edição:', err);
          this.messenger.errorHandler('Erro ao carregar louvor para edição.' + err);
          this.router.navigate(['/buscar']);
        }
      });
    }
  }

  salvar() {
    const song: Song = {
      id: this.louvorId ? +this.louvorId : 0,
      title: this.title,
      artist: this.artist,
      key: this.key,
      tempo: this.tempo,
      theme: this.theme,
      lyrics: this.lyrics,
      tags: this.tags,
      externalLink: this.externalLink,
      bibleReferences: this.bibleReferences,
      worshipType: this.worshipType
    };

    if (this.isEditMode) {
      this.songService.update(+this.louvorId!, song).subscribe({
        next: (song) => {
          this.messenger.message('Louvor atualizado com sucesso!');
          this.router.navigate(['/buscar'], { queryParams: { updated: 'true', songId: this.louvorId } });
        },
        error: (err) => {
          console.error('Erro ao atualizar louvor:', err);
          this.messenger.errorHandler('Erro ao atualizar louvor.\n' + this.messenger.extractMessage(err));
        }
      });
    } else {
      this.songService.create(song).subscribe({
        next: () => {
          this.messenger.message('Louvor criado com sucesso!');
          this.router.navigate(['/buscar'])
        },
        error: (err) => {
          console.error('Erro ao criar louvor:', err);
          this.messenger.errorHandler('Erro ao criar louvor.\n' + this.messenger.extractMessage(err));
        }
      });
    }
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
