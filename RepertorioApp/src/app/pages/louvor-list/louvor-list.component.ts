import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-louvor-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './louvor-list.component.html',
  styleUrls: ['./louvor-list.component.scss'],
})
export class LouvorListComponent {
  titulo: string = '';
  tema: string = '';
  subtema: string = '';
  louvoresFiltrados: any[] = [];
  louvorSelecionado: any = null;
  repertorioGerado: string = '';

  constructor(private openaiService: OpenAIService) {}

  filtrar() {
    const termoTitulo = this.titulo?.toLowerCase() || '';
    const termoTema = this.tema?.toLowerCase() || '';
    const termoSubtema = this.subtema?.toLowerCase() || '';

    this.louvoresFiltrados = this.louvores.filter((l) => {
      const tituloOk = l.titulo.toLowerCase().includes(termoTitulo);
      const temaOk = l.tema.toLowerCase().includes(termoTema);
      const subtemaOk = l.subtemas.toLowerCase().includes(termoSubtema);
      return tituloOk && temaOk && subtemaOk;
    });
  }

  limpar(): void {
    this.titulo = '';
    this.tema = '';
    this.subtema = '';
    this.louvoresFiltrados = [];
  }

  gerarRepertorio() {
    this.openaiService
      .generateRepertorioFake(this.tema, this.subtema)
      .subscribe((resposta) => {
        this.repertorioGerado = resposta;
      });

    // const partes: string[] = [];

    // if (this.tema) {
    //   partes.push(`Tema: ${this.tema}`);
    // }
    // if (this.subtema) {
    //   partes.push(`Subtema: ${this.subtema}`);
    // }

    // const promptBase =
    //   'Monte um repertório de louvores cristãos baseado nos seguintes critérios:';
    // const prompt = partes.length
    //   ? `${promptBase}\n${partes.join('\n')}`
    //   : 'Monte um repertório cristão variado com foco em louvores contemporâneos.';

    // this.openaiService.gerarRepertorio(prompt).subscribe((res: any) => {
    //   const resposta = res.choices?.[0]?.message?.content || 'Nada retornado.';
    //   this.repertorioGerado = resposta;
    // });
  }

  limparSugestao() {
    this.repertorioGerado = '';
  }

  abrirModalPorTitulo(titulo: string) {
    const louvorCompleto = this.louvores.find((l) => l.titulo === titulo);
    if (louvorCompleto) {
      this.louvorSelecionado = louvorCompleto;
    }
  }

  fecharModal(event: Event) {
    event.stopPropagation();
    this.louvorSelecionado = null;
  }

  compartilharWhatsApp(louvor: any) {
    const texto = `🎵 ${louvor.titulo}\nTom: ${louvor.tom}\nBPM: ${louvor.bpm}\nTema: ${louvor.tema}\nSubtemas: ${louvor.subtemas}`;
    const link = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');
  }

  compartilharTodos() {
    const texto = this.louvoresFiltrados
      .map(
        (l) =>
          `🎵 ${l.titulo} - Tom: ${l.tom}, BPM: ${l.bpm}, Tema: ${l.tema}, Subtemas: ${l.subtemas}`
      )
      .join('\n');
    const link = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(link, '_blank');
  }

