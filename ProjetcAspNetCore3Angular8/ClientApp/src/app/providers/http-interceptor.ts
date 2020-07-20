import { HttpClient, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { tap } from 'rxjs/Operators';
import { Injectable } from '@angular/core';
import { CustomSpinnerService } from '../services/custom-spinner.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor  {

  constructor(private spinnerService: CustomSpinnerService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      let directRequest: HttpRequest<any> = null;
      let exibeOverlay: string;

      if (req.headers.has('exibe-overlay')) {
        exibeOverlay = req.headers.get('exibe-overlay');
        const headers = req.headers.delete('exibe-overlay');
        directRequest = req.clone({headers});
        this.spinnerService.show(exibeOverlay);
      }

      return next.handle(directRequest ? directRequest : req)
        .pipe(
          tap(evt => {
            if (evt instanceof HttpResponse) {
              // if (evt.body && evt.body.MensagemAlerta && (evt.body.MensagemAlerta.Titulo || evt.body.MensagemAlerta.Mensagem)) {
              //   this.verificaMensagens(evt.body.MensagemAlerta);
              // }
              this.fecharOverlay(exibeOverlay);
            }
          }, error => {
            // if (error.error && error.error.MensagemAlerta && (error.error.MensagemAlerta.Titulo || error.error.MensagemAlerta.Mensagem)) {
            //   this.verificaMensagens(error.error.MensagemAlerta);
            // }
            this.fecharOverlay(exibeOverlay);
          })
        );
  }
  fecharOverlay(exibeOverlay: string) {
    if (exibeOverlay && exibeOverlay != "")
      this.spinnerService.hide(exibeOverlay);
  }
  // verificaMensagens(mensagens) {
  //   if (Array.isArray(mensagens)) {
  //     mensagens.forEach((mensagem) => {
  //       this.exibeAlerta(mensagem);
  //     });
  //   } else {
  //     this.exibeAlerta(mensagens);
  //   }
  // }

  // exibeAlerta(alerta) {
  //   if (alerta.TipoAlerta === 0) {
  //     this.toastr.error(alerta.Mensagem, alerta.Titulo);
  //   } else if (alerta.TipoAlerta === 1) {
  //     this.toastr.info(alerta.Mensagem, alerta.Titulo);
  //   } else if (alerta.TipoAlerta === 2) {
  //     this.toastr.success(alerta.Mensagem, alerta.Titulo);
  //   } else if (alerta.TipoAlerta === 3) {
  //     this.toastr.warning(alerta.Mensagem, alerta.Titulo);
  //   }
  // }

}
