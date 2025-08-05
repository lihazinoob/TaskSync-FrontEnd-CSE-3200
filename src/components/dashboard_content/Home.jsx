import Homecontent from "@/components/dashboard_content/home/Homecontent";
import DashboardHeader from "./common/DashboardHeader";

const Home = () => {
  return (
    <>
      <DashboardHeader title="Dashboard" breadcrumb="Home" />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Homecontent />
      </div>
    </>
  );
};

export default Home;
