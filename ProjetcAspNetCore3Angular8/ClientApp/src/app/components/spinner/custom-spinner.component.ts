import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewChecked  } from '@angular/core';
import { CustomSpinnerService } from '../../services/custom-spinner.service';

@Component({
  selector: 'custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.scss']
})

export class CustomSpinnerComponent implements OnInit, OnDestroy, AfterViewChecked  {

  ngAfterViewChecked(): void {
    this._cdRef.detectChanges();
  }

  constructor(private _cdRef: ChangeDetectorRef,
    private _spinnerService: CustomSpinnerService, public el: ElementRef) { }
    private isShowing = false;

  @Output() showChange = new EventEmitter();
  @Input() group: string;
  @Input() name: string;
  @Input() loadingImage: string;

  get show(): boolean {
    return this.isShowing;
  }

  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);
    this._cdRef.detectChanges();
  }

  ngOnInit(): void {
    if (!this.name) { throw new Error('Spinner must have a \'name\' attribute.'); }

    this._spinnerService._register(this);
  }

  ngOnDestroy(): void {
    this._spinnerService._unregister(this);
  }
}
