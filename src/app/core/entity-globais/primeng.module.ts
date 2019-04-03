import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TabViewModule} from 'primeng/tabview';
import {FieldsetModule} from 'primeng/fieldset';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {LightboxModule} from 'primeng/lightbox';
import {TooltipModule} from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import {RadioButtonModule} from 'primeng/radiobutton';
import {BlockUIModule} from 'primeng/blockui';
import {CheckboxModule} from 'primeng/checkbox';
import {SelectButtonModule} from 'primeng/selectbutton';
import {PaginatorModule} from 'primeng/paginator';


@NgModule({

  exports: [
    FormsModule,
    TabViewModule,
    FieldsetModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    InputMaskModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    PanelModule,
    DropdownModule,
    MenuModule,
    CardModule,
    TableModule,
    InputTextModule,
    FileUploadModule,
    NoopAnimationsModule,
    ScrollPanelModule,
    KeyFilterModule,
    DialogModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    LightboxModule,
    TooltipModule,
    MultiSelectModule,
    RadioButtonModule,
    BlockUIModule,
    CheckboxModule,
    SelectButtonModule,
    PaginatorModule
  ],
  declarations: [
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]

})
export class PrimeNgModule { }