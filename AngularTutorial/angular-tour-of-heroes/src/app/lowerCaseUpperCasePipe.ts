import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    standalone: true,
    name: 'lowerCaseUpperCase'})

export class LowerCaseUpperCasePipe implements PipeTransform {

    /* getting array of strings
       implement alternating each string to lowercase and uppercase */
    transform(items: any[], filter:number=2): any {
        items.forEach((value, index) => {
            if(index % filter == 0) {
                items[index].name = value.name.toLowerCase();
            } else {
                items[index].name = value.name.toUpperCase();
            }
        }); 
        return items;       
    }
}