import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Lancamento} from '../core/model';
import {environment} from '../../environments/environment';


export class LancamentoFiltro {
  nomeCliente: string;
  page = 0;
  size = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;

  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const httpOptions = {
      params: new HttpParams().set('page', String(filtro.page))
        .set('size', String(filtro.size))
    };

    if (filtro.nomeCliente) {
      httpOptions.params = httpOptions.params.set('nomeCliente', filtro.nomeCliente);
    }


    return this.http.get(`${this.lancamentosUrl}`, httpOptions)
      .toPromise()
      .then(response => {

        const result = {
          // @ts-ignore
          lancamentos: response.content,
          // @ts-ignore
          totalRecords: response.totalElements
        };

        return result;
      });
  }

  buscaPorId(id: number): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/${id}`)
      .toPromise();
  }

  salvarLancamento(lancamento: Lancamento): Promise<any> {

    return this.http.post(`${this.lancamentosUrl}`, lancamento)
      .toPromise();
  }

  atualizarLancamento(lancamento: Lancamento): Promise<any> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.id}`, lancamento)
      .toPromise();
  }

  excluir(id: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }
}
