import { Component, OnInit, AfterViewInit, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver, ChangeDetectorRef, ComponentFactory, Type } from '@angular/core';
import { ITemplate } from 'src/app/model/template.interface';
import { DataService } from 'src/app/service/data.service';
import { TextComponent } from '../text/text.component';

@Component({
  selector: 'app-div',
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.scss']
})
export class DivComponent implements AfterViewInit {

  id:string;
  index:number; 
  componentRef:ComponentRef<any>;
  childComponentsType:Type<any>;

  @ViewChild('element',{read: ViewContainerRef,static:true})
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
    this.childComponentsType = TextComponent;
    this.loadChildComponent(this.childComponentsType);
    this.cd.detectChanges();
  }

  loadChildComponent(componentType: Type<any>) {
    this.viewContainerRef.clear();
    this.templateData.divs[this.index].elements.forEach( (element,i) => {
      let componentFactory:ComponentFactory<TextComponent> = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      this.componentRef.instance.divId = this.id;
      this.componentRef.instance.divIndex = this.index;
      this.componentRef.instance.id = this.templateData.divs[this.index].elements[i].id;
      this.componentRef.instance.index = i;
    });

  }
}