  louvores: any[] = [
    {
      titulo: 'A Boa Parte',
      tom: '-',
      bpm: '-',
      tema: 'Devoção / Adoração',
      subtemas: '-',
    },
    {
      titulo: 'A Vitória da Cruz',
      tom: 'F',
      bpm: '-',
      tema: 'Vitória / Redenção',
      subtemas: '-',
    },
    {
      titulo:
        'Ao único + Espírito, enche a minha vida + Consagração - Brasa Church',
      tom: 'C / D',
      bpm: '-',
      tema: 'Adoração / Consagração',
      subtemas:
        'Reconhecimento da soberania de Cristo, convite ao Espírito Santo',
    },
    {
      titulo: 'Aviva-Nos',
      tom: '-',
      bpm: '-',
      tema: 'Avivamento / Espírito',
      subtemas: '-',
    },
    {
      titulo: 'Aviva-nos + A Terra Clama + Fogo e Glória',
      tom: 'F',
      bpm: '126',
      tema: 'Avivamento / Profético',
      subtemas: '-',
    },
    {
      titulo: 'Batendo à Porta',
      tom: 'C#',
      bpm: '135',
      tema: 'Convite',
      subtemas: '-',
    },
    {
      titulo: 'Canção Ao Cordeiro',
      tom: 'E',
      bpm: '134',
      tema: 'Adoração / Jesus',
      subtemas: '-',
    },
    {
      titulo: 'Celebrai',
      tom: 'B',
      bpm: '140',
      tema: 'Celebração / Alegria',
      subtemas: '-',
    },
    {
      titulo: 'Correndo Pros Teus Braços',
      tom: 'E',
      bpm: '109',
      tema: 'Entrega / Amor',
      subtemas: '-',
    },
    {
      titulo: 'Diante de Ti',
      tom: 'E',
      bpm: '144',
      tema: 'Adoração / Rendição',
      subtemas: '-',
    },
    {
      titulo: 'Digno de Tudo',
      tom: 'D',
      bpm: '134',
      tema: 'Adoração / Soberania',
      subtemas: '-',
    },
    {
      titulo: 'É Ele',
      tom: 'Bb',
      bpm: '140',
      tema: 'Jesus / Reconhecimento',
      subtemas: '-',
    },
    {
      titulo: 'É Tudo sobre Você',
      tom: '-',
      bpm: '-',
      tema: 'Cristocêntrico / Adoração',
      subtemas: '-',
    },
    {
      titulo: 'Eis Que Estou à Porta',
      tom: 'Gm',
      bpm: '142',
      tema: 'Convite / Entrega',
      subtemas: '-',
    },
    {
      titulo: 'Emaús',
      tom: 'B',
      bpm: '140',
      tema: 'Presença / Esperança',
      subtemas: '-',
    },
    {
      titulo: 'Enquanto Eu Viver',
      tom: 'B',
      bpm: '135',
      tema: 'Compromisso / Amor',
      subtemas: '-',
    },
    {
      titulo: 'Estamos de Pé',
      tom: 'Eb',
      bpm: '107',
      tema: 'Fé / Permanência',
      subtemas: '-',
    },
    {
      titulo: 'Exaltamos Yahweh',
      tom: 'E',
      bpm: '112',
      tema: 'Adoração / Exaltação',
      subtemas: '-',
    },
    {
      titulo: 'Fogo em Teus Olhos',
      tom: 'G',
      bpm: '134',
      tema: 'Intimidade / Paixão',
      subtemas: '-',
    },
    {
      titulo: 'Graça',
      tom: '-',
      bpm: '-',
      tema: 'Graça / Misericórdia',
      subtemas: '-',
    },
    {
      titulo: 'Hosana',
      tom: 'A',
      bpm: '108',
      tema: 'Adoração / Clamor',
      subtemas: '-',
    },
    {
      titulo: 'Jesus, Meu Primeiro Amor',
      tom: 'G',
      bpm: '138',
      tema: 'Primeiro Amor / Intimidade',
      subtemas: '-',
    },
    {
      titulo: 'Luz do Mundo',
      tom: '-',
      bpm: '-',
      tema: 'Jesus / Luz',
      subtemas: '-',
    },
    {
      titulo: 'Medley Leão de Judá',
      tom: 'F#',
      bpm: '150',
      tema: 'Autoridade / Batalha',
      subtemas: '-',
    },
    {
      titulo: 'No Meio Dos Louvores',
      tom: 'G',
      bpm: '130',
      tema: 'Presença / Adoração',
      subtemas: '-',
    },
    {
      titulo: 'O Grito',
      tom: '-',
      bpm: '-',
      tema: 'Clamor / Vitória',
      subtemas: '-',
    },
    {
      titulo: 'O Nosso General É Cristo',
      tom: '-',
      bpm: '-',
      tema: 'Batalha / Vitória',
      subtemas: '-',
    },
    {
      titulo: 'Óleo de Alegria',
      tom: 'E',
      bpm: '135',
      tema: 'Renovo / Alegria',
      subtemas: '-',
    },
    {
      titulo: 'Praise',
      tom: '-',
      bpm: '-',
      tema: 'Adoração / Internacional',
      subtemas: '-',
    },
    {
      titulo: 'Quem é esse',
      tom: 'Gb',
      bpm: '124',
      tema: 'Revelação / Jesus',
      subtemas: '-',
    },
    {
      titulo: 'Quero Conhecer Jesus',
      tom: 'A',
      bpm: '132',
      tema: 'Intimidade / Busca',
      subtemas: '-',
    },
    {
      titulo: 'Quero Subir',
      tom: '-',
      bpm: '-',
      tema: 'Adoração / Entrega',
      subtemas: '-',
    },
    {
      titulo: 'Reina o Senhor',
      tom: 'D',
      bpm: '134',
      tema: 'Reinado / Autoridade',
      subtemas: '-',
    },
    {
      titulo: 'Ruja o Leão + Que Se Abram Os Céus',
      tom: 'C#',
      bpm: '138',
      tema: 'Profético / Avivamento',
      subtemas: '-',
    },
    {
      titulo: 'Salmo 126',
      tom: 'Ab',
      bpm: '148',
      tema: 'Celebração / Esperança',
      subtemas: '-',
    },
    {
      titulo: 'Santo Pra Sempre',
      tom: 'Db',
      bpm: '144',
      tema: 'Santo / Eternidade',
      subtemas: '-',
    },
    {
      titulo: 'Se Eu Me Humilhar',
      tom: 'E',
      bpm: '170',
      tema: 'Humildade / Restauração',
      subtemas: '-',
    },
    {
      titulo: 'Senhor te Quero + Ele Vem + Tudo é Diferente',
      tom: 'G',
      bpm: '132',
      tema: 'Busca / Retorno',
      subtemas: '-',
    },
    {
      titulo: 'Senhor, Te Quero',
      tom: '-',
      bpm: '-',
      tema: 'Desejo / Intimidade',
      subtemas: '-',
    },
    {
      titulo: 'Take It All',
      tom: '-',
      bpm: '-',
      tema: 'Entrega / Internacional',
      subtemas: '-',
    },
    {
      titulo: 'Teu Reino',
      tom: 'Gb',
      bpm: '140',
      tema: 'Reino / Autoridade',
      subtemas: '-',
    },
    {
      titulo: 'Tremenda Graça',
      tom: 'B',
      bpm: '98',
      tema: 'Graça / Salvação',
      subtemas: '-',
    },
    {
      titulo: 'Tu és + Águas Purificadoras',
      tom: '-',
      bpm: '-',
      tema: 'Adoração / Limpeza',
      subtemas: '-',
    },
    {
      titulo: 'Tua Igreja Canta',
      tom: 'C',
      bpm: '111',
      tema: 'Unidade / Adoração',
      subtemas: '-',
    },
    {
      titulo: 'Vitorioso És (Gabriel Guedes)',
      tom: 'F',
      bpm: '140',
      tema: 'Vitória / Ressurreição',
      subtemas: '-',
    },
    {
      titulo: 'Your Love Never Fails',
      tom: 'A#',
      bpm: '115',
      tema: 'Amor / Internacional',
      subtemas: '-',
    },
  ];
}
