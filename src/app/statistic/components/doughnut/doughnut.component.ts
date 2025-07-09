import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { StatisticsService } from '../../services/statistics.service';
import { Statistics } from '../../model/statistic-entity/statistic.entity';

// Importa el tipo TooltipItem de Chart.js
import { TooltipItem } from 'chart.js';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut.component.html',
    standalone: true,
    imports: [ChartModule]
})
export class DoughnutChartComponent implements OnInit {
    data: any;
    options: any;
    totalStories: number = 0;

    constructor(private statisticsService: StatisticsService) {}

    ngOnInit() {
        this.initChart();
    }

    private initChart(): void {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.statisticsService.getUserStories().subscribe(statistics => {
            // Calcular estadísticas
            const statusCount = statistics.reduce((acc: Record<string, number>, stat: Statistics) => {
                acc[stat.status] = (acc[stat.status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const toDoCount = statusCount['TO_DO'] || 0;
            const doneCount = statusCount['DONE'] || 0;
            this.totalStories = toDoCount + doneCount;

            // Calcular porcentajes
            const toDoPercentage = this.totalStories > 0 ? Math.round((toDoCount / this.totalStories) * 100) : 0;
            const donePercentage = this.totalStories > 0 ? Math.round((doneCount / this.totalStories) * 100) : 0;

            this.data = {
                labels: [
                    `Por Hacer (${toDoCount} - ${toDoPercentage}%)`,
                    `Completadas (${doneCount} - ${donePercentage}%)`
                ],
                datasets: [{
                    data: [toDoCount, doneCount],
                    backgroundColor: ['#FFA726', '#4CAF50'],
                    hoverBackgroundColor: ['#FB8C00', '#388E3C'],
                    borderWidth: 1,
                    borderColor: '#fff'
                }]
            };

            this.options = {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 20,
                            font: {
                                size: 12,
                                family: documentStyle.getPropertyValue('--font-family')
                            },
                            color: textColor,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: TooltipItem<'doughnut'>) => {
                                const label = context.label?.split(' (')[0] || '';
                                const value = context.raw as number;
                                const percentage = this.totalStories > 0 ? Math.round((value / this.totalStories) * 100) : 0;
                                return `${label}: ${value} historias (${percentage}%)`;
                            }
                        },
                        displayColors: true,
                        backgroundColor: '#ffffff',
                        titleColor: '#333333',
                        bodyColor: '#666666',
                        borderColor: '#dddddd',
                        borderWidth: 1
                    },
                    title: {
                        display: true,
                        text: `Total de Historias: ${this.totalStories}`,
                        font: {
                            size: 14,
                            weight: 'normal'
                        },
                        color: textColor,
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    }
                }
            };
        });
    }
}
