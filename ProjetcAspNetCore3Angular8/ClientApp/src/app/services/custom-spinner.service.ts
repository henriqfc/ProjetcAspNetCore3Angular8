import { Injectable } from '@angular/core';
import { CustomSpinnerComponent } from '../components/spinner/custom-spinner.component';

@Injectable()
export class CustomSpinnerService {

  private spinnerCache = new Set<CustomSpinnerComponent>();

    _register(spinner: CustomSpinnerComponent): void {
      this.spinnerCache.add(spinner);
    }

    _unregister(spinnerToRemove: CustomSpinnerComponent): void {
      this.spinnerCache.forEach(spinner => {
        if (spinner === spinnerToRemove) {
          this.spinnerCache.delete(spinner);
        }
      });
    }

    _unregisterGroup(spinnerGroup: string): void {
      this.spinnerCache.forEach(spinner => {
        if (spinner.group === spinnerGroup) {
          this.spinnerCache.delete(spinner);
        }
      });
    }

    _unregisterAll(): void {
      this.spinnerCache.clear();
    }

    show(spinnerName: string): void {
      this.spinnerCache.forEach(spinner => {
        if (spinner.name === spinnerName) {
          spinner.show = true;
        }
      });
    }

    hide(spinnerName: string): void {
      this.spinnerCache.forEach(spinner => {
        if (spinner.name === spinnerName) {
          spinner.show = false;
        }
      });
    }

    showGroup(spinnerGroup: string): void {
      this.spinnerCache.forEach(spinner => {
        if (spinner.group === spinnerGroup) {
          spinner.show = true;
        }
      });
    }

    hideGroup(spinnerGroup: string): void {
      this.spinnerCache.forEach(spinner => {
        if (spinner.group === spinnerGroup) {
          spinner.show = false;
        }
      });
    }

    showAll(): void {
      this.spinnerCache.forEach(spinner => spinner.show = true);
    }

    hideAll(): void {
      this.spinnerCache.forEach(spinner => spinner.show = false);
    }

    isShowing(spinnerName: string): boolean | undefined {
      let showing = undefined;
      this.spinnerCache.forEach(spinner => {
        if (spinner.name === spinnerName) {
          showing = spinner.show;
        }
      });
      return showing;
    }

}
