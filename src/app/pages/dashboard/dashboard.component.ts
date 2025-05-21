import { Component, OnInit } from '@angular/core';
import {
  ChartOptions,
  ChartData,
  ChartConfiguration,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { SalesOrderService } from '../../core/services/sales-order.service';
import { InventoryService } from '../../core/services/inventory.service';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedPeriod: 'today' | 'month' | 'ytd' | 'fiscal' = 'today';
  selectedUser: string = 'all';
  userList: string[] = ['Jose', 'Luis'];

  totalOrders = 0;
  draft = 0;
  confirmed = 0;
  inProgress = 0;
  completed = 0;
  totalRods = 0;

  pieChartData: ChartData<'pie'> = {
    labels: ['Draft', 'Confirmed', 'In Progress', 'Completed'],
    datasets: [{ data: [0, 0, 0, 0] }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Rod A', 'Rod B', 'Rod C', 'Glass'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        label: 'Qty Available',
        backgroundColor: '#3b82f6'
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  constructor(
    private orderService: SalesOrderService,
    private inventoryService: InventoryService
  ) {}

  fakeData: {
  [key: string]: {
    users: {
      [username: string]: {
        draft: number;
        confirmed: number;
        inProgress: number;
        completed: number;
      };
    };
    rods: number;
    inventory: number[];
  };
} = {
  today: {
    users: {
      Jose: { draft: 1, confirmed: 0, inProgress: 1, completed: 0 },
      Luis: { draft: 0, confirmed: 1, inProgress: 0, completed: 0 }
    },
    rods: 20,
    inventory: [3, 4, 8, 10]
  },
  month: {
    users: {
      Jose: { draft: 2, confirmed: 2, inProgress: 1, completed: 1 },
      Luis: { draft: 1, confirmed: 3, inProgress: 3, completed: 1 }
    },
    rods: 60,
    inventory: [10, 19, 10, 25]
  },
  ytd: {
    users: {
      Jose: { draft: 5, confirmed: 10, inProgress: 4, completed: 4 },
      Luis: { draft: 5, confirmed: 10, inProgress: 11, completed: 4 }
    },
    rods: 120,
    inventory: [31, 52, 30, 54]
  },
  fiscal: {
    users: {
      Jose: { draft: 8, confirmed: 12, inProgress: 6, completed: 4 },
      Luis: { draft: 7, confirmed: 13, inProgress: 14, completed: 11 }
    },
    rods: 160,
    inventory: [73, 50, 70, 56]
  }
};


  ngOnInit(): void {
    this.updateData();
  }

  updateData(): void {
  const periodData = this.fakeData[this.selectedPeriod];
  const userData = periodData.users;

  if (this.selectedUser === 'all') {
    this.draft = this.confirmed = this.inProgress = this.completed = 0;

    for (const user in userData) {
      this.draft += userData[user].draft;
      this.confirmed += userData[user].confirmed;
      this.inProgress += userData[user].inProgress;
      this.completed += userData[user].completed;
    }
  } else {
    const data = userData[this.selectedUser];
    this.draft = data.draft;
    this.confirmed = data.confirmed;
    this.inProgress = data.inProgress;
    this.completed = data.completed;
  }

  this.totalOrders = this.draft + this.confirmed + this.inProgress + this.completed;
  this.totalRods = periodData.rods;

this.pieChartData = {
  labels: ['Draft', 'Confirmed', 'In Progress', 'Completed'],
  datasets: [
    {
      data: [this.draft, this.confirmed, this.inProgress, this.completed],
      backgroundColor: ['#facc15', '#3b82f6', '#8b5cf6', '#22c55e'], // yellow, blue, purple, green
      hoverOffset: 8
    }
  ]
};

this.pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#e5e7eb', // text-gray-200
        font: { size: 14 }
      }
    }
  }
};


this.barChartData = {
  labels: ['U Profile', 'C Profile', 'Flat', 'Glass'],
  datasets: [
    {
      data: periodData.inventory,
      label: 'Qty Available',
      backgroundColor: ['#38bdf8', '#6366f1', '#a855f7', '#f472b6'], // cyan, indigo, violet, pink
      borderRadius: 6
    }
  ]
};

this.barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#e5e7eb', // light gray
        font: { size: 13 }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#d1d5db' }, // gray-300
      grid: { color: '#374151' }   // gray-700
    },
    y: {
      ticks: { color: '#d1d5db' },
      grid: { color: '#374151' }
    }
  }
};


}
}
