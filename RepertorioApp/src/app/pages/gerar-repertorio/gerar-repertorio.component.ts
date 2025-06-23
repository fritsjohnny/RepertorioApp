import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../shared/services/snackbar';
import { MarkdownModule } from 'ngx-markdown';

interface LouvorItem {
  pessoa: string;
  nome: string;
  cantor: string;
  tom?: string;
  tipo: 'CELEBRAÇÃO' | 'ADORAÇÃO';
}

@Component({
  selector: 'app-gerar-repertorio',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, MarkdownModule],
  templateUrl: './gerar-repertorio.component.html',
  styleUrls: ['./gerar-repertorio.component.scss'],
})
export class GerarRepertorioComponent {
  nomeCulto = '';
  tipoSelecionado: 'CELEBRAÇÃO' | 'ADORAÇÃO' = 'CELEBRAÇÃO';
  pessoa = '';
  cantor = '';
  nomeMusica = '';
  tom = '';
  repertorio: LouvorItem[] = [];
  mensagemPreview = '';

  constructor(private snackbar: SnackbarService) {
    this.nomeCulto = 'Culto de Celebração';

    this.repertorio = [
      {
        pessoa: 'Roney',
        nome: 'Reina o Senhor',
        cantor: 'Nívea Soares',
        tom: 'G',
        tipo: 'CELEBRAÇÃO',
      },
      {
        pessoa: 'Malafaia',
        nome: 'Tremenda Graça',
        cantor: 'Aline Barros',
        tom: 'A',
        tipo: 'CELEBRAÇÃO',
      },
      {
        pessoa: 'Santana',
        nome: 'É Ele',
        cantor: 'Drops',
        tom: 'D',
        tipo: 'ADORAÇÃO',
      },
      {
        pessoa: 'Daniel',
        nome: 'Santo Espírito',
        cantor: 'Laura Souguellis',
        tom: 'F',
        tipo: 'ADORAÇÃO',
      },
    ];

    this.mensagemPreview = this.gerarMensagemPreview();
  }

  adicionarLouvor() {
    if (!this.nomeCulto.trim()) {
      this.snackbar.show('Informe o nome do culto.');
      return;
    }

    if (!this.pessoa.trim()) {
      this.snackbar.show('Informe o nome do cantor(a).');
      return;
    }

    if (!this.nomeMusica.trim()) {
      this.snackbar.show('Informe o nome do louvor.');
      return;
    }

    this.repertorio.push({
      pessoa: this.pessoa.trim(),
      nome: this.nomeMusica.trim(),
      cantor: this.cantor.trim(),
      tom: this.tom.trim(),
      tipo: this.tipoSelecionado,
    });

    this.pessoa = '';
    this.nomeMusica = '';
    this.cantor = '';
    this.tom = '';

    this.mensagemPreview = this.gerarMensagemPreview();
  }

  get repertorioCelebracao(): LouvorItem[] {
    return this.repertorio.filter((r) => r.tipo === 'CELEBRAÇÃO');
  }

  get repertorioAdoracao(): LouvorItem[] {
    return this.repertorio.filter((r) => r.tipo === 'ADORAÇÃO');
  }

  removerItem(index: number) {
    const item = this.repertorio[index];
    const confirmado = confirm(
      `Tem certeza que deseja remover o louvor "${item.nome}" de ${item.tipo}?`
    );

    if (!confirmado) return;

    this.repertorio.splice(index, 1);
  }

  gerarMensagemWhatsApp(): string {
    const celebracao = this.repertorio.filter((r) => r.tipo === 'CELEBRAÇÃO');
    const adoracao = this.repertorio.filter((r) => r.tipo === 'ADORAÇÃO');

    const format = (lista: LouvorItem[]) =>
      lista
        .map((l) => {
          const base = `${l.pessoa} -> *${l.nome}*`;
          const cantor = l.cantor
            ? `_((${l.cantor}))_`.replace('(', '').replace(')', '')
            : '';
          const tom = l.tom ? `_*[Tom: ${l.tom}]*_` : '';
          const extra = [cantor, tom].filter((p) => p).join(' / ');
          return extra ? `${base} - ${extra}` : base;
        })
        .join('\n'); // separador entre louvores

    return `*${this.nomeCulto.toUpperCase()}*\n\n*CELEBRAÇÃO*\n${format(
      celebracao
    )}\n\n*ADORAÇÃO*\n${format(adoracao)}`;
  }

  gerarMensagemPreview(): string {
    const celebracao = this.repertorio.filter((r) => r.tipo === 'CELEBRAÇÃO');
    const adoracao = this.repertorio.filter((r) => r.tipo === 'ADORAÇÃO');

    const format = (lista: LouvorItem[]) =>
      lista
        .map((l) => {
          const base = `${l.pessoa} -> *${l.nome}*`;
          const cantor = l.cantor
            ? `_((${l.cantor}))_`.replace('(', '').replace(')', '')
            : '';
          const tom = l.tom ? `_*[Tom: ${l.tom}]*_` : '';
          const extra = [cantor, tom].filter((p) => p).join(' / ');
          return extra ? `${base} - ${extra}` : base;
        })
        .join('\n\n'); // quebra visual

    return `*${this.nomeCulto.toUpperCase()}*\n\n*CELEBRAÇÃO*\n\n${format(
      celebracao
    )}\n\n*ADORAÇÃO*\n\n${format(adoracao)}`;
  }

  compartilharWhatsApp() {
    const msg = encodeURIComponent(this.gerarMensagemWhatsApp());
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  }
}
