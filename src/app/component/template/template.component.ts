import { Component, OnInit, ViewChild, AfterViewInit, ComponentRef, Type, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, ComponentFactory } from '@angular/core';
import { ITemplate } from 'src/app/model/template.interface';
import { DataService } from 'src/app/service/data.service';
import { DivComponent } from '../div/div.component';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements AfterViewInit {

  id:string;
  componentRef:ComponentRef<any>;
  childComponentsType:Type<any>;

  @ViewChild('div',{read: ViewContainerRef,static:true})
  viewContainerRef;

  templateData:ITemplate;

  constructor(
      private componentFactoryResolver:ComponentFactoryResolver,
      private cd:ChangeDetectorRef,
      private dataService:DataService ) { }

  ngAfterViewInit(){
    this.dataService.getTemplateService().subscribe(data=>{
      this.templateData = data;
    });
    this.childComponentsType = DivComponent;
    this.loadChildComponent(this.childComponentsType);
    this.cd.detectChanges();
  }

  loadChildComponent(componentType: Type<any>) {
    this.viewContainerRef.clear();
    this.templateData.divs.forEach( (div,i) => {
      let componentFactory:ComponentFactory<DivComponent> = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      this.componentRef.instance.id = this.templateData.divs[i].id;
      this.componentRef.instance.index = i;
    });

  }

}
