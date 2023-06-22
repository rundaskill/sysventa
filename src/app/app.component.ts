import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IReportEmbedConfiguration, models, Page, Report, service, Embed } from 'powerbi-client';
import { PowerBIReportEmbedComponent } from 'powerbi-client-angular';
import { IHttpPostMessageResponse } from 'http-post-message';
import { environment } from 'src/environments/environment';
import { PowerBIService } from './services/PowerBi/PowerBI.service';
import Swal from 'sweetalert2'
export interface ConfigResponse {
  Id: string;
  EmbedUrl: string;
  EmbedToken: {
    Token: string;
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private powerBIService:PowerBIService) {
    
  }
  @ViewChild(PowerBIReportEmbedComponent) reportObj!: PowerBIReportEmbedComponent;
  isEmbedded = true;
  // Overall status message of embedding
  displayMessage = 'The report is bootstrapped. Click Embed Report button to set the access token.';
  // CSS Class to be passed to the wrapper
  reportClass = 'report-container2';
  // Flag which specify the type of embedding
  phasedEmbeddingFlag = false;
  // Configuracion
  reportConfig: IReportEmbedConfiguration = {
    type: 'report',
    embedUrl: environment.embedUrl,
    tokenType: models.TokenType.Aad,
    accessToken: environment.accessToken,
    id:environment.id,
    settings:{
      panes:{
        filters:{
          expanded:false,
          visible:false
        },
        
      },
      background:models.BackgroundType.Transparent,
    }
  };
  title = 'sysventa';
  elements!:HTMLElement
   /**
   * Map of event handlers to be applied to the embedded report
   */
  // Update event handlers for the report by redefining the map using this.eventHandlersMap
  // Set event handler to null if event needs to be removed
  // More events can be provided from here
  // https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
  eventHandlersMap = new Map ([
    ['loaded', () => {
        const report = this.reportObj.getReport();
        report.setComponentTitle('Embedded report');
        console.log('Report has loaded');        
      },
    ],
    ['rendered', () =>{
      console.log('Report has rendered')
     
    }],
    ['error', (event?: service.ICustomEvent<any>) => {
        if (event) {
          Swal.fire({
            title:"Expired token",
            icon:"info",
            text:"contact admin"
          })
          console.error(event.detail);
        }
      },
    ],
    ['visualClicked', () => console.log('visual clicked')],
    ['pageChanged', (event) => {
      this.powerBIService.dimension(this.elements)
      this.powerBIService.displayPowerBi(this.elements,"block")
      
    }],
  ]) as Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>;



  ngAfterViewInit(): void {
    const element = document.getElementsByClassName(this.reportClass);
    if (element.length>0) {
      this.elements= element[0] as HTMLElement
      this.powerBIService.displayPowerBi(this.elements,"none")
    }
  }

  displayPowerBi(elements:HTMLElement,display:"none"|"block"){
    elements.style.display=display
  }


}
