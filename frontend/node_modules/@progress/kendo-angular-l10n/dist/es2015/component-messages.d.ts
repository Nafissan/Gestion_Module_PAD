/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
import { OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { LocalizationService } from './localization.service';
/**
 * Base class that acts as a component messages container.
 *
 * For internal use.
 * @hidden
 */
export declare abstract class ComponentMessages implements OnChanges, OnInit, OnDestroy {
    protected service: LocalizationService;
    private subscription;
    protected readonly override: boolean;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    protected register(changes: Object): void;
    ngOnDestroy(): void;
}
