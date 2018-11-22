import {Component, OnInit} from '@angular/core';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Lancamento} from '../../core/model';
import {FormControl} from '@angular/forms';
import {LancamentoService} from '../lancamento.service';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {RiscoService} from '../../risco/risco.service';

@Component({
  selector: 'app-lancamentos-novo',
  templateUrl: './lancamentos-novo.component.html',
  styleUrls: ['./lancamentos-novo.component.css']
})
export class LancamentosNovoComponent implements OnInit {

  constructor(private riscoService: RiscoService,
              private lancamentoService: LancamentoService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title
  ) {
  }

  riscos = [
  ];

  lancamento = new Lancamento();


  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];

    this.title.setTitle('Novo lançamento');

    if (id) {
      this.buscarLancamento(id);
    }

    this.pesquisarRiscos();
  }

  private buscarLancamento(codigo) {
    this.lancamentoService.buscaPorId(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  salvar(form: FormControl) {
    if (this.lancamento.id) {
      this.atualizarLancamento(form);
    } else {
      this.salvarLancamento(form);
    }
  }

  salvarLancamento(form: FormControl) {
    this.lancamentoService.salvarLancamento(this.lancamento)
      .then(lancamento => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento adicionado com sucesso.',
          detail: 'Id:' + lancamento.id
        });
        this.router.navigate(['/lancamentos/' + lancamento.id]);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizarLancamento(this.lancamento)
      .then(lancamento => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lançamento atualizado com sucesso.',
          detail: 'Id:' + lancamento.id
        });
        this.router.navigate(['/lancamentos/' + lancamento.id]);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  pesquisarRiscos() {
    this.riscoService.pesquisar()
      .then(riscos => {
        this.riscos = riscos.map(risco => {
          return {label: risco, value: risco};
        });
      })
      .catch(error => this.errorHandler.handle(error));
  }



  novo(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle('Editar lançamento ' + this.lancamento.nomeCliente);
  }

}
