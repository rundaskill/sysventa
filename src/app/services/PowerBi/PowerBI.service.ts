import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PowerBIService {

constructor() { }

displayPowerBi(element:HTMLElement,display:"none"|"block"):HTMLElement{
  element.style.display=display
  return element
}
dimension(element:HTMLElement):HTMLElement{
  element.style.height= "75vh";
  element.style.margin="8px auto";
  element.style.width= "90%";
  return element
}
}
