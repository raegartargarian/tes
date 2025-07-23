import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { appRoutes } from "../constants/routes";

export const BackButton = () => {
  return (
    <Link
      to={appRoutes.dashboard.path}
      className="
          cursor-pointer
          flex items-center gap-3 
          mt-5
          "
    >
      <ArrowLeft size={16} />
      <p className="font-light"> Return Back</p>
    </Link>
  );
};
