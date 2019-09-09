import { Component, AfterViewInit, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver, ChangeDetectorRef, Injector, Type, ComponentFactory, OnInit } from '@angular/core';
import { DivComponent } from 'src/app/component/div/div.component';
import { TemplateComponent } from 'src/app/component/template/template.component';
import { DataService } from 'src/app/service/data.service';
import { ITemplate } from '../../model/template.interface'

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements AfterViewInit, OnInit {

  componentRef:ComponentRef<any>;
  childComponentsType:Type<any>;

  @ViewChild('template',{read: ViewContainerRef,static:true})
  viewContainerRef;

  templateData:ITemplate = {
    id: 'template1',
    divs:[
      { id: 'div1',
        elements: [
        { id: 'element1', value: 'abcd' },
        { id: 'element2', value: '1234' }
      ]},
      { id: 'div2',
        elements: [
        { id: 'element3', value: 'efgh' },
        { id: 'element4', value: '5678' }
      ]}
    ]
  }

  constructor(
      private componentFactoryResolver:ComponentFactoryResolver,
      private cd:ChangeDetectorRef,
      private dataService:DataService ) { }

  ngAfterViewInit(){
    this.childComponentsType = TemplateComponent;
    this.loadChildComponent(this.childComponentsType);
    this.cd.detectChanges();
  }

  ngOnInit(){
    this.dataService.updateTemplate(this.templateData);
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory:ComponentFactory<TemplateComponent> = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.id = this.templateData.id;
  }

}