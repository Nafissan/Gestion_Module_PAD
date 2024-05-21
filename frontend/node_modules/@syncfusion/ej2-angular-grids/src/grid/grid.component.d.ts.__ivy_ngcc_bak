import { ElementRef, ViewContainerRef, QueryList, Renderer2, Injector } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Grid } from '@syncfusion/ej2-grids';
import { ColumnsDirective } from './columns.directive';
import { AggregatesDirective } from './aggregates.directive';
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * `ejs-grid` represents the Angular Grid Component.
 * ```html
 * <ejs-grid [dataSource]='data' allowPaging='true' allowSorting='true'></ejs-grid>
 * ```
 */
export declare class GridComponent extends Grid implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    context: any;
    tagObjects: any;
    childColumns: QueryList<ColumnsDirective>;
    childAggregates: QueryList<AggregatesDirective>;
    tags: string[];
    dataSourceChange: any;
    /**
     * The row template that renders customized rows from the given template.
     * By default, Grid renders a table row for every data source item.
     * > * It accepts either [template string](../../common/template-engine/) or HTML element ID.
     * > * The row template must be a table row.
     *
     * > Check the [`Row Template`](grid/row/) customization.
     *
     */
    rowTemplate: any;
    /**
     * The detail template allows you to show or hide additional information about a particular row.
     *
     * > It accepts either the [template string](../../common/template-engine/) or the HTML element ID.
     *
     *{% codeBlock src="grid/detail-template-api/index.ts" %}{% endcodeBlock %}
     *
     */
    detailTemplate: any;
    /**
     * It used to render toolbar template
     * @default null
     */
    toolbarTemplate: any;
    /**
     * It used to render pager template
     * @default null
     */
    pagerTemplate: any;
    editSettings_template: any;
    groupSettings_captionTemplate: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}
