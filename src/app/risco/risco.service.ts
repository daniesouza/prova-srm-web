import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RiscoService {

  riscosUrl: string;

  constructor(private http: HttpClient) {
    this.riscosUrl = `${environment.apiUrl}/riscos`;

  }

  pesquisar(): Promise<any> {

    return this.http.get(`${this.riscosUrl}`)
      .toPromise();
  }
}
