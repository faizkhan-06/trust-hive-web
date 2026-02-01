import DashboardService from "@/services/DashboardService";
import { ApiResponse } from "@/types";


class DashboardStore {
    constructor(private _dahsboardService: DashboardService){}

    async fetchDashboardKpi(start_at: string, end_at: string) {
      const resp = await this._dahsboardService.fetchDashboardKpi(start_at, end_at) as ApiResponse;
      return resp;
    }
}

const dashboardStore = new DashboardStore(new DashboardService());
export default dashboardStore