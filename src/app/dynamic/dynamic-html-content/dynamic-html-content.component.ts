import {
  Compiler,
  Component,
  ComponentRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { createModuleWithComponentsFactory } from '../dynamic.module';


@Component({
  selector: 'app-dynamic-html-content',
  templateUrl: './dynamic-html-content.component.html',
  styleUrls: []
})
export class DynamicHtmlContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() content!: string;
  @Input() fullName!: string;
  cmpRef!: ComponentRef<any>;

  constructor(private vcRef: ViewContainerRef, private compiler: Compiler) {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  ngOnChanges() {
    const html = this.content;
    if (!html) {
      return;
    }

    if (this.cmpRef) {
      this.cmpRef.destroy();
    }

    const compMetadata = new Component({
      selector: 'dynamic-content',
      template: this.content,
      inputs: ['fullName'],
    });


    createModuleWithComponentsFactory(this.compiler, compMetadata).then((factory) => {
      const injector = Injector.create({
        providers: [],
        parent: this.vcRef.injector,
      });
      this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
      this.cmpRef.instance.fullName = this.fullName;
    });
  }
}

