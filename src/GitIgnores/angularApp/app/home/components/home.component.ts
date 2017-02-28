import { IgnoreTemplateService } from './../../core/services/ignore-template.service';
import { IgnoreTemplate } from './../../models/ignore-template';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public message: string;
    public languages: string[] = [];
    public ignoreTemplate: IgnoreTemplate = new IgnoreTemplate();
    public sourcelines: string[] = [];

    constructor(private dataService: IgnoreTemplateService) {
        this.message = 'Select a language for a .gitignore template';
    }

    ngOnInit() {
       this.getAllThings();
    }

    private getAllThings() {
        this.dataService
            .GetAll()
            .subscribe(
            data => this.languages = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }

    public getIgnoreTemplate() {
        console.log(`Loading template for language: ${this.ignoreTemplate.name}.`);
        this.dataService
            .GetSingle(this.ignoreTemplate.name)
            .subscribe(
                data => {
                    this.ignoreTemplate = data;
                    this.sourcelines = this.ignoreTemplate.source.split('\n');

                    for (let n = 0; n < this.sourcelines.length; n++) {
                        console.log(this.sourcelines[n]);
                    }
                },
                error => console.log(error),
                () => console.log('Get single complete')
            );
    }
}
