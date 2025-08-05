import { Newspaper } from "lucide-react";
import DashboardHeader from "./common/DashboardHeader";
import TabTitle from "./common/TabTitle";

const Newsfeed = () => {
  return (
    <>
      <DashboardHeader title="Newsfeed" breadcrumb="Latest News" />
      <div className="flex flex-col gap-4 p-4 pt-0">
        <TabTitle title="Newsfeed" icon={<Newspaper />} />
        <div>Newsfeed</div>
      </div>
    </>
  );
};

export default Newsfeed;
