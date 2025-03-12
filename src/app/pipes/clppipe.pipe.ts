import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'clp',
    standalone:true
})

export class ClpPipe  implements PipeTransform {
    transform(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}