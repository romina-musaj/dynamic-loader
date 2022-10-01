import { Compiler, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


export async function createModuleWithComponentsFactory(
  compiler: Compiler,
  metadata: Component
): Promise<any> {
  const cmpClass = class DynamicComponent {};
  const decoratedCmp = Component(metadata)(cmpClass);
  const dynamicHtmlModule = class RuntimeComponentModule {
  };
  const decoratedNgModule = NgModule({
    imports: [
      CommonModule,
      RouterModule,
    ],
    declarations: [decoratedCmp],
  })(dynamicHtmlModule);


  const moduleWithComponentFactory =
    await compiler.compileModuleAndAllComponentsAsync(decoratedNgModule);
  return moduleWithComponentFactory.componentFactories.find(
    (x) => x.componentType === decoratedCmp
  );
}
