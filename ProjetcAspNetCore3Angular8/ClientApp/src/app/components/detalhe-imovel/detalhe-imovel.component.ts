import { TipoService } from 'src/app/services/tipo.service';
import { EnderecoService } from './../../services/endereco.service';
import { ImovelService } from '../../services/imovel.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbSlideEvent, NgbCarousel, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalhe-imovel',
  templateUrl: './detalhe-imovel.component.html'
})
export class DetalheImovelComponent implements OnInit {
  spinner = 'detalhe-imovel';
  vm = {
    id: 0,
    Imovel: null
  }
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  constructor(
    private _imovelService: ImovelService, private _endService: EnderecoService, private _tipoService: TipoService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.vm.id = Number(this.route.snapshot.paramMap.get('id'));
    this._imovelService.Get(this.vm.id, this.spinner).subscribe(
      async result => {
        const item = result;
        var dados = await this.pegarDados(item.idImovel, item.idEndereco, item.idTipo);
        item.imagens = dados['imagens'];
        item.Endereco = dados['Endereco'];
        item.Tipo = dados['Tipo'];
        this.vm.Imovel = item;
      }
    );
  }
  pegarDados(idImovel, idEndereco, idTipo) {
    return new Promise(
      resolve => {
        this._imovelService.getFiles(idImovel, this.spinner).subscribe(
          result2 => {
            const imagens = result2.length ? result2 : [];
            this._endService.Get(idEndereco, this.spinner).subscribe(
              result3 => {
                const end = result3;
                this._tipoService.Get(idTipo, this.spinner).subscribe(
                  result4 => {
                    resolve({
                      imagens: imagens, Endereco: end, Tipo: result4.filter(x => x.idTipo === idTipo)[0]
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  }
  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
}
