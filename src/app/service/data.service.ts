import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ITemplate } from '../model/template.interface'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  templateSubject = new BehaviorSubject<ITemplate>(null);
  dataSubject = new BehaviorSubject<any>(null);

  getTemplateService(){
    return this.templateSubject;
  }

  updateTemplate(template:ITemplate){
    this.templateSubject.next(template);
  }

  getDataSubject(){
    return this.dataSubject;
  }

  updateData(data){
    this.dataSubject.next(data);
  }

}
