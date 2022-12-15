import { AfterViewInit, Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

@Component({
  selector: 'app-reports-charts',
  templateUrl: './reports-charts.component.html',
  styleUrls: ['./reports-charts.component.scss']
})
export class ReportsChartsComponent implements OnInit {
  @ViewChild('barChart', {static: true}) 'barChart': any;

  constructor() { }

  
  

  ngOnInit(): void {
    
  }

loadCarts() {
}

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Gasto',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      },
      {
        data: [ 30, 22, 80, 11, 16, 65, 48 ],
        label: 'Ganho',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Fornecedor 1' ], [ 'Fornecedor 2' ], 'Fornecedor 3' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

}
