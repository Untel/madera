import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {

  gammes = {
    'Eco': 'eco',
    'Standard': 'standard',
    'Premium': 'premium',
  }

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => {
      return filter.gamme[this.gammes[item.gamme]] && filter.type[item.type];
    });
  }

}
