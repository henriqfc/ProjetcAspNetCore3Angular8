import { EnderecoService } from './../services/endereco.service';
import { ImovelService } from './../services/imovel.service';
import { TipoService } from './../services/tipo.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  spinner = 'home';
  baseUrl;
  public vm = {
    TipoContrato: [
      {
        Value: 'A',
        Text: 'Aluguel'
      },
      {
        Value: 'C',
        Text: 'Compra'
      },
    ],
    TipoLista: [],
    NumQuartosLista: [
      {
        Value: '1', Text: '1'
      },
      {
        Value: '2', Text: '2'
      },
      {
        Value: '3', Text: '3'
      },
      {
        Value: '4', Text: '4'
      },
      {
        Value: '+', Text: '5 ou mais'
      },
    ],
    PrecosComprarLista: [
      {
        Value: '0-60', Text: 'Até 60 mil'
      },
      {
        Value: '60-100', Text: 'De 60 até 100 mil'
      },
      {
        Value: '100-150', Text: 'De 100 até 150 mil'
      },
      {
        Value: '150-inf', Text: 'Acima de 150 mil'
      },
    ],
    PrecosAlugarLista: [
      {
        Value: '0-2', Text: 'Até 2 mil'
      },
      {
        Value: '2-6', Text: 'De 2 até 6 mil'
      },
      {
        Value: '6-10', Text: 'De 6 até 10 mil'
      },
      {
        Value: '10-inf', Text: 'Acima de 10 mil'
      },
    ],
    Parametros: {},
    ImoveisEncontrados: []
  };

  constructor(private _serviceTipo: TipoService, private _serviceImovel: ImovelService, private _endService: EnderecoService,
    @Inject('BASE_URL') baseUrl) {
      this.baseUrl = baseUrl;
    _serviceTipo.GetAll(this.spinner).subscribe(
      result => {
        this.vm.TipoLista = result.map(item => {
          return { Value: item.idTipo, Text: item.nomeTipo };
        });
      }
    );
  }

  ngOnInit() {
    this.Buscar();
  }
  public Buscar() {
    const filtro = {};
    // fazer busca de imoveis de acordo com o filtro
    filtro['idTipo'] = this.vm.Parametros['Tipo'] ? this.vm.Parametros['Tipo'] : null;
    filtro['Endereco'] = this.vm.Parametros['Endereco'] ? this.vm.Parametros['Endereco'] : '';
    const precosComprar = this.vm.Parametros['PrecoComprar'] ? this.vm.Parametros['PrecoComprar'].split('-') : [];
    const precosAlugar = this.vm.Parametros['PrecoAlugar'] ? this.vm.Parametros['PrecoAlugar'].split('-') : [];
    filtro['PrecoInicialComprar'] = precosComprar[0] ? Number(precosComprar[0]) : null;
    filtro['PrecoFinalComprar'] = precosComprar[1] ? (precosComprar[1] !== 'inf' ? Number(precosComprar[1]) : null) : null;
    filtro['PrecoInicialAlugar'] = precosAlugar[0] ? Number(precosAlugar[0]) : null;
    filtro['PrecoFinalAlugar'] = precosAlugar[1] ? (precosAlugar[1] !== 'inf' ? Number(precosAlugar[1]) : null) : null;
    filtro['numQuartos'] = this.vm.Parametros['NumQuartos'] ? Number(this.vm.Parametros['NumQuartos']) : null;
    filtro['tipoValor'] = this.vm.Parametros['TipoContrato'] ? this.vm.Parametros['TipoContrato'] : '';
    // chamar service de imoveis e passar filtro
    this._serviceImovel.GetAll(filtro, this.spinner).subscribe(
      result => {
        this.vm.ImoveisEncontrados = [];
        var imoveis = result.length > 0 ? result : [];
        imoveis.forEach(async item => {
          var dados = await this.pegarDados(item.idImovel, item.idEndereco);
          item.imagens = dados['imagens'];
          item.Endereco = dados['Endereco'];
          item.Tipo = this.vm.TipoLista.filter(t => t.Value === item.idTipo)[0];
          item.Tipo = {
            idTipo: item.Tipo.Value, nomeTipo: item.Tipo.Text
          };
          this.vm.ImoveisEncontrados.push(item);
        });
      }
    );
    // criar viewModel para fazer filtro no back-end

  }

  pegarDados(idImovel, idEndereco) {
    return new Promise(
      resolve => {
        this._serviceImovel.getFiles(idImovel, this.spinner).subscribe(
          result2 => {
            const imagens = result2.length ? result2 : [];
            this._endService.Get(idEndereco, this.spinner).subscribe(
              result3 => {
                resolve({
                  imagens: imagens, Endereco: result3
                });
              }
            );
          }
        );
      }
    );
  }
}
