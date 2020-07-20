import { EnderecoService } from './../../services/endereco.service';
import { ImagensImovel } from './../../models/ImagensImovel';
import { Endereco } from './../../models/Endereco';
import { Imovel } from './../../models/Imovel';
import { ImovelService } from '../../services/imovel.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ValorImovelService } from 'src/app/services/valor-imovel.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { TipoService } from 'src/app/services/tipo.service';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-gerenciar-imovel',
  templateUrl: './gerenciar-imovel.component.html'
})
export class GerenciarImovelComponent implements OnInit {
  paineisAtivos = [];
  operacao = 'Pesquisar';
  vm: any;
  rowData = [];
  columnDefs = [];
  gridColumnApi: any;
  gridApi: any;
  objetoSelecionado: any;
  public gridOptions: GridOptions;

  spinner = 'gerenciar';
  //upload 
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  // fileInfos: Observable<any>;

  constructor(private _serviceTipo: TipoService,
    private _imovelService: ImovelService,
    private _enderecoService: EnderecoService,
    private toastr: ToastrService,
  ) {
    this.objetoSelecionado = [];
    this.IniciarVM();
    this._serviceTipo.GetAll(this.spinner).subscribe(
      result => {
        this.vm.TipoLista = result.map(item => {
          return { Value: item.idTipo, Text: item.nomeTipo };
        });
      }
    );
    this.paineisAtivos = ['panelDadosGrid'];
    this.gridOptions = <GridOptions>{
      enableFilter: true,
      floatingFilter: true,
      enableSorting: true,
      enableColResize: true,
      rowHeight: 22,
      rowSelection: 'single'
    };
    this.columnDefs = [
      {
        headerName: 'Código',
        field: 'idImovel',
      },
      {
        headerName: 'Tipo',
        field: 'idTipo',
      },
      {
        headerName: 'Endereço',
        field: 'idEndereco',
      },
      {
        headerName: 'Número',
        field: 'numero',
      },
      {
        headerName: 'Nº Cômodos',
        field: 'numComodos',
      },
      {
        headerName: 'Nº Quartos',
        field: 'numQuartos',

      },
      {
        headerName: 'Nº Banheiro',
        field: 'numBanheiros',

      },
      {
        headerName: 'Valor Venda',
        field: 'valorVenda',

      },
      {
        headerName: 'Valor Aluguel',
        field: 'valorAluguel',

      },
      {
        headerName: 'Descrição',
        field: 'descricao',

      },
    ];
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  onSelectionChanged() {
    this.objetoSelecionado = this.gridApi.getSelectedRows();
  }
  Adicionar() {
    this.vm.Imovel = new Imovel();
    this.operacao = 'Adicionar';
    this.paineisAtivos = ['panelCadastro'];
  }
  async Editar() {
    if (this.operacao === 'Pesquisar' && this.objetoSelecionado && this.objetoSelecionado[0]) {
      const item = this.objetoSelecionado[0];
      const dados = await this.pegarDados(item.idImovel, item.idEndereco);
      item.imagens = dados['imagens'];
      item.Endereco = dados['Endereco'];
      this.vm.Imovel = item;
      this.operacao = 'Editar';
      this.paineisAtivos = ['panelCadastro'];
      // this.fileInfos = this._imovelService.getFiles(this.vm.Imovel.idImovel);
    }
  }
  pegarDados(idImovel, idEndereco) {
    return new Promise(
      resolve => {
        this._imovelService.getFiles(idImovel, this.spinner).subscribe(
          result2 => {
            const imagens = result2.length ? result2 : [];
            this._enderecoService.Get(idEndereco, this.spinner).subscribe(
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
  Excluir() {
    if (this.operacao === 'Pesquisar' && this.objetoSelecionado && this.objetoSelecionado[0]) {
      if (confirm(`Tem certeza que deseja excluir o imóvel ${this.objetoSelecionado[0]['idImovel']}?`)) {
        this._imovelService.Excluir(this.objetoSelecionado[0]['idImovel'], this.spinner).subscribe(
          result => {
            if (result) {
              this.toastr.success('Imóvel Excluído com Sucesso!');
              this.Buscar();
            } else {
              this.toastr.error("Erro ao Excluir Imóvel!");
            }
          }
        );
      }
    }
  }
  Salvar() {
    if (!this.vm.Imovel['idTipo']) {
      this.toastr.warning('Favor selecionar um tipo de imóvel!');
      return;
    }
    if (!this.vm.Imovel['Endereco']['uf']) {
      this.toastr.warning('Favor escolher um Estado!');
      return;
    }
    if (!this.vm.Imovel['valorVenda'] && !this.vm.Imovel['valorAluguel']) {
      this.toastr.warning('Favor adicionar pelo menos um valor de venda ou de aluguel!');
      return;
    }
    if (this.operacao === 'Adicionar') {
      if (!this.selectedFiles || this.selectedFiles.length === 0) {
        this.toastr.warning('Favor adicionar pelo menos uma imagem!');
        return;
      }
    }
    if (this.operacao === 'Editar') {
      if ((!this.vm.Imovel.imagens || this.vm.Imovel.imagens.length === 0) && (!this.selectedFiles || this.selectedFiles.length === 0)) {
        this.toastr.warning('Favor adicionar pelo menos uma imagem!');
        return;
      }
    }
    this._imovelService.Salvar(this.PrepararModel(), this.spinner).subscribe(
      async result => {
        if (result > 0) {
          if (this.operacao == 'Adicionar')
            this.vm.Imovel.idImovel = result;
          if (this.selectedFiles && this.selectedFiles.length > 0) {
            var a = await this.uploadFiles();
          }
          this.selectedFiles = null;
          this.Buscar();
        }
      }
    );
  }
  IniciarVM() {
    this.vm = {
      Imovel: new Imovel(),
      ArrayPathImagens: [],
    };
  }
  PrepararModel() {
    let imovel = new Imovel();
    if (this.operacao === 'Editar') {
      imovel = this.vm.Imovel;
    }
    imovel.idImovel = this.vm.Imovel['idImovel'];
    imovel.numero = this.vm.Imovel['numero'];
    imovel.complemento = this.vm.Imovel['complemento'];
    imovel.numComodos = this.vm.Imovel['numComodos'];
    imovel.numQuartos = this.vm.Imovel['numQuartos'];
    imovel.numBanheiros = this.vm.Imovel['numBanheiros'];
    imovel.descricao = this.vm.Imovel['descricao'];
    imovel.idTipo = this.vm.Imovel['idTipo'];
    imovel.idEndereco = this.vm.Imovel.Endereco['idEndereco'] ? this.vm.Imovel.Endereco['idEndereco'] : 0;
    imovel.valorAluguel = this.vm.Imovel['valorAluguel'];
    imovel.valorVenda = this.vm.Imovel['valorVenda'];
    // imovel.imagens = this.vm.Imovel['imagens'];

    imovel.Endereco.idEndereco = this.vm.Imovel.Endereco['idEndereco'] ? this.vm.Imovel.Endereco['idEndereco'] : 0;
    imovel.Endereco.cep = this.vm.Imovel.Endereco['cep'];
    imovel.Endereco.rua = this.vm.Imovel.Endereco['rua'];
    imovel.Endereco.bairro = this.vm.Imovel.Endereco['bairro'];
    imovel.Endereco.cidade = this.vm.Imovel.Endereco['cidade'];
    imovel.Endereco.uf = this.vm.Imovel.Endereco['uf'];

    return imovel;
  }
  BuscarCEP() {
    this._enderecoService.BuscarCEP(this.vm.Imovel.Endereco.cep, this.spinner).subscribe(
      result => {
        if (result != null) {
          // completar endereço se vier cep
          this.vm.Imovel.Endereco = result;
        } else {
          this.toastr.warning('CEP não encontrado. Conferir se estar certo.');
        }
      }
    );
  }

  ngOnInit() {
    this.Buscar();
  }
  Cancelar() {
    if (confirm('Certeza que deseja cancelar a operação?')) {
      this.Buscar();
    }
  }
  Buscar() {
    this._imovelService.GetAll({}, this.spinner).subscribe(
      result => {
        this.rowData = result;
        this.paineisAtivos = ['panelDadosGrid'];
        this.operacao = 'Pesquisar';
        this.objetoSelecionado = [];
      }
    );
  }


  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles() {
    this.message = '';
    return new Promise(
      async resolve => {
        if (this.selectedFiles && this.selectedFiles.length > 0) {
          for (let i = 0; i < this.selectedFiles.length; i++) {
            var r = await this.upload(i, this.selectedFiles[i]);
          }
        }
        resolve();
      }
    );
  }
  upload(idx, file) {
    return new Promise(
      resolve => {
        this.progressInfos[idx] = { value: 0, fileName: file.name };
        if (this.vm.Imovel.imagens.length > 0 && this.vm.Imovel.imagens.filter(item => item.name === file.name) > 0) {
          if (!confirm('Já existe uma imagem pra essa casa com o nome \"' + file.name + '\". Deseja substituí-la?')) {
            return;
          }
        }
        this._imovelService.upload(file, this.vm.Imovel.idImovel, this.spinner).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              // this.fileInfos = this._imovelService.getFiles(this.vm.Imovel.idImovel);
              resolve();
            }
          },
          err => {
            resolve();
            this.progressInfos[idx].value = 0;
            this.message = 'Erro ao inserir imagem: ' + file.name;
            this.toastr.error(this.message);
          });
      }
    );
  }
  DeleteFile(file) {
    this._imovelService.delete(file, this.spinner).subscribe(
      result => {
        this._imovelService.getFiles(this.vm.Imovel.idImovel, this.spinner).subscribe(
          result2 => {
            this.vm.Imovel.imagens = result2;
          }
        );
      }
    );
  }

}
