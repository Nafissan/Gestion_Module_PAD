import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { ChartData } from "chart.js";

@Injectable({
  providedIn: "root",
})
export class DashboardsService {

  url: string = "/pss-backend/tb";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  getActionsConvention(): any {
    return [
      {
        'label': 'Réalisée',
        'value': 14
      },
      {
        'label': 'Annulée',
        'value': 2
      },
      {
        'label': 'En cours',
        'value': 16
      }
    ];

  }
  getActionsChartData() {
    const chartData = this.getActionsConvention();
    const demo =  {
      labels: chartData.map(data => data.label),
      datasets: [
        {
          data: chartData.map(data => data.value),
          backgroundColor: ['#2196F3', '#009688', '#f19677']
        }
      ]
    } as ChartData;
    return of(demo);
  }



  constructor(private httpClient: HttpClient) { }


  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
