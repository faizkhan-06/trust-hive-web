import useHttp from "@/hooks/useHttp"

const {httpGet} = useHttp();
class DashboardService {
  async fetchDashboardKpi(start_at: string, end_at: string) {
    return await httpGet("dashboard", {start_at, end_at});
  }
}

export default DashboardService