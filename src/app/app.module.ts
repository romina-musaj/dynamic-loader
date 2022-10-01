import { Compiler, CompilerFactory, COMPILER_OPTIONS, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { DynamicHtmlContentComponent } from './dynamic/dynamic-html-content/dynamic-html-content.component';



/* Compiler Factory for HtmlRenderer Component purpouses */
export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [			
    AppComponent,
    DynamicHtmlContentComponent
   ],
  imports: [
    BrowserModule
  ],
  providers: [
    /* For HtmlRenderer: */
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
