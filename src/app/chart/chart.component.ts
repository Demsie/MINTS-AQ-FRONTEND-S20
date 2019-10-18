import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SensorDataService } from '../sensor-data.service';
import { ChartDataSets, ChartOptions, ChartData } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(private sensorDataService: SensorDataService) { }

  //CHART OPTIONS FOR PM GRAPH
  public PMlineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks:{min:0, max:14}
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  //CHART OPTIONS FOR TEMPERATURE
  public TemperaturelineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks:{min:0, max:60}
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  //CHART OPTIONS FOR HUMIDITY
  public HumiditylineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks:{min:0, max:20}
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  //LINE GRAPH COLORS
  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // blue
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'blue',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // orange
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'orange',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

    //LINE CHART CONFIG 
    LineChartConfig = {
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
    };

  //CHART CONFIG FOR LABELS
  chartLabels =
  ["00:00:00", " 03:00:00", 
  "06:00:00", "09:00:00", 
  "12:00:00", "15:00:00", 
  "18:00:00", "23:59:59"];


  //CHART JS OPTIONS
  public lineChartLegend = true;
  public lineChartType = 'line';

  //HOLDS SENSOR DATA FROM SERVER
  HistoricalSensorData: any = [];


  //HOLDS PM DATA
  PMchartData = [
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' },
    { data: [], label: '' }
  ];

  //HOLDS TEMPERATURE DATA
  TemperatureData = [
    { data: [], label: '' }
  ];

  //HOLDS HUMIDITY DATA
  HumidityData = [
    { data: [], label: '' }
  ];

  ngOnInit() {
    let url3 = "https://cors-anywhere.herokuapp.com/http://mintsdata.utdallas.edu:4200/api/001e06305a12/2019/08/30/MINTS_001e06305a12_calibrated_UTC_2019_08_30.csv";
    //GETS HISTORICAL DATA
    this.HistoricalSensorData = JSON.parse(this.sensorDataService.csvJSON(this.sensorDataService.getHistoricalSensorData(url3)));
    console.log(this.HistoricalSensorData);
    //CALLS TO PARSE DATA
    this.ParseHistoricalData();
  }

  //PARSES HISTORICAL DATA TO GET PERTINENT INFORMATION AND SAVES IT
  ParseHistoricalData(){
    let PM2_5data: Number[] = [];
    let PM1data: Number[] = [];
    let PM4data: Number[] = [];
    let PM10data: Number[] = [];
    let TempData: Number[] =[];
    let HumidityData: Number[] =[];
    for(let i=0; i < this.HistoricalSensorData.length; i++ )
    {
      PM2_5data.push(parseFloat(this.HistoricalSensorData[i]["PM2_5"]));
      PM1data.push(parseFloat(this.HistoricalSensorData[i]["PM1"]));
      PM4data.push(parseFloat(this.HistoricalSensorData[i]["PM4"]));
      PM10data.push(parseFloat(this.HistoricalSensorData[i]["PM10"]));
      TempData.push(parseFloat(this.HistoricalSensorData[i]["Temperature"]));
      HumidityData.push(parseFloat(this.HistoricalSensorData[i]["Humidity"]));
    }
    console.log("Temperature");
    console.log( TempData);
    console.log("Humidity");
    console.log(HumidityData);
    
    //CREATES DATASETS TO UPDATE CHART
    this.InitializeGraphs(PM2_5data, PM1data, PM4data, PM10data, TempData, HumidityData);
  }

  //INITIALIZES GRAPHS
  InitializeGraphs(PM2_5data, PM1data, PM4data, PM10data, TempData, HumidityData ){
    this.PMchartData[0].data = PM2_5data;
    this.PMchartData[0].label = "PM2_5";
    this.PMchartData[1].data = PM1data;
    this.PMchartData[1].label = "PM1";
    this.PMchartData[2].data = PM4data;
    this.PMchartData[2].label = "PM4";
    this.PMchartData[3].data = PM10data;
    this.PMchartData[3].label = "PM10";
    this.TemperatureData[0].data = TempData;
    this.TemperatureData[0].label = "Temperature";
    this.HumidityData[0].data = HumidityData;
    this.HumidityData[0].label = "Humidity";
  }

}
