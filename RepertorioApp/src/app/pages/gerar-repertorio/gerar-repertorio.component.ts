import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../shared/services/snackbar';
import { MarkdownModule } from 'ngx-markdown';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog.component';

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
  dev = true; // Para testes locais
  novoRepertorioDisponivel = false;

  constructor(private snackbar: SnackbarService, private dialog: MatDialog) {
    const salvo = localStorage.getItem('repertorio');

    if (salvo) {
      try {
        this.repertorio = JSON.parse(salvo);
      } catch {
        this.repertorio = [];
        localStorage.removeItem('repertorio');
      }
    } else if (this.dev) {
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
    }

    this.novoRepertorioDisponivel = this.repertorio.length > 0;

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

    this.salvarRepertorio();
  }

  get repertorioCelebracao(): LouvorItem[] {
    return this.repertorio.filter((r) => r.tipo === 'CELEBRAÇÃO');
  }

  get repertorioAdoracao(): LouvorItem[] {
    return this.repertorio.filter((r) => r.tipo === 'ADORAÇÃO');
  }

  removerItem(item: LouvorItem) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remover Louvor',
        message: `Tem certeza que deseja remover o louvor de ${item.tipo} "${item.nome}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.repertorio = this.repertorio.filter((r) => r !== item);

      this.salvarRepertorio();
      this.mensagemPreview = this.gerarMensagemPreview();
    });
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

  private salvarRepertorio(): void {
    localStorage.setItem('repertorio', JSON.stringify(this.repertorio));
  }

  adicionarDataCulto() {
    const diasSemana: { [key: string]: number } = {
      domingo: 0,
      segunda: 1,
      terca: 2,
      terça: 2,
      quarta: 3,
      quinta: 4,
      sexta: 5,
      sabado: 6,
      sábado: 6,
    };

    const texto = this.nomeCulto.toLowerCase();
    const hoje = new Date();
    let diaAlvo = -1;

    for (const chave in diasSemana) {
      if (texto.includes(chave)) {
        diaAlvo = diasSemana[chave];
        break;
      }
    }

    let data: Date;

    if (diaAlvo >= 0) {
      const hojeNum = hoje.getDay();
      const diff = (diaAlvo - hojeNum + 7) % 7;
      data = new Date(hoje);
      data.setDate(hoje.getDate() + diff);
    } else {
      data = hoje;
    }

    const dataFormatada = data.toLocaleDateString('pt-BR');
    if (!this.nomeCulto.includes(`(${dataFormatada})`)) {
      this.nomeCulto = `${this.nomeCulto.trim()} (${dataFormatada})`;
    }
  }

  iniciarNovoRepertorio() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Novo Repertório',
        message:
          'Tem certeza que deseja iniciar um novo repertório? Isso apagará o atual.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.repertorio = [];
      this.nomeCulto = '';
      this.pessoa = '';
      this.nomeMusica = '';
      this.cantor = '';
      this.tom = '';
      this.mensagemPreview = '';
      localStorage.removeItem('repertorio');
      this.novoRepertorioDisponivel = false;
    });
  }
}
