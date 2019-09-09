import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ITemplate } from 'src/app/model/template.interface';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  id:'string';
  index:number;
  divIndex:number;
  divId:number;
  templateData:ITemplate;
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getTemplateService().subscribe(data=>{
      this.templateData = data;
    });
  }

}
